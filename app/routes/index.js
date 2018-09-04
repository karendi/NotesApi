/**
 * All the routes that belong to the app
 */

const noteRoutes = require('./noteRoutes');
const userRoutes = require('./userRoutes');

module.exports=(app) => {
    noteRoutes(app);
    userRoutes(app);
}