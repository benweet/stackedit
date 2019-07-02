#!/bin/bash
set -e

# Tag and push docker image
docker login -u benweet -p "$DOCKER_PASSWORD"
docker tag benweet/stackedit "benweet/stackedit:$TRAVIS_TAG"
docker push benweet/stackedit:$TRAVIS_TAG
docker tag benweet/stackedit:$TRAVIS_TAG benweet/stackedit:latest
docker push benweet/stackedit:latest

# Add chart to helm repository
git clone "https://benweet:$GITHUB_TOKEN@github.com/benweet/stackedit-charts.git" charts
cd charts
helm package ../dist/stackedit
helm repo index --url https://benweet.github.io/stackedit-charts/ .
git config user.name "Benoit Schweblin"
git config user.email "benoit.schweblin@gmail.com"
git add .
git commit -m "Added $TRAVIS_TAG"
git push origin master

# Upgrade the deployed release
helm repo update
helm upgrade stackedit stackedit/stackedit
