const User = require('../models/User');

class UserController {
  // создать пользователя
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async getUsers(_, res) {
    {
      // res.send("Получены все пользователи")
      try {
        const allUsers = await User.findAll()
        if (!allUsers.length) {
          res.send('Пользователи ещё не зарегистрированны')
        } else {
          res.json(allUsers)
        }

      } catch (error) {
        res.status(404).json({
          error: error.message
        })
      }
    }
  }
  async getOneUser(req, res) {
    
      // res.send("Получены все пользователи")
      try {
        const {id} = req.body
        const user = await User.findOne(id)
        if (!user) {
          res.send('Пользователи ещё не зарегистрированны')
        } else {
          res.json(user)
        }

      } catch (error) {
        res.status(404).json({
          error: error.message
        })
      }
    
  }
  async updateUser(req, res) {

  }
  async deleteUser(req, res) {

  }
}

module.exports = new UserController();