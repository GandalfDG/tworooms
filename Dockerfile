FROM node:18

RUN apt-get update && apt-get install -y python3 python3-pip

RUN pip3 install sanic

USER node