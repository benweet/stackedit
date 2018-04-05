#!/bin/bash
set -e
docker login -u benweet -p "$DOCKER_PASSWORD"
docker tag benweet/stackedit "benweet/stackedit:$TRAVIS_TAG"
docker push benweet/stackedit:$TRAVIS_TAG
docker tag benweet/stackedit:$TRAVIS_TAG benweet/stackedit:latest
docker push benweet/stackedit:latest
