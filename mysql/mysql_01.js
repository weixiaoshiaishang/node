var mysql = require('mysql');
var util = require('util');
/*
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'zfpx',
    database:'test'
});
connection.connect();
//setInterval(function(){
    connection.query('select * from person',function(err,rows){
        if(err)
            throw err;
        console.log(rows[0]);
        //connection.end();
    });

//},200);
*/

/*
connection.query('insert into person values()',function(err,info){
    console.log(info.insertId);
});
*/
/*
connection.query("update person set name='zf' ",function(err,info){
    console.log(info.affectedRows);
});*/


function getConnection(){
    var connection = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'zfpx',
        database:'test'
    });
    connection.connect(function(err){
        if(err){
            setTimeout(getConnection,3000);
        }
    });
    connection.on('error',function(err){
        getConnection();
    });
    return connection;
}
var connection = getConnection();
/*
var name = '这是用户的数据\' or \'1\'=\'1';
name = connection.escape(name);
console.log(name);
var sql = 'select * from person where name=\''+name+'\'';
connection.query(sql,function(err,results){
    if(err)
      console.log(err);
    console.log('results'+results);
});*/

/*
connection.query('select ?? from person where name=? order by '+mysql.escapeId('order'),[['name','age'],'zf'],function(err,results){
    if(err)
        console.log(err);
    console.log('results'+util.inspect(results));
});*/

var pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'zfpx',
    database:'test',
    conectionLimit:10
})

pool.getConnection(function(err,connection){
    connection.query('select ?? from person where name=? order by '+mysql.escapeId('order'),[['name','age'],'zf'],function(err,results){
        if(err)
            console.log(err);
        console.log('results'+util.inspect(results));
    });
});
