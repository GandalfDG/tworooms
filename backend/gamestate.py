from sanic import Websocket
from random import shuffle

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
        self.cardset: str = "basic"
        self.num_rounds = 3
        self.current_round = 1

    def shuffle_players(self) -> tuple[list, list]:
        """
        Generate and shuffle a list of length num_players split between room 1 and 2
        """
        playercopy = list(self.players.values()).copy()
        shuffle(playercopy)
        room_lists = (playercopy[:int(len(playercopy)/2)],
                    playercopy[int(len(playercopy)/2):])
        return room_lists


    def place_players(self):
        self.rooms = self.shuffle_players()
        for player in self.rooms[0]:
            player.start_room = 0

        for player in self.rooms[1]:
            player.start_room = 1

    def next_round(self):
        self.current_round += 1

    