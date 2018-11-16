#!/bin/bash

set -euv

CONTAINER_TTL=5m

for ARG in "$@"; do
    case $ARG in
        --port=*)
            PORT="${ARG#*=}"
            shift
            ;;
    esac
done

NETWORKING="--network=host"

# docker on OSX doesn't support host networking
if [ "$(uname)" == "Darwin" ]; then
    NETWORKING="-p $PORT:$PORT";
fi

# cleanup old containers
docker ps -aqf "status=exited" | xargs -rI {} docker rm -f {} 1>/dev/null

ID=$(docker run \
    -d \
    -u chrome \
    --cap-add=SYS_ADMIN \
    --shm-size=512m \
    $NETWORKING \
    c9-headless:latest \
    sleep ${CONTAINER_TTL})

trap "docker rm -f $ID &> /dev/null" EXIT SIGINT SIGTERM

docker exec \
    -u chrome \
    $ID \
    timeout ${CONTAINER_TTL} /usr/bin/chromedriver --port=$PORT --whitelisted-ips=""
