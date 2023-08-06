const{validateToken}=require('../services/auth');

function checkAuthenticationCookie(cookie){
    return (req,res,next)=>{
          const tokenCookieValue=req.cookies[cookie]
          if(!tokenCookieValue){
             return next();
          }

         try{
            const userPayload=validateToken(tokenCookieValue);
            req.user=userPayload
           
         } catch(error){ }
         next();
    };
}


module.exports={
    checkAuthenticationCookie
};