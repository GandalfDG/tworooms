FROM node:18 as dev

RUN apt-get update && apt-get install -y python3 python3-pip

RUN pip3 install autopep8 sanic sanic-cors
USER node


FROM dev as build

ARG GIT_SHA

COPY --chown=node frontend/package.json frontend/package-lock.json /frontend/

USER node
WORKDIR /frontend
RUN npm install

USER root
COPY --chown=node backend /backend
COPY --chown=node frontend/public /frontend/public/
COPY --chown=node frontend/src /frontend/src/
COPY --chown=node frontend/.env.production frontend/index.html frontend/vite.config.js /frontend/

USER node
WORKDIR /frontend

ENV VITE_GIT_SHA=$GIT_SHA

RUN npm run test:unit && npm run css-build && npm run build


FROM python as serve
RUN pip3 install sanic sanic-cors==2.2.0

COPY --from=build /frontend/dist /frontend/dist
COPY --from=build /backend /backend


WORKDIR /backend

ENV PORT=1337

CMD sanic -vp $PORT -H 0.0.0.0 server.app