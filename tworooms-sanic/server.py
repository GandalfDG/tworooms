from sanic import Sanic
from sanic.response import json

app = Sanic("tworooms")
app.extend(config={"cors":False})

# this will be replaced with redis for "production"
app.ctx.gamedata = {}

@app.post("create/")
async def create_room_handler(request):
    return json({
        "roomcode": "returned code"
    })