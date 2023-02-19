from uuid import uuid4 as uuid
import random
from asyncio import gather
from json import dumps
import datetime

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


async def notify_all_players(game: GameRoom, message: str):
    sockets = [player.socket for player in game.players.values() if player.socket]
    awaitables = [socket.send(message) for socket in sockets]
    await gather(*awaitables)

async def notify_room_players(game: GameRoom, room: int, message: str):
    # for player object socket in game.rooms[room]
    sockets = [player.socket for player in game.rooms[room]]
    awaitables = [socket.send(message) for socket in sockets]
    await gather(*awaitables)

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
