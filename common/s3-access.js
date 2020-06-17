/* eslint-disable no-console */
const S3 = require('aws-sdk/clients/s3');
const stream = require('stream');
const {
  tts
} = require('./TTS');
const {
  getS3EnvVars
} = require('./checkEnvVars');

const s3 = new S3(getS3EnvVars());

function makeParams(Key) {
  return {
    Bucket: 'language-pronunciation',
    Key
  };
}

function makeKey(type, {
  lang,
  voice,
  text
}) {
  return [type, lang, voice, text].join('/') + '.wav';
}

async function doesfileExist(params) {
  try {
    await s3.headObject(params).promise();

    return params.Key;
  } catch (headErr) {
    if (headErr.code === 'NotFound') {
      return null;
    }
  }
}


async function s3tts({
  text,
  lang,
  voice
}) {
  if (!text || text.length > 100 || !lang || !voice) {
    return '';
  }

  const key = makeKey('tts', {
    lang,
    voice,
    text
  });
  const params = makeParams(key);
  const s3URL = await doesfileExist(params);
  if (s3URL) {
    return s3URL;
  } else {
    //use TTS service 
    const TTSRequest = tts({
      text,
      lang,
      voice
    });
    let buffer = [];
    let audio;

    TTSRequest.on('response', (response) => {
      if (response.statusCode === 200) {
        TTSRequest.pipe(uploadFromStream(params));
      }
    });

    TTSRequest.on('data', (chunk) => {
      buffer.push(chunk);
    });
    TTSRequest.on('end', () => {
      buffer = Buffer.concat(buffer);
      const bufferString = buffer.toString('base64');

      audio = `data:audio/wav;base64,${bufferString}`;
    });
    await TTSRequest;
    return audio;
  }

}

function uploadFromStream(param) {
  const pass = new stream.PassThrough();
  const params = {
    ...param,
    ACL: 'public-read',
    Body: pass
  };
  
  s3.upload(params, function(err, data) {
    if (err) {
      console.log(err, data);
    }
  });
  
  return pass;
}


exports.s3tts = s3tts;