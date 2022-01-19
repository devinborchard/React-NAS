@ECHO OFF
title NodeJS
chdir ../
chdir myapi
set HOST=0.0.0.0 
set PORT=3001
npm start
nodemon

