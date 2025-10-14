export const errorHandler=(err,req,res,next)=>{
    console.error(err)
    if(err.code==="23505"){
        return res.status(400).json({
            success:false,
            error:'This record already exists'
        })
    }
    if(err.code==="ECONNREFUSED"){
        return res.status(500).json({
            success:false,
            error:"Error connecting to database"
        })
    }
    
  
    if(err.name==="ValidationError"){
        return res.status(400).json({
            success:false,
            error:err.message
        })
    }
    
    
    if(err.code==="23503"){
        return res.status(400).json({
            success:false,
            error:"Referenced doesn't exist"
        })
    }
    
    
    if(err.code==="22P02"){
        return res.status(400).json({
            success:false,
            error:"Invalid ID format"
        })
    }
    
    
    res.status(500).json({
        success:false,
        error:"Internal server error"
    })
}

export default errorHandler
