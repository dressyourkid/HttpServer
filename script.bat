#!/bin/sh

IMAGE_NAME="dressyourkid/kid-shop"
# 1 - stop already running container by name
RUNNING_CONTAINERS=$(docker ps -q --filter ancestor=$IMAGE_NAME)
if [ ! -z "$RUNNING_CONTAINERS" ]; 
then
    echo "containers already running: $RUNNING_CONTAINERS"
    CMD_STOP="docker stop $RUNNING_CONTAINERS"
    eval $CMD_STOP
else
    echo "no running containers found"
fi

# 2 - pulling the updated image
echo "pulling image from hub.docker.com"
CMD_PULL="docker pull $IMAGE_NAME"
eval $CMD_PULL

# 3 - run updated container
CMD_RUN="docker run -d -p 8080:8080 --env-file ./kid-shop.prod.env $IMAGE_NAME"
eval $CMD_RUN