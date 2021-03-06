function getSpeechEnvVars() {
  const subscriptionKey = process.env.SPEECH_SERVICE_KEY;
  if (!subscriptionKey) {
    throw new Error('Environment variable for your subscription key is not set.');
  }
  const serviceRegion = process.env.SPEECH_SERVICE_REGION;
  if (!serviceRegion) {
    throw new Error('Environment variable for your SPEECH SERVICE REGION is not set.');
  }

  return {
    subscriptionKey,
    serviceRegion
  };
}



function getTranslateEnvVars() {
  var key_var = 'TRANSLATOR_TEXT_SUBSCRIPTION_KEY';
  if (!process.env[key_var]) {
    throw new Error('Please set/export the following environment variable: ' + key_var);
  }
  const subscriptionKey = process.env[key_var];
  var endpoint_var = 'TRANSLATOR_TEXT_ENDPOINT';
  if (!process.env[endpoint_var]) {
    throw new Error('Please set/export the following environment variable: ' + endpoint_var);
  }
  const endpoint = process.env[endpoint_var];
  return {
    subscriptionKey,
    endpoint
  };
}


function getS3EnvVars() {
  var key_var = 'accessKeyId';
  if (!process.env[key_var]) {
    throw new Error('Please set/export the following environment variable: ' + key_var);
  }
  const accessKeyId = process.env[key_var];
  var endpoint_var = 'secretAccessKey';
  if (!process.env[endpoint_var]) {
    throw new Error('Please set/export the following environment variable: ' + endpoint_var);
  }
  const secretAccessKey = process.env[endpoint_var];
  return {
    accessKeyId,
    secretAccessKey
  };
}
function getMongoUri() {
  var key_var = 'MONGO_URI';
  if (!process.env[key_var]) {
    throw new Error('Please set/export the following environment variable: ' + key_var);
  }
  const mongoUri = process.env[key_var];
  return mongoUri;
}


exports.getSpeechEnvVars = getSpeechEnvVars;
exports.getTranslateEnvVars = getTranslateEnvVars;
exports.getS3EnvVars = getS3EnvVars;
exports.getMongoUri = getMongoUri;