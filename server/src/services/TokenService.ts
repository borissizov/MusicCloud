import { sign, verify } from "jsonwebtoken";
import config from "../configuration/config";
import RefreshToken from "../domain/entities/RefreshToken";
import { IUserDTO } from "../domain/dto/IUserDTO";
import { v4 } from "uuid";

class TokenService {
  generateTokens(payload: IUserDTO) {
    const accessToken = sign(payload, config.ACCESS_SECRET_KEY, {
      expiresIn: '15s'
    });
    const refreshToken = sign(payload, config.REFRESH_SECRET_KEY, {
      expiresIn: '15d'
    });

    return {
      accessToken,
      refreshToken
    }
  };

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await RefreshToken.findOne({ where: { userId } });

    if (tokenData) {
      tokenData.set('token', refreshToken);
      return tokenData.save();
    }
    const tokenId = v4();
    const token = await RefreshToken.create({
      id: tokenId,
      userId: userId,
      token: refreshToken
    });

    return (token);
  };

  async removeToken(refreshToken: string) {
    const tokenData = await RefreshToken.destroy({ where: { token: refreshToken } });

    return (tokenData);
  };

  async findToken(refreshToken: string) {
    const tokenData = await RefreshToken.findOne({ where: { token: refreshToken } });

    return (tokenData);
  };

  validateToken(secretKey: string, token: string) {
    try {
      const userData = verify(token, secretKey) as IUserDTO;

      return (userData);
    } catch (_) {
      return (null);
    }
  };
};

export default new TokenService();
