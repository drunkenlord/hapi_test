com = "'C:\Program Files\nodejs\node.exe' 'C:\Users\ksred\Desktop\test\server-nodejs-master/bin/TestData2.0.js' --id dataset1 --parameters scalar --start 1970-01-01T00:00:00.000000000Z --stop 1970-01-01T00:00:10.000000000Z";
com1 = "$PYTHONEXE $HAPISERVERPATH/bin/Example.py --params '${parameters}' --start ${start} --stop ${stop} --fmt ${format}";
com2 = "node lib/subset.js --columns 1-2 --url 'http://hapi-server.org/servers/TestData2.0/hapi/data?id=dataset1&parameters=scalar&time.min=1970-01-01Z&time.max=1970-01-01T00:00:11Z&attach=false' --stop 1970-01-01T00:00:07"

var async = require('asyncawait/async');
var await = require('asyncawait/await');

var coms  = com.split(/\s+/);
var coms0 = coms.shift();

// console.log("Com is "+ com);
// console.log("Coms is "+ coms);
// console.log("Coms2 is "+com2);

//var child = require('child_process').spawn('sh', ['-c', com], {"encoding": "buffer"});

//let child = require('child_process').exec('sh', ['-c', com2], {stdio: 'pipe'});

var out = require('child_process').spawn(com)
console.log("OUT is "+ out.toString())
