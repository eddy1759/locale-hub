// const userRoutes = require('./user.routes');
// const apiKeyRoutes = require('./apikey.routes');
// const locationRoutes = require('./location.routes');

// module.exports = { userRoutes, apiKeyRoutes, locationRoutes };

const express = require('express');
const userRouter = require('./user.routes');

const router = express.Router();

const defaultRoutes = [
	{
		path: '/auth',
		router: userRouter,
	},
];

defaultRoutes.forEach((val) => {
	router.use(val.path, val.router);
});

module.exports = router;
