from sanic import Websocket

class Player():
    def __init__(self, playername):
        self.playername: str = playername
        self.card = None
        self.session = None
        self.socket: Websocket = None


class GameRoom():
    def __init__(self, roomcode: str, host_playername: str):
        self.roomcode: str = roomcode
        self.host_playername: str = host_playername
        self.players: dict[str, Player] = {host_playername: Player(host_playername)}