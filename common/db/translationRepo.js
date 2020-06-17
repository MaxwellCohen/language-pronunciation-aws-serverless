/* eslint-disable no-console */
const mongoose = require('mongoose');
const {getMongoUri} = require('../checkEnvVars');
require('./helpers');


// // config mongoose
async function connect() {
  require('./model/translation');
  const mongoURI = getMongoUri();
  mongoose.Promise = global.Promise;
  return await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    createIndexes: false
  });
}
  
function disconnect() {
  mongoose.disconnect();
}

/*
{
  text = 'goodnight',
  from = 'en',
  textTransliteration = '',
  translation = '晚安',
  to = 'en-Hans',
  translationTransliteration = 'wǎn ān'
}
*/
async function addItem({
  text = '',
  from = '',
  textTransliteration = '',
  translation = '',
  to = '',
  translationTransliteration = ''
}) {
  const translationModel = mongoose.model('translation');
  const newtranslation = new translationModel({
    text,
    from,
    textTransliteration,
    translation,
    to,
    translationTransliteration
  });

  const newtranslation2 = new translationModel({
    text: translation,
    from: to,
    textTransliteration: translationTransliteration,
    translation: text,
    to: from,
    translationTransliteration: textTransliteration,
  });
  try {
    await newtranslation.save();
  } catch (e) {
    console.log(e);
  }
  try {
    await newtranslation2.save();
  } catch (e) {
    console.log(e);
  }
  
}

async function doesItemExist(search) {
  const translationModel = mongoose.model('translation');
  const exists = await translationModel.exists(search);
  console.log('doesItemExist',  exists);
  
  return exists;
}

async function findItem(search) {
  const translationModel = mongoose.model('translation');
  const item = await translationModel.find(search).limit(1).exec();
  console.log(item);
  
  return item;
}

async function searchForItems({from, to, text}) {
  const translationModel = mongoose.model('translation');
  let item = translationModel.find({
    from,
    to
  });
  if( text) {
    item = item.startsWith('text', text);
  }
  
  item = await item.limit(10).exec();
  console.log(item);
  
  return item;
}


exports.addItem = addItem;
exports.doesItemExist = doesItemExist;
exports.findItem = findItem;
exports.searchForItems = searchForItems;
exports.connect = connect;
exports.disconnect = disconnect;



// addItem({
//   text:'goodnight',
//   from: 'en',
//   textTransliteration: '',
//   translation:'晚安',
//   to:'en-Hans',
//   translationTransliteration:'wǎn ān'
// })