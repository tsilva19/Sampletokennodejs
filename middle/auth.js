const jwt = require('jsonwebtoken');
const {promisify} = require('util');
require('dotenv').config();

module.exports ={
  eAdmin : async function validarToken(req, res, next){
  
    const autHeader = req.headers.authorization;
    const [, token] = autHeader.split(' ');
    
    if(!token){
      return res.json({
        erro: true,
        message: "Erro: Token invalido"
      });
    }try {
      const decode = await promisify(jwt.verify)(token, process.env.SECRET);
       req.userId = decode.id;
      return next();
    } catch (error) {
      return res.json({
        erro: true,
        message: "Erro: Login ou senh INVALIDO"
      });
    }
  }
}