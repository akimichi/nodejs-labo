FROM nodejs-labo-onbuild:6.10
#FROM registry.homeunix.net:5000/emile/nodejs-labo-6.10_onbuild:0.2

VOLUME ["/usr/src/app"]

RUN npm install && npm cache clean

