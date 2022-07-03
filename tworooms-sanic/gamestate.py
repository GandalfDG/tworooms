
class Player():
    def __init__(self, playername):
        self.playername = playername
        self.card = None
        self.session = None


class GameRoom():
    def __init__(self, roomcode: str, host_playername: str):
        self.roomcode: str = roomcode
        self.host_playername: str = host_playername
        self.players: list[Player] = []