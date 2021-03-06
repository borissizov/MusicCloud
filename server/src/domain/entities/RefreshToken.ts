import { DataTypes } from "sequelize";
import dbProvider from "../../dbProvider";
import { IRefreshTokenInstace } from "../interfaces/IRefreshToken";

const RefreshToken = dbProvider.define<IRefreshTokenInstace>('RefreshToken', {
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.UUID,
    unique: true
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  token: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

export default RefreshToken;
