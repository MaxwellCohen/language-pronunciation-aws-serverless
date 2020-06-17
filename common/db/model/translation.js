const mongoose = require('mongoose');
const { Schema } = mongoose;


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

const translation = new Schema({
  from: { type : String , required : true },
  text: { type : String , required : true },
  textTransliteration: { type : String , required : false },
  to: { type : String , required : true },
  translation: { type : String , required : true },
  translationTransliteration:  { type : String , required : false },
});

translation.index({
  'from': 1,
  'to': 1,
  'text': 1
}, { unique: true });

mongoose.model('translation', translation);
