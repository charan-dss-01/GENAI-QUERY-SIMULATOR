import jwt from "jsonwebtoken";

// Middleware to authenticate users using JWT
export const authenticateToken = (req, res, next) => {
    const token = req.cookies.token; // Read token from cookies

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.userId = decoded.userId;
    req.user = { userId: decoded.userId };  // Attach user ID to request
    next();
  });
};
