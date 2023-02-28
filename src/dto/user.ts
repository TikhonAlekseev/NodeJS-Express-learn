import { model } from "mongoose";
import { UserModel } from "src/@types/entities";

export default class UserDto {
  private username: string;
  private email: string;
  private id: string;

  constructor(model: UserModel) {
    this.username = model.username;
    this.email = model.email;
    this.id = model._id;
  }
}