const authorize = (requiredRole) => {
    return (req, res, next) => {
      const { user } = req;
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized. No user information available.' });
      }
  
      if (user.role !== requiredRole) {
        return res.status(403).json({ error: `Access denied. Only ${requiredRole}s can perform this action.` });
      }
      next(); 
    };
  };
  module.exports = authorize;
  