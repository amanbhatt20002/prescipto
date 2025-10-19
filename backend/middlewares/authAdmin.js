import jwt from "jsonwebtoken";

//admin auth middleware

const authAdmin = (req, res, next) => {
  try {
    // Get token from "Authorization: Bearer <token>"
    console.log("Received auth header:", req.headers.authorization);

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // get the token part
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token format" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err)
        return res
          .status(401)
          .json({ success: false, message: "Token invalid or expired" });
      req.admin = decoded;
      next();
    });
  } catch (error) {
    console.log("AUTH ERROR:", error);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

export default authAdmin;
