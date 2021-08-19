
const express = require('express');
const router = express.Router();
const sql = require('mysql');
const db = require('../connection');

router.get('/user', (req, res)=>{
    db.query('select * from candidate', (err, result)=>{
        if(err) throw err;
        res.end(JSON.stringify(result))
    });
});

router.post('/user', (req, res)=>{
    const name = req.body.name;
    const email_address = req.body.email_address;
    const test_id = req.body.test_id;
   
    var sql = 'INSERT INTO candidate(name, email_address, test_id) VALUES(?, ?, ?)';
    db.query(sql, [name, email_address, test_id], (err, result)=>{
        if(err) throw err;
        res.write('Data Inserted')
        res.end();
    });
});

router.post('/score', (req, res)=>{
    const test_score1 = req.body.test_score1;
    const test_score2 = req.body.test_score2;
    const test_score3 = req.body.test_score3;
   
    var sql = 'INSERT INTO test_score(test_score1, test_score2, test_score3) VALUES(?, ?, ?)';
    db.query(sql, [test_score1, test_score2, test_score3], (err, result)=>{
        if(err) throw err;
        res.write('Data Inserted')
        res.end();
    });
});

router.get('/score', (req, res)=>{
    db.query('select candidate.name, test_score.test_score1, test_score.test_score2, test_score.test_score3 from candidate, test_score where candidate.test_id = test_score.id order by candidate.id', (err, result)=>{
        if(err) throw err;
        res.end(JSON.stringify(result))
    });
});


router.get('/max', (req, res)=>{
    db.query('select * from candidate, test_score where candidate.test_id = test_score.id', (err, result)=>{
        if(err) throw err;
        // res.end(JSON.stringify(result))
        var obj;
        var obj_array=[];
        var obj_name = [];
        var obj_avg = [];
        var test_score1 = "test_score1";
        var test_score2 = "test_score2";
        var test_score3 = "test_score3";
        var name = "name";
        for (var i = 0; i<result.length;i++){
            obj = result.filter((item) => {
                return item.id    
            });
            for(var j = 0; j<obj.length; j++){
                obj_array[j] = obj[j][test_score1]+obj[j][test_score2]+obj[j][test_score3];
                obj_name[j] = obj[j][name]
                obj_avg[j] = Math.floor((obj[j][test_score1]+obj[j][test_score2]+obj[j][test_score3])/3);
            }
        }
        // console.log(obj_avg)
        // console.log(obj_name, obj_array)

        // var k = 0;
        // var f =0;
        // let max = obj_array[0];
        
        // while(k == f && f<obj_array.length){
        //     console.log(obj_name[k], obj_array[f])
        //     if(max<obj_array[f]){
        //         max = obj_array[f]+ " "+obj_name
        //     }
        //     k++
        //     f++
        // }

        let max = obj_array[0];
        var name;
        var k = 0;
        while(k<obj_array.length){
            // console.log(obj_name[k], obj_array[k])
            if(obj_array[k]>max){
                max = obj_array[k] 
                name = obj_name[k] 
          }
          k++
        }
        console.log(name, max)
        var result = name + " " + max
        res.end(JSON.stringify(result))
    });
});

router.get('/avg', (req, res)=>{
    db.query('select * from candidate, test_score where candidate.test_id = test_score.id', (err, result)=>{
        if(err) throw err;
        // res.end(JSON.stringify(result))
        var obj;
        var obj_array=[];
        var obj_name = [];
        var obj_avg = [];
        var test_score1 = "test_score1";
        var test_score2 = "test_score2";
        var test_score3 = "test_score3";
        var name = "name";
        for (var i = 0; i<result.length;i++){
            obj = result.filter((item) => {
                return item.id    
            });
            for(var j = 0; j<obj.length; j++){
                obj_array[j] = obj[j][test_score1]+obj[j][test_score2]+obj[j][test_score3];
                obj_name[j] = obj[j][name]
                obj_avg[j] = Math.floor((obj[j][test_score1]+obj[j][test_score2]+obj[j][test_score3])/3);
            }
        }
        // console.log(obj_avg)
        let avg;
        var k = 0;
        while(k<obj_avg.length){
            console.log(obj_name[k], obj_avg[k])
            avg = obj_name + ":" + obj_avg;
            k++
        }
        res.end(JSON.stringify(avg))
    });
});

module.exports = router;