const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config()
const cors = require('cors');

const { eAdmin } = require('./middle/auth');

app.use(express.json());

app.use((req, res, next) =>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
  app.use(cors());
  next();
})

app.get('/usuarios', eAdmin, function(req, res){
  res.json({
    erro: false,
    message: "Listar usuarios!!"
  })
});

app.post('/login', function(req, res){
  //console.log(req.body);  
  if(req.body.usuario === 'thiago' && req.body.senha === '1234'){
    const { id } = 1;
    var privateKey = process.env.SECRET;
    var token = jwt.sign({id}, privateKey,{
      expiresIn: 600,// 10 min
      expiresIn:'7d', // 7 dias
    });
   return res.json({
      erro: false,
      message: "Login valido!!",
      token
    });
  }
  return res.json({
    erro: false,
    message: "Login invalido!!",
    dados: req.body
  })
  
});



app.listen(3030, function(){
  console.log("Servidor iniciado ")
})