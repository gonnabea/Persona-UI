#!/bin/bash
# 프로젝트명
DOCKER_APP_NAME=persona-client
# Blue 를 기준으로 현재 떠있는 컨테이너를 체크 후 종료할 컨테이너를 지정한다.
EXIST_BLUE=$(docker compose -p ${DOCKER_APP_NAME} ps | grep client-blue)
if [ "$EXIST_BLUE" ]; then
    CURRENT_CONTAINER="client-blue"
    NEW_CONTAINER="client-green"
    NEW_PORT="3002"
else
    CURRENT_CONTAINER="client-green"
    NEW_CONTAINER="client-blue"
fi

# 새로운 컨테이너를 시작하고 나서 오래된 컨테이너를 종료하고 삭제한다.
echo "Starting new \"$NEW_CONTAINER\" container"
docker compose -p ${DOCKER_APP_NAME} up -d --no-deps --build $NEW_CONTAINER
rv=$?
if [ $rv -eq 0 ]; then
    echo "New \"$NEW_CONTAINER\" container started"
else
    echo "Docker compose failed with exit code: $rv"
    echo "Aborting..."
    exit 1
fi

echo "Reloading Nginx..."
docker compose -p ${DOCKER_APP_NAME} exec web nginx -s reload

echo "Stopping old \"$CURRENT_CONTAINER\" container"
docker compose -p ${DOCKER_APP_NAME} stop $CURRENT_CONTAINER