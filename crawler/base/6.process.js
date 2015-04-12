var child_process = require('child_process');
//spawn exec
/*var dir = child_process.spawn('cmd.exe1',['/s','/c','dir','E:\\']);
dir.stdout.pipe(process.stdout);
dir.stderr.pipe(process.stderr);
dir.on('close',function(code){
    console.log(arguments);
});
dir.on('error',function(code){
    console.log(arguments);
});*/

function execNodeFile(file){
    var node = child_process.spawn(process.execPath,[file]);
    node.stdout.pipe(process.stdout);
    node.stderr.pipe(process.stderr);
    node.on('close',function(code){
        console.log(arguments);
    });
    node.on('error',function(code){
        console.log(arguments);
    });
}

//execNodeFile('test.js');

child_process.exec('9idir *',function(err,stdout,stderr){
    if(err)
        console.error(err);
    console.log(stdout);
    console.log(stderr);
});