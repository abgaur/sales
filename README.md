# sales

1. Run "npm install" command in both root and angular-src directory
2. Install mongodb server - https://docs.mongodb.com/
3. Install Redis server - https://github.com/MSOpenTech/redis
4. Run "npm install -g @angular/cli" if not present
5. Run "ng serve" command inside angualr-src directory
6. Start "mongod"
7. Run "npm install -g nodemon" command 
8. Run "nodemon app" command inside the root directory
9. nodejs server - http://localhost:3000
10. angular server - http://localhost:4200


# redis

1. Start redis server "redis-server" (On windows -> pass path of confing file as parameter: ./redis.windows.conf)
2. Run redis client "redis-cli"

# production setup

1. To build angular code : ng build --environment=prod
2. To start PM2 : $ pm2 start app.js --watch