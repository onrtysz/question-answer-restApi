const CustomError=require('../../helpers/error/CustomError')
const customerrorHandlers=(err,req,res,next)=>{
    let customError=err
    
 if(err.code === 11000) {
     customError=new CustomError("Duplicated email error:Check your mail",400)
 }
if (err.name==="SyntaxError") {
    customError=new CustomError("unexpected syntax",400)
}

    
    console.log(customError.message,customError.status)
res.
status(customError.status || 500)
.json({
    success:false,
    message: customError.message || "Internal server error"
})

}

module.exports=customerrorHandlers