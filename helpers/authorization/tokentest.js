const sendJwtToClient= function(user,res){
    //Generate Jwt
  
    const token=user.generateJwtFromUser()
   
    const {JWT_COKIE,NODE_ENV}=process.env
    

    return res
    .status(200)
    .cookie("access_token",token,{
        httpOnly:true,
        expires:new Date(Date.now()+parseInt(JWT_COKIE)*1000*60),
        secure:NODE_ENV==="development"? false :true
    })
    .json({
        succes:true,
        access_token:token,
        data:{
            fname:user.fname,
            email:user.email

        }
    });
}
const isTokenInclueded= (req) =>{
    return (
        req.headers.authorization
    );
}
const getAccessTokenFromHeader=(req)=>{
    const authorization=req.headers.authorization
    const access_token=authorization.split(":")[1];
    return access_token
}

module.exports={
    sendJwtToClient,
    isTokenInclueded,
    getAccessTokenFromHeader,
}