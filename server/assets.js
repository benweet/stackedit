const AWS = require('aws-sdk');
const request = require('request');
const _ = require('lodash');

const s3 = new AWS.S3();

const bucket = 'menntamalastofnun-lesari'

function listAssets() {
  return new Promise((resolve, reject) => {
    let responseData = [];
    s3.listObjects({Bucket: bucket}).on('success', function handlePage(response) {
      console.log(response.data);
      responseData.push(response.data["Contents"]);

      if (response.hasNextPage()) {
        response.nextPage().on('success', handlePage).send();
      } else {
        resolve(_.flatten(responseData));
      }
    }).on('error', function handleError(error) {
      reject(error);
    }).send();
  });
}

exports.listAssets = (req, res) => {
  listAssets().then(assets => {
    res.send(_.map(assets, asset => {
      return _.pick(asset, ['Key', 'ETag']);
    }));
  }).catch(error => {
    console.error(error);
    res.send(error);
  })
}
