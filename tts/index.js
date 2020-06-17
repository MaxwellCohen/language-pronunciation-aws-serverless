/* eslint-disable no-console */
const {
  s3tts
} = require('../common/s3-access');
const {makeResposeObject} = require('../common/makeResposeObject');

module.exports.tts = async function (context) {
  let response = null;
  try {
    const audio = await s3tts(context.queryStringParameters);
    console.log(audio);
    response = makeResposeObject({});
    response.body = audio;
  } catch (e) {
    response = makeResposeObject(e, 200);
  }
  console.log(response);
  return response;
};