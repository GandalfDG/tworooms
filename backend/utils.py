from uuid import uuid4 as uuid
import random
from asyncio import gather
from json import dumps

CODE_LENGTH = 4

random.seed()

def generate_access_code() -> str:
    code = ''
    possible = 'abcdefghjkmnpqrstuvwxyz'

    for _ in range(CODE_LENGTH):
        code += random.choice(possible)

    return code.upper()


def shuffle_players(players: list) -> tuple[list, list]:
    """
    Generate and shuffle a list of length num_players split between room 1 and 2
    """
    playercopy = players.copy()
    random.shuffle(playercopy)
    room_lists = (playercopy[:int(len(playercopy)/2)],
                  playercopy[int(len(playercopy)/2):])
    return room_lists


def get_shuffled_card_indices(num_players, seed=None):
    """
    Generate and shuffle a list of card indices
    """
    indices = [i for i in range(num_players)]
    random.shuffle(indices)
    return indices


def set_user_cookie() -> str:
    identifier = str(uuid().hex)
    # response.cookies['session']['domain'] = ".127.0.0.1"
    # response.cookies['session']['samesite'] = "none"

    # response.cookies['session']['samesite'] = 'strict'
    return identifier


async def notify_all_players(game, message: str):
    sockets = [player.socket for player in game.players.values() if player.socket]
    awaitables = [socket.send(message) for socket in sockets]
    await gather(*awaitables)

async def send_all_playerdata(game, message: str):
    sockets = [player.socket for player in game.players.values() if player.socket]
    playerdata = [{
        "playerdata": {
            "card": player.card,
            "start_room": player.start_room
        },
        "roommates": [roommate.playername for roommate in game.rooms[player.start_room] if roommate.playername != player.playername]
    } for player in game.players.values() if player.socket]

    awaitables = [socket.send(dumps(data)) for socket, data in zip(sockets, playerdata)]

    await gather(*awaitables)
