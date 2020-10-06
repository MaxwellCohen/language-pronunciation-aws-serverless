const {
  getLanguageSupportData
} = require('./languageSuportData');


const obj = {
  text: 'goodbye',
  from: 'en',
  to: 'zh-Hans'
};

async function test() {
  var res = await getLanguageSupportData(obj);
  console.log(Object.keys(res));
}

test();
