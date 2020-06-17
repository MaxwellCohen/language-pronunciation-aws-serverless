const mongoose = require('mongoose');


mongoose.Query.prototype.startsWith = function (key, prefix) {
  this.where({ [key]: new RegExp('^' + prefix) });
  return this;
};