const {
  searchForItems,
  connect,
  disconnect
} = require('../common/db/translationRepo');
const {makeResposeObject} = require('../common/makeResposeObject');

module.exports.search = async function search (context) {
  let response;
  try {
    await connect();
    const data = await searchForItems(context.queryStringParameters);
    await disconnect();
    response = makeResposeObject(data);
  } catch (e) {
    response = makeResposeObject({}, 400);
  }
  return response;
};