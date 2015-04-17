// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
var archive = require('../helpers/archive-helpers.js');
var request = require('request');
var fs = require('fs');

exports.downloadUrls = function(string){
  console.log("here in downloadURLS");
  request('http://' + string).pipe(fs.createWriteStream(archive.paths.archivedSites+"/" +string))
 };