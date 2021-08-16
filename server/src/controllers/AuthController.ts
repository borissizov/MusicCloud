import { NextFunction, Request, Response } from "express";
import AuthService from "../services/AuthService";
import { ParamsDictionary } from 'express-serve-static-core';
import config from "../configuration/config";

interface IAuthRequest extends Request {
  body: IAuthBody;
};

interface IAuthBody {
  email: string;
  password: string;
};

interface IActivationRequest extends Request<IActivationParams> {
  body: IAuthBody;
};

interface IActivationParams extends ParamsDictionary {
  link: string;
}

class AuthController {
  async register(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const userData = await AuthService.register(email, password);

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true
      });
      return (res.json(userData));
    } catch (e) {
      next(e);
    }
  };

  async login(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const userData = await AuthService.login(email, password);

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true
      });
      return (res.json(userData));
    } catch (e) {
      next(e);
    }
  };

  async logout(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (e) {
      next(e);
    }
  };

  async activate(req: IActivationRequest, res: Response, next: NextFunction) {
    try {
      const activationLink = req.params.link;

      await AuthService.activate(activationLink);
      res.redirect(config.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  };

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (e) {
      next(e);
    }
  };
};

export default new AuthController();