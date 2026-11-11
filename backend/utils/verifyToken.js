import jwt from "jsonwebtoken";

// Base: verify JWT and attach req.user
export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ success: false, message: "You are not authorized!" });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: "Token is invalid" });
    }
    req.user = decoded;
    next();
  });
};

// Anyone logged in
export const verifyUser = (req, res, next) => verifyToken(req, res, next);

// Logged in AND (owner of :id OR admin)
export const verifySelfOrAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.role === "admin") return next();
    return res.status(403).json({ success: false, message: "Forbidden" });
  });
};

// Logged in AND admin
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "admin") return next();
    return res.status(403).json({ success: false, message: "Admin only" });
  });
};