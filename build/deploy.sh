#!/bin/bash
set -e
docker login -u benweet -p "$DOCKER_PASSWORD"
docker tag benweet/stackedit "benweet/stackedit:$TRAVIS_TAG"
docker push benweet/stackedit:$TRAVIS_TAG
docker tag benweet/stackedit:$TRAVIS_TAG benweet/stackedit:latest
docker push benweet/stackedit:latest

git clone "https://benweet:$GITHUB_TOKEN@github.com/benweet/stackedit-charts.git" charts
cd charts
helm package ../chart
helm repo index --url https://benweet.github.io/stackedit-charts/ .
git config user.name "Benoit Schweblin"
git config user.email "benoit.schweblin@gmail.com"
git add .
git commit -m "Added $TRAVIS_TAG"
git push origin master
