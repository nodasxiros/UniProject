var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BearScheam = new Schema({
  name: String
});

module.exports = mongoose.model('Bear', BearScheam);
