const {
  translaterate,
} = require('../common/translate');
const {makeResposeObject} = require('../common/makeResposeObject');


module.exports.translaterate = async function (context) {
  let response;
  try {
    const data = await translaterate(context.queryStringParameters);
    response = makeResposeObject(data);
  } catch (e) {
    response = makeResposeObject({}, 400);
  }
  return response;
};