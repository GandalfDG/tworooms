from dataclasses import dataclass, field
import datetime
from typing import Any
import json as JSON

from gamestate import GameRoom, Player

@dataclass
class WebsocketMessage():

    def __init__(self, type: str, data: dict = None, timestamp: datetime.datetime = None):
        self.type = type
        self.data = data
        self.timestamp = timestamp

    @property
    def json(self):
        json = JSON.dumps({
            "message": self.type,
            "data": self.data,
            "timestamp": self.timestamp
        })
        return json
    

class GameDataMessage(WebsocketMessage):
    def __init__(self, game: GameRoom, type: str, timestamp=None):
        gamedata = {
            "gamedata": {
                "cardset": game.cardset,
                "num_players": len(game.players),
                "num_rounds": game.num_rounds,
                "timestamp": timestamp
            }
        }
        
        self.type = type
        self.data = gamedata

class PlayerDataMessage(WebsocketMessage):
    def __init__(self, player: Player):
        playerdata = {
            "playerdata": {
                "card": player.card,
                "start_room": player.start_room
            }
        }

        self.type = "player_data"
        self.data = playerdata