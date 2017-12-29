import db from '../models';

const DEFAULT_DEPARTMENT = 'Тех. департаммент';
const DEFAULT_TEAM = '';


export default class UserService {
  async getUserById(id) {
    this.user = await db.User.findById(id);

    return this.user;
  }

  async saveOrUpdate() {
    if (this.user.changed() === false) {
      return this.user;
    }

    try {
      this.user = await this.user.save();
    } catch (error) {
      console.error(error);
      throw error;
    }

    return this.user;
  }

  async create({
    firstName = '', lastName = '', email, department = DEFAULT_DEPARTMENT, team = DEFAULT_TEAM,
  }) {
    const [user] = await db.User.findOrCreate({
      where: { email },
      defaults: {
        firstName, lastName, email, department, team,
      },
    });
    this.user = user;
    return this.user;
  }

  getUserData() {
    return this.user;
  }

  setUserData({
    firstName = '', lastName = '', email, department = DEFAULT_DEPARTMENT, team = DEFAULT_TEAM,
  }) {
    this.user.set({
      firstName, lastName, email, department, team,
    });
    return this.user;
  }
}
