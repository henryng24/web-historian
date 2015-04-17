var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public/index.html'),
  'archivedSites' : path.join(__dirname, '../web/archives/sites'),
  'list' : path.join(__dirname, '../web/archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(string){
  var file = this.paths.list;
  var found = false;
  var data = fs.readFileSync(file);
    var allRows = data.toString().split("\n");
    for(var i=0;i<allRows.length;i++){
      if(allRows[i] === string){
        found =  true;
      }
    }
    if(!found){
      exports.addUrlToList(string);
    }
  return found;
};

exports.isUrlInList = function(){

};

exports.addUrlToList = function(string){
  var file = this.paths.list;
 fs.appendFile(file,"\n"+string,function(err){
  if (err) {
    console.log('cannot append');
  }
  });
}



exports.isURLArchived = function(string) {
  var directoryPath = this.paths.archivedSites;
  var found = false;
  var files = fs.readdirSync(directoryPath);
  for (var fileNames in files) {
    if (string ===files[fileNames]) {
      found = true;
        console.log('file created');
      } else {
      console.log('make file');
    }
   }
  return found;
 };

// exports.downloadUrls = function(string){
//   console.log("here in downloadURLS");
//   request('http://' + string).pipe(fs.createWriteStream(exports.paths.archivedSites+"/" +string))
//  };
