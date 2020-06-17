function makeResposeObject(body, code = 200) {
  return {
    statusCode: code,
    headers: {
      'Access-Control-Allow-Origin': 'https://d204jpj04e0c2r.cloudfront.net', // Required for CORS support to work
    },
    body: JSON.stringify(body)
  };
}

exports.makeResposeObject = makeResposeObject;