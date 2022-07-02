from sanic import Sanic
from sanic.response import json, file
from sanic_cors import CORS, cross_origin

from os import path

app = Sanic("tworooms")
CORS(app)


# this will be replaced with redis for "production"
app.ctx.gamedata = {}

app.static("/assets", "/workspaces/tworooms/tworooms-vue/dist/assets")


async def get_app(request, ext=None):
    return await file(location="/workspaces/tworooms/tworooms-vue/dist/index.html")

app.add_route(get_app, "/<ext>/")
app.add_route(get_app, "/")


@app.post("api/create/")
async def create_room_handler(request):
    return json(
        {
            "roomcode": request.json['playername']
        })

