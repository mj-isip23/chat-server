const User = require('../models/User');
const Room = require('../models/Room');

class UserController {
  async index(field = null) {
    this.users = await User.find({ ...field })
      .populate('room');
    return this.users;
  }

  async show(id) {
    this.user = await User.findById(id)
      .populate('room');
    return this.user;
  }

  async store(body, room) {
    let userRoom = await Room.findOne({ name: room });

    if (!userRoom) {
      userRoom = new Room({ name: room });
    }

    this.user = new User({ ...body });
    userRoom.users.push(this.user);
    await userRoom.save();

    this.user.room = userRoom;
    await this.user.save();

    this.user.populate('room');
    return this.user;
  }

  async update(id, body) {
    this.user = await User.findByIdAndUpdate(id, { ...body })
      .populate('room');
    return this.user;
  }

  async delete(id) {
    this.user = await User.findByIdAndDelete(id)
      .populate('room');
    return this.user;
  }
}

module.exports = new UserController();
