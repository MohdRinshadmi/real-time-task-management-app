import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { getJwtToken } from "../../utils/jwtToken.js";
import { User } from "../../models/index.js";

class AuthService {
  async getUserByUsername(username) {
    console.log('username in service', username);
    return await User.findOne({ where: { username } });
  }

  async validatePassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }

  async generateToken(user) {
    const tokenData = { id: user.userId || user.id, email: user.email, username: user.username, sessionId: randomUUID() };
    return getJwtToken(tokenData);
  }
}

export default new AuthService();
