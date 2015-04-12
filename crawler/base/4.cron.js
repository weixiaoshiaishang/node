var cronJob = require('cron').CronJob;
var job1 = new cronJob("1-30/5 * * * * *",function(){
    console.log('每秒');
});
job1.start();
/*var job2 = new cronJob("*//*3 * * * * *",function(){
    console.log('每3秒');
});
job2.start();*/
/**
 * second minute hour day month dayOfWeek
 * * 每执行一次
 * a-b 从第几秒到第几秒
 * 星/n每隔多少秒执行一次
 * a-b/n
 **/