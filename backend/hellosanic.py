from sanic import Sanic
from sanic.response import text

app = Sanic("helloworld")

@app.get("/")
async def hello_world(request):
    return text("hello world")