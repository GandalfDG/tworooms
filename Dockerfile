FROM node:18 as dev

RUN apt-get update && apt-get install -y python3 python3-pip

RUN pip3 install autopep8 sanic sanic-cors
USER node


FROM dev as build

ARG GIT_SHA

USER node

WORKDIR /frontend
COPY frontend/package.json frontend/package-lock.json /frontend
RUN npm install

COPY backend /backend
COPY frontend /frontend


ENV VITE_GIT_SHA=$GIT_SHA

RUN npm run test:unit && npm run css-build && npm run build


FROM python as serve
RUN pip3 install sanic sanic-cors==2.2.0

COPY --from=build /frontend/dist /frontend/dist
COPY --from=build /backend /backend


WORKDIR /backend

ENV PORT=1337

CMD sanic -vp $PORT -H 0.0.0.0 server.app