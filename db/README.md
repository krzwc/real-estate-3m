NOTES:
docker network create --driver=bridge real-estate-3m
docker run -d --network=real-estate-3m -p 27017:27017 --name=db --rm mongo:3
docker run -it --network=real-estate-3m --rm mongo:3 mongo --host db

>show dbs
>use tester
>db.someCollection.insertOne({ x: 1 })
>show collections

```
https://btholt.github.io/complete-intro-to-containers/networking
https://github.com/btholt/complete-intro-to-containers/blob/master/lessons/more-complicated-nodejs-app.md
``` 

-> build & run client app
docker build --tag remote-client-3m-with-mongo .
docker run -p 3000:3000 --network=real-estate-3m --env MONGO_CONNECTION_STRING=mongodb://db:27017 remote-client-3m-with-mongo

z composem:
docker-compose up -d
docker-compose exec --user root db mongo
-> in the shell:
>use admin;
>db.auth("root", "password");
>use myDatabase;
>db.createUser({user: "root", pwd: "password", roles:[{role: "readWrite" , db:"myDatabase"}]});

albo

>db.grantRolesToUser('admin', [{ role: 'root', db: 'admin' }])

compass -> mongodb://root:password@localhost:27017/



Usuwanie starej bazy
====================
docker network inspect {network}
network disconnect -f {network} {endpoint-name}
