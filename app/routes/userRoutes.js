module.exports = (app) => {
    const userController = require('../controllers/userController');

    app.post('/users', userController.addUser),

    app.get('/users', userController.getAllUsers),

    app.post('/users/login', userController.getUser),

    app.put('/users/update', userController.updateUser)
}