function makeResposeObject(body, code = 200) {
  return {
    statusCode: code,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    body: JSON.stringify(body)
  };
}

exports.makeResposeObject = makeResposeObject;