import asyncio
from typing import Dict
from sanic import Sanic, Request, Websocket, text
from sanic.response import json as jsonresponse, file
from sanic_cors import CORS
from sanic.log import logger
from uuid import uuid4 as uuid
from os import environ
import json

from gamestate import *
import utils

from os import path

app = Sanic("tworooms")
CORS(app)

games: Dict[str,GameRoom] = {}
users: Dict[str, tuple[str, str]] = {}

# this will be replaced with redis for "production"
app.ctx.gamedata = {}

app.static("/assets", "../frontend/dist/assets")
app.static("/favicon.ico", "../frontend/dist/favicon.ico")

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

app.add_route(get_app, "/<ext>/")
app.add_route(get_app, "/")

@app.get("test/")
async def test_handler(request):
    response = text("hello")
    response.cookies['testcookie'] = "testcookie"
    response.cookies['testcookie']['domain'] = ".127.0.0.1"
    return response

@app.post("api/create/")
async def create_room_handler(request):
    # generate a room code
    roomcode = utils.generate_access_code()
    while roomcode in games.keys():
        roomcode = utils.generate_access_code()

    # create the game object and add the playername as the host
    playername = request.json["playername"]
    games[roomcode] = GameRoom(roomcode, playername)
    current_game = games[roomcode]
    response_json =         {
            "roomcode": roomcode,
            "playerlist": [playername for playername in current_game.players.keys()]
        }

    identifier = utils.set_user_cookie()
    response_json["session"] = identifier
    users[identifier] = (roomcode, playername)

    response = jsonresponse(response_json)

    return response


@app.post("api/join/")
async def join_room_handler(request):
    roomcode = request.json['roomcode']
    playername = request.json['playername']

    current_game = games[roomcode]
    current_game.players[playername] = Player(playername)
    playerlist = [playername for playername in current_game.players.keys()]
    response_json =         {
            "roomcode": roomcode,
            "playerlist": [playername for playername in current_game.players.keys()]
        }

    identifier = utils.set_user_cookie()
    response_json["session"] = identifier
    users[identifier] = (roomcode, playername)

    response = jsonresponse(response_json)
    await utils.notify_all_players(current_game, json.dumps({'playerlist': playerlist}))
    logger.warning("notified players")
    return response


@app.websocket("ws/game/")
async def game_ws_handler(request: Request, ws: Websocket):
    # associate this websocket with its game/player
    logger.warning(request.cookies)
    session = request.cookies.get('session')

    roomcode,playername = users[session]

    game = games[roomcode]
    player = game.players[playername]

    player.socket = ws

    logger.warning(playername)
    while True:
        data = await ws.recv()
        if data == "lobbycutoff":
            utils.send_all_playerdata()