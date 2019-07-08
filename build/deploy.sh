#!/bin/bash
set -e

# Tag and push docker image
docker login -u benweet -p "$DOCKER_PASSWORD"
docker tag benweet/stackedit "benweet/stackedit:$TRAVIS_TAG"
docker push benweet/stackedit:$TRAVIS_TAG
docker tag benweet/stackedit:$TRAVIS_TAG benweet/stackedit:latest
docker push benweet/stackedit:latest

# Build the chart
cd "$TRAVIS_BUILD_DIR"
npm run chart

# Add chart to helm repository
git clone --branch master "https://benweet:$GITHUB_TOKEN@github.com/benweet/stackedit-charts.git" /tmp/charts
cd /tmp/charts
helm package "$TRAVIS_BUILD_DIR/dist/stackedit"
helm repo index --url https://benweet.github.io/stackedit-charts/ .
git config user.name "Benoit Schweblin"
git config user.email "benoit.schweblin@gmail.com"
git add .
git commit -m "Added $TRAVIS_TAG"
git push origin master
