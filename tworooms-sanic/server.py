from sanic import Sanic
from sanic.response import json
from sanic_cors import CORS, cross_origin

app = Sanic("tworooms")
CORS(app)


# this will be replaced with redis for "production"
app.ctx.gamedata = {}


@app.post("create/")
async def create_room_handler(request):
    return json(
        {
            "roomcode": request.json['playername']
        })
