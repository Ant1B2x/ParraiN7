#!/bin/bash

cd /opt/ParraiN7
git pull
git checkout main
cd server
npm install
npm run compile
pm2 reload parrain7

cd
exit 0
