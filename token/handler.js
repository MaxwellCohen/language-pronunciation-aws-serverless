const {
  getToken
} = require('../common/token');
const {makeResposeObject} = require('../common/makeResposeObject');

module.exports.token = async function () {
  let response;
  let token = null;
  try {
    token  = await getToken();
    response = makeResposeObject({token});
  } catch (e) {
    response = makeResposeObject({token}, 400);
  }
  return response;
};


