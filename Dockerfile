FROM node:18

RUN apt-get update && apt-get install -y python3 python3-pip

RUN pip3 install autopep8 sanic sanic-cors

COPY backend /backend
COPY frontend /frontend

WORKDIR /frontend

RUN npm i && npm run build


WORKDIR /backend
USER node

ENV PORT=1337

CMD ["python3", "-m", "sanic", "-v", "server.app"]