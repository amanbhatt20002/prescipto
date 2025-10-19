import jwt from "jsonwebtoken";

//user auth middleware
const authUser = (req, res, next) => {
  try {
    // Get token from "Authorization: Bearer <token>"
    console.log("Received auth header:", req.headers.authorization);

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: 'Not Authorized. Login again' });
    }

    const token = authHeader.split(" ")[1]; // get the actual token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = { id: decoded.id };
    next();
    
  } catch (error) {
    console.log("AUTH ERROR:", error);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};



export default authUser;
