
import { findOne } from '../models/userAuthentication'; // Import userAuthentication model

// Authentication middleware
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const email = req.headers['x-email'];
    if (!authHeader || !email ) {
      return res.status(401).json({ message: 'Authorization header missing or invalid' });
    }

    const token = authHeader;
    const user = await findOne({ token });
    if (!user) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // Optionally attach user info to the request for later use
    req.user = { email: user.email, user_type: user.user_type };
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error during authentication', error: error.message });
  }
};

export default { authenticate };