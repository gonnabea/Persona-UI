#!/bin/bash

echo 'deploying dev branch'

pm2 delete persona-ui

git pull origin dev

pm2 start "npm run prod" --name persona-ui
