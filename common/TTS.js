
// request-promise has a dependency on request
const rp = require('request-promise');
const {getSpeechEnvVars} = require('./checkEnvVars');



function makebaseobject(options, header) {
  const {subscriptionKey, serviceRegion} = getSpeechEnvVars();
  const baseURL = `https://${serviceRegion}.tts.speech.microsoft.com/`;

  return {
    baseUrl: baseURL,
    ...options,
    headers: {
      'Ocp-Apim-Subscription-Key': subscriptionKey,
      'User-Agent': 'YOUR_RESOURCE_NAME',
      ...header,
    }
  };
}

function tts({text, lang, voice}) {
  // Convert the XML into a string to send in the TTS request.
  const body = `<?xml version="1.0"?>
  <speak version="1.0" xml:lang="${lang}">
  <voice xml:lang="${lang}" name="${voice}">${text}</voice></speak>`;


  return rp(makebaseobject({
    method: 'POST',
    url: 'cognitiveservices/v1',
    body
  }, {
    'cache-control': 'no-cache',
    'X-Microsoft-OutputFormat': 'riff-24khz-16bit-mono-pcm',
    'Content-Type': 'application/ssml+xml'
  }));
}

function ttsVoices() {
  return rp(makebaseobject({
    method: 'GET',
    url: '/cognitiveservices/voices/list',
    json: true,
  }, {
    'Content-Type': 'application/json',
  }));
}

exports.ttsVoices = ttsVoices;
exports.tts = tts;
