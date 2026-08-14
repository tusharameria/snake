# Snake

# Production Setup

### Make sure you are in the root of the project

```shell
cd ~/public/gamedev/snake
```

### Create a dist

```shell
npm run build
```

### Always compress this to smaller size

```shell
cd dist && zip -r ../snake-dist.zip . && cd ..
```

### Use scp to send this to ec2 server

```shell
scp snake-dist.zip <your-ec2-user>@<your-ec2-host>:~/flowpe/snake-dist.zip
```

## SSH into remote server

### Go to the project directory

```shell
cd flowpe
```

### STOP THE DOCKER containers first (very important as volumes are binded)

```shell
docker compose down
```

### Uncompress it

```shell
rm -rf nginx/html/games/snake && mkdir -p nginx/html/games/snake && unzip snake-dist.zip -d nginx/html/games/snake
```

### RESTART THE DOCKER containers

```shell
docker compose up -d
```
