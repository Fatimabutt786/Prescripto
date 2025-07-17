import jwt from 'jsonwebtoken';

// doctor authentication middleware
const authDoctor = async (req, res, next) => {
  try {
  

    const dtoken = req.headers.dtoken;
      console.log('receiving token:', dtoken)
 

    if (!dtoken) {
    
      return res.json({ success: false, message: 'JWT must be provided' });
    }

    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);
    console.log("🔓 Token decoded:", token_decode.id);

    req.docId = token_decode.id; 
   

    next();
  } catch (error) {
    // console.log("❌ Error in authUser middleware:", error);
    res.json({ success: false, message: error.message });
  }
};

export default authDoctor;
