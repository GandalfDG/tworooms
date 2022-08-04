from sanic import Websocket
import utils

class Player():
    def __init__(self, playername):
        self.playername: str = playername
        self.card = None
        self.start_room = None
        self.socket: Websocket = None


class GameRoom():
    def __init__(self, roomcode: str, host_playername: str):
        self.roomcode: str = roomcode
        self.host_playername: str = host_playername
        self.joinable: bool = True
        self.players: dict[str, Player] = {host_playername: Player(host_playername)}
        self.rooms: tuple[list[Player], list[Player]] = ([],[])

    def place_players(self):
        self.rooms = utils.shuffle_players(list(self.players.values()))
        for player in self.rooms[0]:
            player.start_room = 0

        for player in self.rooms[1]:
            player.start_room = 1