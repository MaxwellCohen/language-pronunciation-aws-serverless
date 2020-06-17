const {
  translate
} = require('./translate');


const obj = {
  text: 'goodbye',
  from: 'en',
  to: 'zh-Hans'
};

async function test() {
  console.log(await translate(obj));
  console.log(await translate(obj));
}

test();