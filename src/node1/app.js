
const express = require('express');
const http = express();
const session = require('express-session');
http.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false
  }));

let obj_url = require('url');
let obj_file = require('fs');
const formidable = require('formidable');
let mysql = require('mysql');
let nodemailer = require('nodemailer');

var flash = require('req-flash');
var counter = 0;

http.use(flash());

http.post("/logindb", (req,res)=>{
    let form_login = new formidable.IncomingForm();
        form_login.parse(req, (err,fields,files)=>{
            let userlogin = fields.loginemail;
            let userpass = fields.passlogin;
            let db_con = mysql.createConnection({
                host:'localhost',
                user:'root',
                password:'',
                database:'finalproject'
            });
            db_con.connect((err)=>{
                if(err) throw err;
                let my_querylogin = "SELECT * FROM users_data WHERE email='" +userlogin+ "'";
                db_con.query(my_querylogin, (err,results, fields)=>{
                    let mydata = results;
                    if(mydata.length == 1){
                        if(mydata[0].password == userpass){
                            res.send("Logged in");
                            counter = 0;
                            return res.end();
                        }else if(mydata[0].email == userlogin && mydata[0].password != userpass ){
                            counter++;
                            if(counter == 3){
                                let transporter = nodemailer.createTransport({
                                    service:'gmail',
                                    auth:{
                                        user:'testnametst@gmail.com',
                                        pass:'mypasstest1234$'
                                    }
                                });
                                let mail_options = {
                                    from:'testnametst@gmail.com',
                                    to:userlogin,
                                    subject:'Wrong password',
                                    text:'Dear client, Here is your information:First name:'+mydata[0].first_name + 'Last name:'+mydata[0].lastname + 'Email:'+mydata[0].email + 'Current password:' + mydata[0].password
                                }
                                transporter.sendMail(mail_options, (err,info)=>{
                                    res.send("You have put the wrong password 3 times, an email has been sent");
                                    return res.end();

                                })
                            }else{
                                res.send("Wrong password, try again");
                                return res.end();
                            }
                            
                        }
                    }else{
                        res.send("The user does not exist");
                        return res.end();
                    }                   
                })
            })
            
        })
})
http.post("/registerdb", (req,res)=>{
    let form_data = new formidable.IncomingForm();
        form_data.parse(req, (err, fields, file)=>{
            let fname = fields.fname;
            let lname = fields.lname;
            let email = fields.email;
            let dob = fields.dob;
            let gender = fields.gender;
            let password = fields.pass;
            let db_con = mysql.createConnection({
                host:'localhost',
                user:'root',
                password:'',
                database:'finalproject'
            })
            db_con.connect((err)=>{
                if (err) throw err;
                let query_check = "SELECT * FROM users_data WHERE email='" +email+ "'";
                db_con.query(query_check,(err,results, fields)=>{
                    let data = results;
                    console.log(data);
                    if(data.length >= 1){
                        res.send("This user has already been registeres, please log in");
                    }else{
                        let my_query = "INSERT INTO users_data (first_name,last_name,email,dob,gender,password) VALUES ('"+fname+"','"+lname+"','"+email+"','"+dob+"','"+gender+"','"+password+"')";
                        db_con.query(my_query, (err,result)=>{
                        if(err) throw err;
                        req.flash('message', 'Registered Succesfully');
                        res.redirect("/login");
                        return res.end();
                        })
                    }
                })
            })

        })
})

const PORT = process.env.PORT || 8080;
http.listen(PORT, console.log('server started on port ' + PORT));