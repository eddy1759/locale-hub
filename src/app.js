const express = require('express');
const morgan = require('morgan');
// const helmet = require('helmet');
const cors = require('cors');
// const session = require('express-session');
// const swaggerUi = require('swagger-ui-express');

// const CONFIG = require('./config/config');
// const dbConnection = require('./config/dbConfig');
// const redisClient = require('./config/redisConfig');
// const specs = require('./config/swagggerConfig');

// const { userRoutes, apiKeyRoutes, locationRoutes } = require('./routes/index');
const AppRouter = require('./routes/index');
const rateLimiter = require('./middleware/rateLimit');

const app = express();

// // Connect to the database
// dbConnection();

// Connect to Redis
// redisClient.connect();

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
// app.use(helmet());
app.use(cors());
// app.use(
// 	session({
// 		secret: CONFIG.SECRET,
// 		resave: false,
// 		saveUninitialized: false,
// 	})
// );

// Rate limiter middleware
app.use(rateLimiter);

// Routes
app.use('/v1', AppRouter);
// app.use('/api/locations', locationRoutes);
// app.use('/api/apiKey', apiKeyRoutes);

app.get('/', (req, res) => {
	res.status(200).json({
		status: true,
		message: 'Welcome to Locale built by Edet Emmanuel Asuquo',
		data: 'Go to /api-docs to access the api documentation',
	});
});

app.use('*', (req, res) => {
	res.status(404).send({
		success: false,
		message: 'Bad Request or Unknown endpoint',
	});
});

module.exports = app;
