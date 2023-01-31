module.exports = class MessageDto {
  constructor(model) {
    this.roomId = model.roomId;
    this.text = model.text;
    this.id = model._id;
    this.user = model.user;
  }
}