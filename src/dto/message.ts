import { MessageModel } from "src/@types/entities";

export default class MessageDto {
  private roomId: string;
  private text: string;
  private id: string
  private user: string;

  constructor(model: MessageModel) {
    this.roomId = model.roomId;
    this.text = model.text;
    this.id = model._id;
    this.user = model.user;
  }
}