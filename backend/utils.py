from uuid import uuid4 as uuid
import random
from gamestate import GameRoom
from asyncio import gather

CODE_LENGTH = 4


def generate_access_code() -> str:
    code = ''
    possible = 'abcdefghjkmnpqrstuvwxyz'

    for _ in range(CODE_LENGTH):
        code += random.choice(possible)

    return code.upper()


def get_shuffled_rooms(num_players, seed=None):
    """
    Generate and shuffle a list of length num_players split between room 1 and 2
    """
    random.seed(seed)
    room_list = ([1] * int(num_players/2)) + \
        ([2] * (num_players - int(num_players/2)))
    random.shuffle(room_list)
    return room_list


def get_shuffled_card_indices(num_players, seed=None):
    """
    Generate and shuffle a list of card indices
    """
    random.seed(seed)
    indices = [i for i in range(num_players)]
    random.shuffle(indices)
    return indices


def set_user_cookie() -> str:
    identifier = str(uuid().hex)
    # response.cookies['session']['domain'] = ".127.0.0.1"
    # response.cookies['session']['samesite'] = "none"

    # response.cookies['session']['samesite'] = 'strict'
    return identifier


async def notify_all_players(game: GameRoom, message: str):
    sockets = [player.socket for player in game.players.values()]
    awaitables = [socket.send(message) for socket in sockets]
    await gather(awaitables)
