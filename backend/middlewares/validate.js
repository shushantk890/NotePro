

const logger=(req, res, next) => {
  console.log(`${req.method} ${req.url} at ${new Date().toISOString()}`);
  next();
};


const errorhandler=(err,req,res,next)=>{
    console.error("error",err.message)
    res.status(500).json({"error":"something went wrong"})
}

module.exports={logger,errorhandler}