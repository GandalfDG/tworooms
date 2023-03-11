import asyncio
from typing import Dict
from sanic import Sanic, Request, Websocket, text
from sanic.response import json as jsonresponse, file
from sanic_cors import CORS
from sanic.log import logger
from uuid import uuid4 as uuid
from os import environ
import json
import datetime

from gamestate import *
from messages import GameDataMessage, PlayerDataMessage, WebsocketMessage
import utils

from os import path

CORS_ORIGINS = [r"https?://(?:www\.)?tworooms.online"]

app = Sanic("tworooms")
print(app.debug)
if True:
    CORS_ORIGINS.extend([r"https?://localhost:\d*", r"https?://127.0.0.1:\d*"])

print(CORS_ORIGINS)
CORS(app, origins=CORS_ORIGINS)

games: Dict[str, GameRoom] = {}
users: Dict[str, tuple[str, str]] = {}

# this will be replaced with redis for "production"
app.ctx.gamedata = {}

app.static("/assets", path.abspath("../frontend/dist/assets/"), name="assets")
app.static("/cardimages",
           path.abspath("../frontend/dist/cardimages/"), name="cardimages")
app.static("/favicon.png", "../frontend/dist/favicon.png", name="favicon")

# @app.middleware("request")
# async def player_room_middleware(request):
#     if request.json:
#         roomcode = request.json['roomcode'] if 'roomcode' in request.json.keys() else None
#         playername = request.json['playername'] if 'playername' in request.json.keys() else None
#         game = None
#         if roomcode:
#             game = games[roomcode] if roomcode in games.keys() else None
#             request.ctx.game = game
#         if playername and game:
#             player = game.players[playername]
#             request.ctx.player = player


async def get_app(request, ext=None):
    return await file(location="../frontend/dist/index.html")

app.add_route(get_app, "/")


@app.get("/test")
async def test_handler(request):
    response = text("hello")
    response.cookies['testcookie'] = "testcookie"
    response.cookies['testcookie']['domain'] = ".127.0.0.1"
    return response


@app.post("/api/create")
async def create_room_handler(request):
    # generate a room code
    roomcode = utils.generate_access_code()
    while roomcode in games.keys():
        roomcode = utils.generate_access_code()

    # create the game object and add the playername as the host
    playername = request.json["playername"]
    games[roomcode] = GameRoom(roomcode, playername)
    current_game = games[roomcode]
    response_json = {
        "roomcode": roomcode,
        "playerlist": [playername for playername in current_game.players.keys()]
    }

    identifier = utils.set_user_cookie()
    response_json["session"] = identifier
    users[identifier] = (roomcode, playername)

    response = jsonresponse(response_json)

    return response


@app.post("/api/join")
async def join_room_handler(request):
    roomcode = request.json['roomcode']
    playername = request.json['playername']

    current_game = games[roomcode]
    current_game.players[playername] = Player(playername)
    playerlist = [playername for playername in current_game.players.keys()]
    response_json = {
        "roomcode": roomcode,
        "playerlist": [playername for playername in current_game.players.keys()]
    }

    identifier = utils.set_user_cookie()
    response_json["session"] = identifier
    users[identifier] = (roomcode, playername)

    response = jsonresponse(response_json)

    join_message = WebsocketMessage("player_joined", {"playername": playername})
    await utils.message_all_players(current_game, join_message)
    return response


@app.websocket("/ws/game")
async def game_ws_handler(request: Request, ws: Websocket):
    # associate this websocket with its game/player
    data = json.loads(await ws.recv())
    logger.warning(data)
    session = data['session']

    roomcode, playername = users[session]

    game = games[roomcode]
    player = game.players[playername]

    player.socket = ws

    logger.warning(playername)
    while True:
        data = await ws.recv()
        try:
            timestamp = datetime.datetime.now(datetime.timezone.utc).timestamp() * 1000 # javascript expect milliseconds 
            msgobj = json.loads(data)
            
            if msgobj["message"] == "lobbycutoff":
                logger.warning("cutoff")
                game.place_players()
                utils.deal_player_cards(game.players.values())
                game.num_rounds = int(msgobj["data"]["rounds"])
                game.cardset = msgobj["data"]["cardset"]
                await utils.message_all_players(game, GameDataMessage(game, "lobby_cutoff", timestamp))
                await utils.message_per_player(game, PlayerDataMessage)
                

            elif msgobj["message"] == "startgame":
                logger.warning("start game")
                await utils.send_game_data_to_players(game, "startgame", timestamp)

            elif msgobj["message"] == "nextround":
                logger.info("next round")
                await utils.message_all_players(game, WebsocketMessage("start_round", timestamp=timestamp))

            elif msgobj["message"] == "leaderselect":
                playername = msgobj["data"]["playername"]
                leader_room = game.select_leader(playername)
                if leader_room:
                    leader_message = {
                        "leader_name": playername
                    }
                    await utils.message_room_players(game, leader_room, WebsocketMessage("leader_selected", leader_message, timestamp))

            elif msgobj["message"] == "resetgame":
                logger.info("game over, resetting")
                await utils.send_game_data_to_players(game, "resetgame", timestamp)

                # purge the users and games dictionaries of the ending games
                game_user_keys = [
                    key for key, value in users.items() if value[0] == game.roomcode]
                for key in game_user_keys:
                    users.pop(key, None)

                games.pop(game, None)

           

        except json.JSONDecodeError as er:
            logger.error(er)
