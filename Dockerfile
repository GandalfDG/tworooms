FROM node:18 as dev

RUN apt-get update && apt-get install -y python3 python3-pip

RUN pip3 install autopep8 sanic sanic-cors

USER node


FROM dev as build
COPY backend /backend
COPY frontend /frontend

WORKDIR /frontend

RUN npm i && npm run css-build && npm run build


FROM python as serve
RUN pip3 install sanic sanic-cors

COPY --from=build /frontend/dist /frontend/dist
COPY --from=build /backend /backend


WORKDIR /backend

ENV PORT=1337

CMD sanic -vp $PORT -H 0.0.0.0 server.app