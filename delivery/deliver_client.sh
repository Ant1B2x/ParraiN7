#!/bin/bash

cd /opt/ParraiN7
git pull
git checkout main
cd client
npm install
npm run build
cp -r dist/* /var/www/parrain7.ant1b2x.com/

cd
exit 0
