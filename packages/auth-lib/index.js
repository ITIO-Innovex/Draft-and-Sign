import jwt from 'jsonwebtoken';

export const verifyJWT = (secretOrPublicKey) => {
  return async(req, res, next) => {
    const token = req.headers?.authorization.replace("Bearer ","");
    if (!token) return res.status(401).send('Missing token');

    try {
      const decoded = jwt.verify(token, secretOrPublicKey);
      req.user = decoded;
      if(!decoded) {
        return res.status(401).json({
          status:401,
          message: "Invalid Access token",
          data: null
        });
      }
      next();
    } catch {
      res.status(403).send('Invalid or expired token');
    }
  };
};
