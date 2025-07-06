import jwt from 'jsonwebtoken';

// admin authentication
const authAdmin = async (req, res, next) => {
  console.log("✅ authAdmin middleware triggered"); // add this at the top

  try {
   const aToken = req.headers.atoken;


console.log("TOKEN FROM HEADER:", aToken);

    // ❗ Check if token is MISSING
    if (!aToken) {
      return res.json({ success: false, message: 'JWT must be provided' });
    }

  const token_decode = jwt.verify(aToken, process.env.JWT_SECRET);
console.log("Decoded token:", token_decode); // ✅ log decoded
console.log("Expected email:", process.env.ADMIN_EMAIL); // ✅ log expected
if (token_decode.email !== process.env.ADMIN_EMAIL) {
  return res.json({ success: false, message: "Not Authorized" });
}


    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authAdmin;
