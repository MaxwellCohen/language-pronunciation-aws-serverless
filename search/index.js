const {
  ttsVoices
} = require('../common/TTS');
const {makeResposeObject} = require('../common/makeResposeObject');
// ttsVoices
module.exports.ttsVoices = async function (context) {
  let response;
  try {
    const data = await ttsVoices(context.queryStringParameters);
    response = makeResposeObject(data);
  } catch (e) {
    response = makeResposeObject({}, 400);
  }
  return response;
};