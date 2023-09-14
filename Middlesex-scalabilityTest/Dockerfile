FROM node

RUN mkdir -p /home/app

WORKDIR /home/app
COPY . /home/app

RUN npm install

CMD ["node", "index.js"]
