import jwt from 'jsonwebtoken';

/// admin authentication middleware

const authUser = async (req, res, next)=>{
    try {
        const {token} = req.headers
       

        if(!token){
           return res.json({success:false, message: "Not Authorized Login Again"}); 
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log(token_decode.id)
        
        req.userId = token_decode.id 
        next();
        
    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message})    
      
    }
}

export default authUser;