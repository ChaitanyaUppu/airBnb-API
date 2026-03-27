const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // with this as decoded u can use req.user and identify the current user id and can use that 
    // is to find his/her details and used like req.user.id
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports.isAdmin = (req, res, next) => {
  console.log(req.user);
  if (req.user.role !=='admin'||!req.user) return res.status(403).json({ msg: 'Admin access required' });
  next();
};