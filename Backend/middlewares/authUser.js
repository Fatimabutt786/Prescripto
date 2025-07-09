import jwt from 'jsonwebtoken';

// admin authentication middleware
const authUser = async (req, res, next) => {
  try {
    // console.log("✅ Middleware called");

    const Token = req.headers.token;
    // console.log("🧾 Token received:", Token);

    if (!Token) {
      // console.log("❌ No token provided");
      return res.json({ success: false, message: 'JWT must be provided' });
    }

    const token_decode = jwt.verify(Token, process.env.JWT_SECRET);
    console.log("🔓 Token decoded:", token_decode.id);

    req.userId = token_decode.id; 
    // console.log("📌 req.userId set to:", req.userId);

    next();
  } catch (error) {
    // console.log("❌ Error in authUser middleware:", error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
