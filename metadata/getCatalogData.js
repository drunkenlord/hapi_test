const http = require('http');
const fs = require('fs')
const { execSync } = require('child_process');
const spawn = require('cross-spawn');
const clc   = require('chalk');
function ds() {return (new Date()).toISOString() + " [server] ";};


//Get the SSCWebCatalog Data :
//var prepareCatalog= spawn('cd ./metadata/SSCWeb && node SSCWeb2HAPI.js',{shell: true});

require('child_process').execSync('cd ./metadata/SSCWeb && node SSCWeb2HAPI.js', {'maxBuffer': 100000000}, (e, info, stderr) => {
		if (e) {
			console.log(ds() + clc.red("Error"))
			console.log("  " + clc.red(e.message.replace(/\n$/,"").replace("\n","\n  ")));
			exit_conditionally(exit_if_fail, e, cb);
		}
		console.log("Done")
	});
