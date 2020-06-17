const {getLanguageSupport} = require('../common/translate');
const {makeResposeObject} = require('../common/makeResposeObject');


module.exports.getLanguageSupport = async function (context) {
  let response;
  try {
    const data = await getLanguageSupport(context.queryStringParameters);
    response = makeResposeObject(data);
  } catch (e) {
    response = makeResposeObject({}, 400);
  }
  return response;
};