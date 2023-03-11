from typing import Type
from uuid import uuid4 as uuid
import random
from asyncio import gather
from json import dumps
import datetime

from messages import PlayerDataMessage, WebsocketMessage
from gamestate import GameRoom

CODE_LENGTH = 4

random.seed()

def generate_access_code() -> str:
    code = ''
    possible = 'abcdefghjkmnpqrstuvwxyz'

    for _ in range(CODE_LENGTH):
        code += random.choice(possible)

    return code.upper()

def deal_player_cards(players: list):
    """
    Generate and shuffle a list of card indices
    """
    indices = list(range(len(players)))
    random.shuffle(indices)

    for player, index in zip(players, indices):
        player.card = index



def set_user_cookie() -> str:
    identifier = str(uuid().hex)
    # response.cookies['session']['domain'] = ".127.0.0.1"
    # response.cookies['session']['samesite'] = "none"

    # response.cookies['session']['samesite'] = 'strict'
    return identifier

#############################################
# low-level messaging to all, room, or player
#############################################

async def message_all_players(game: GameRoom, message: WebsocketMessage):
    sockets = [player.socket for player in game.players.values()
               if player.socket]
    awaitables = [socket.send(message.json) for socket in sockets]
    gather(*awaitables)


async def message_room_players(game: GameRoom, room: int, message: WebsocketMessage):
    # for player object socket in game.rooms[room]
    sockets = [player.socket for player in game.rooms[room]]
    awaitables = [socket.send(message.json) for socket in sockets]
    gather(*awaitables)


async def message_single_player(game: GameRoom, playername: str, message:WebsocketMessage):
    player_socket = [playerobj.socket for name, playerobj in game.players.items if name == playername][0]
    player_socket.send(message.json)

#####################################
# higher-level messaging functions
#####################################


async def message_per_player(game: GameRoom, messageclass: Type[PlayerDataMessage], type: str):
    awaitables = []
    for playername, player in game.players:
        player_message = messageclass(player)
        awaitables.append(message_single_player(game, playername, player_message))
    gather(*awaitables)


async def send_game_data_to_players(game: GameRoom, message: str, timestamp=None):
    sockets = [player.socket for player in game.players.values() if player.socket]
    playerdata = [{
        "gamedata": {
            "cardset": game.cardset,
            "num_players": len(game.players),
            "num_rounds": game.num_rounds,
            "timestamp": timestamp 
        },
        "playerdata": {
            "card": player.card,
            "start_room": player.start_room
        },
        "roommates": [roommate.playername for roommate in game.rooms[player.start_room] if roommate.playername != player.playername],
        "message": message
    } for player in game.players.values() if player.socket]

    awaitables = [socket.send(dumps(data)) for socket, data in zip(sockets, playerdata)]

    await gather(*awaitables)
