const {
  translate
} = require('../common/translate');
const {makeResposeObject} = require('../common/makeResposeObject');

// query params text, from, to
// translate?text=你好&from=Zh&to=en
module.exports.translate = async function (context) {
  let response;
  try {
    const data = await translate(context.queryStringParameters);
    response = makeResposeObject(data);

  } catch (e) {
    response = makeResposeObject({}, 400);
  }
  return response;
};