
const { ttsVoices } = require('../common/TTS');
const {getLanguageSupport} = require('../common/translate');
const {makeResposeObject} = require('../common/makeResposeObject');

module.exports.languageSuportData = async function (context) {
  let response;
  const cleanUPName = (Name, Gender, locale) => {
    let name = Name.match(/\((.*), (.*)\)/);
    if (name) {
      locale = locale.split('-')[1];
      return `${name[2]} (${Gender} - ${locale})`;
    }
    return Name;
  };
  try {
    const [voices, languageSupport] = await Promise.all([ttsVoices(), getLanguageSupport()]);
    const voiceObject = voices.reduce((acc, {
      Name,
      Gender,
      ShortName,
      Locale
    }) => {
      const lang = Locale.split('-')[0];
      acc[lang] = acc[lang] || [];
      let name = cleanUPName(Name, Gender, Locale);
      acc[lang].push({
        name,
        code: ShortName
      });
      return acc;
    }, {});
    const languageObject = Object.keys(languageSupport.translation).reduce((acc, key) => {
      const simpleLang = key.split('-')[0];
      if (voiceObject[simpleLang]) {
        acc[key] = {
          ...languageSupport.translation[key],
          code: key,
          voices: voiceObject[simpleLang]
        };
      }
      return acc;
    }, {});
    const body = Object.values(languageObject);
    response = makeResposeObject(body);

  } catch (e) {
    response = makeResposeObject({}, 400);
  }

  return response;
};