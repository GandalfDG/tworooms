from dataclasses import dataclass, field
from typing import Any
import json as JSON

from gamestate import GameRoom, Player

@dataclass
class WebsocketMessage():
    type: str
    data: dict[str, Any] = field(default_factory=lambda: {})

    @property
    def json(self):
        json = JSON.dumps({
            "message": self.type,
            "data": self.data
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