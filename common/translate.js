
/* eslint no-console: 0 */
const rp = require('request-promise');
const get = require('lodash.get');
const { getTranslateEnvVars } = require('./checkEnvVars');
const { addItem, doesItemExist, findItem, connect, disconnect } = require('./db/translationRepo.js');


function translaterate({
  text,
  language,
  fromScript,
  toScript
}) {
  const {
    endpoint,
    subscriptionKey
  } = getTranslateEnvVars();
  if (!text || text > 100 || !language || !fromScript || !toScript) {
    return Promise.reject();
  }

  let options = {
    method: 'POST',
    baseUrl: endpoint,
    url: 'transliterate',
    qs: {
      'api-version': '3.0',
      language,
      fromScript,
      toScript
    },
    headers: {
      'Ocp-Apim-Subscription-Key': subscriptionKey,
      'Content-type': 'application/json'
    },
    body: [{
      text
    }],
    json: true,
  };

  return rp(options).then(b => ({
    transliteration: b && b[0] && b[0].text
  }));
}

async function translate({
  text,
  from,
  to
}) {

  const {
    endpoint,
    subscriptionKey
  } = getTranslateEnvVars();
  if (!text || !from || !to) {
    return Promise.reject();
  }

  try {
    const seachOBJ = {text,from,to};
    await connect();
    const usedb =  await doesItemExist(seachOBJ);
    if (usedb) {
      const casheItem = await findItem(seachOBJ); 
      disconnect();
      return casheItem[0];
    }
  } catch (e) {
    console.log(e);
  }

  let options = {
    method: 'POST',
    baseUrl: endpoint,
    url: 'translate',
    qs: {
      'api-version': '3.0',
      'from': from,
      'to': [from, to],
      'toScript': ['Latn', 'Latn']
    },
    headers: {
      'Ocp-Apim-Subscription-Key': subscriptionKey,
      'Content-type': 'application/json',
    },
    body: [{
      'text': text
    }],
    json: true,
  };

  return rp(options).then(async (data) => {
    const obj = {
      from,
      to,
      text: get(data, '[0]translations[0].text', null),
      textTransliteration: get(data, '[0]translations[0].transliteration.text', null),
      translation: get(data, '[0]translations[1].text', null),
      translationTransliteration: get(data, '[0]translations[1].transliteration.text', null),
    };
    await addItem(obj);
    return obj;
  }, () => ({
    from: null,
    to: null,
    text: null,
    textTransliteration: null,
    translation: null,
    translationTransliteration: null,
  })).finally(async () => {
    await disconnect();
  });
}

function getLanguageSupport() {
  const {
    endpoint,
    subscriptionKey
  } = getTranslateEnvVars();
  let options = {
    method: 'GET',
    baseUrl: endpoint,
    url: 'languages',
    qs: {
      'api-version': '3.0',
    },
    headers: {
      'Ocp-Apim-Subscription-Key': subscriptionKey,
      'Content-type': 'application/json'
    },
    json: true,
  };
  return rp(options);
}

exports.getTranslateEnvVars = getTranslateEnvVars;
exports.translate = translate;
exports.getLanguageSupport = getLanguageSupport;
exports.translaterate = translaterate;