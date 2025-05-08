const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ msg: "No token provided" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ msg: "Invalid token" });
    req.user = user;
    next();
  });
};

exports.verifyAdmin = (req, res, next) => {
  if (req.user.role !== "Admin") {
    return res.status(403).json({ msg: "Access denied: Admins only" });
  }
  next();
};
