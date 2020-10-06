const { ttsVoices } = require('./TTS');
const {getLanguageSupport} = require('./translate');


const sttLangSupport = 
['ar-AE',
  'ar-BH',
  'ar-EG',
  'ar-IL',
  'ar-JO',
  'ar-KW',
  'ar-LB',
  'ar-PS',
  'ar-QA',
  'ar-SA',
  'ar-SY',
  'ca-ES',
  'da-DK',
  'de-DE',
  'en-AU',
  'en-CA',
  'en-GB',
  'en-IN',
  'en-NZ',
  'en-US',
  'es-ES',
  'es-MX',
  'fi-FI',
  'fr-CA',
  'fr-FR',
  'gu-IN',
  'hi-IN',
  'it-IT',
  'ja-JP',
  'ko-KR',
  'mr-IN',
  'nb-NO',
  'nl-NL',
  'pl-PL',
  'pt-BR',
  'pt-PT',
  'ru-RU',
  'sv-SE',
  'ta-IN',
  'te-IN',
  'th-TH',
  'tr-TR',
  'zh-CN',
  'zh-HK',
  'zh-TW'];

const cleanUPName = (Name, Gender, locale) => {
  let name = Name.match(/\((.*), (.*)\)/);
  if (name) {
    locale = locale.split('-')[1];
    return `${name[2]} (${Gender} - ${locale})`;
  }
  return Name;
};

async function getLanguageSupportData() {
  const [voices, languageSupport] = await Promise.all([ttsVoices(), getLanguageSupport()]);
  const voiceObject = voices.reduce((acc, {
    Name,
    Gender,
    ShortName,
    Locale
  }) => {
    const lang = Locale.split('-')[0];
    if (sttLangSupport.includes(Locale)) {
      acc[lang] = acc[lang] || [];
      let name = cleanUPName(Name, Gender, Locale);
      acc[lang].push({
        name,
        code: ShortName
      });
    }
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

  const data = Object.values(languageObject);
  return data;
}


module.exports.getLanguageSupportData = getLanguageSupportData;