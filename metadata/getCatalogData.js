const http = require('http');
const fs = require('fs')
const { execSync } = require('child_process');
const spawn = require('cross-spawn');
const clc   = require('chalk');
function ds() {return (new Date()).toISOString() + " [server] ";};

let catalog_url = "http://hapi-server.org/servers/TestData2.0/hapi/catalog";


function request(url, cb) {

	console.log(ds() + "Getting " + url);

	function process_(resp) {
		let data = '';

		// A chunk of data has been recieved.
		resp.on('data', (chunk) => {
			data += chunk;
		});
		resp.on('end', () => {
			console.log(ds() + "Got " + url);
			cb(null, data);
		});
	}

	if (url.substring(0,5) === 'https') {
		https.get(url, process_).on("error", (err) => cb(err));
	} else {
		http.get(url, process_).on("error", (err) => cb(err));
	}
}


function getinfo(caturl, catalog, cb) {

  getone(0);
  function getone(i) {
    if (i == catalog.length) {
      cb(null, catalog);
      return;
    }
    url = caturl.replace("hapi/catalog","hapi/info") + "?id=" + catalog[i].id;
    request(url, (e, data) => {
      if (e) {
        cb(e);
      } else {
        try {
          catalog[i].info = JSON.parse(data.toString());
        } catch (e) {
          console.log(ds() +  clc.red(str + " output is not JSON.parse-able. Try https://jsonlint.com/."));
          cb(e);
        }
        getone(++i);
      }
    });
  }
}



request(catalog_url, (e, data) => {
    if (e) {
      console.log("Error getting " + catalog_url + ": " + e.message);
      exit_conditionally(exit_if_fail, e, cb);
    }
    jsonstr = data.toString();
    try {
      obj = JSON.parse(jsonstr);
    } catch (e) {
      console.log(ds() +  clc.red(str + " output is not JSON.parse-able. Try https://jsonlint.com/. Exiting."));
      exit_conditionally(exit_if_fail, e, cb);
    }

      console.log(ds() +  "Catalog node in server configuration is a HAPI server. Getting info metadata for all server datasets.");
      getinfo(catalog_url, obj.catalog, (e, obj) => {
        if (e) {
          exit_conditionally(exit_if_fail, e, cb);
        } else {
          //cb(e, obj);
          fs.writeFileSync(__dirname + '/Example_Catalogs/catalog_7_9.json', JSON.stringify(obj));
          console.log("DONE");
        }
      });

  });


//Get the SSCWebCatalog Data :
var prepareCatalog= spawn('cd ./metadata/SSCWeb && node SSCWeb2HAPI.js',{shell: true});
