const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config');

const artists = require('./app/artists');
const albums = require('./app/albums');
const tracks = require('./app/tracks');
const users = require('./app/users');
const trackHistories = require('./app/trackHistories');

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const run = async () => {
	await mongoose.connect(config.database, config.databaseOptions);

	app.use('/artists', artists);
	app.use('/albums', albums);
	app.use('/tracks', tracks);
	app.use('/users', users);
	app.use('/trackHistories', trackHistories);

	app.listen(port, () => {
		console.log(`Server started on ${port} port!`);
	});
};

run().catch(e => {
	console.error(e);
});