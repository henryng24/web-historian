var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers.js');
var fs = require('fs');

// require more modules/folders here!

exports.handleRequest = function (req, res) {

  var file = __dirname + '/public/index.html';


  if (req.method === 'POST'){
    console.log("here in post");
    var responseCode = 201;
    var headers = httpHelper.headers;
    res.writeHead(responseCode, headers);
    var str = "";

    req.on('data',function(chunk) {
      str += chunk;
    });

    req.on('end', function(){
      var urlString = str.slice(8);
      if (archive.readListOfUrls(urlString)) {
        if (archive.isURLArchived(urlString)) {
          console.log('already exists');
        }
      } else {
        console.log('urlarchived');
        //archive.downloadUrls(urlString);
      }
    });
    res.end();
  } else if(req.method === 'GET'){
    if (req.url === '/') {
      fs.readFile(file, function (err, html) {
        if (err) {
          throw err;
        }
        var responseCode = 200;
        var headers = httpHelper.headers;
        res.writeHead(responseCode,headers);
        res.write(html);
        res.end();//JSON.stringify({}));
      });
    }else{
     /*   var urlString = '/www.google.com';//req.url or req.data
        var currentFile = archive.paths.archivedSites + urlString;
        fs.readFile(currentFile, function (err, html) {
          if (err) {
            throw err;
          }*/
          var responseCode = 200;
          var headers = httpHelper.headers;
          res.writeHead(responseCode,headers);
          //res.write(html);
          res.end();//JSON.stringify({}));
      //  });
    }

  }
  else if(req.method === 'OPTIONS'){

    var responseCode = 200;
    var headers = httpHelper.headers;
    res.writeHead(responseCode, headers);
    res.end();

  }
  else{

  }

//  res.end(archive.paths.siteAssets);
};
