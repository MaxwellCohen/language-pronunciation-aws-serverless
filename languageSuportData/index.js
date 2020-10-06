// const {getLanguageSupportData} = require('../common/languageSuportData');
const data = require('./data.json');

const {makeResposeObject} = require('../common/makeResposeObject');

module.exports.languageSuportData = async function () {
  let response;

  try {
    // const languageObject = await getLanguageSupportData();
    response = makeResposeObject(data);

  } catch (e) {
    response = makeResposeObject({}, 400);
  }

  return response;
};