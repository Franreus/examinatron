const express = require('express')

require('./db/mongoose')
//const fishRouter = require('./routers/fish')

const port = process.env.PORT
// express app
const app = express();

// listen for requests
app.listen(port, () => {
	console.log(`Server listening for port ${process.env.PORT}`)
});

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));

app.use((req, res, next) => {
	console.log('new request made:');
	console.log('host: ', req.hostname);
	console.log('path: ', req.path);
	console.log('method: ', req.method);
	next();
});

//Api
const questionsRouter = require('./routers/questions')
app.use(express.json())
app.use('/api', questionsRouter)

app.get('/', (req, res) => {
	res.render('index', { title: 'Quizz questions'});
});

// 404 page
app.use((req, res) => {
	res.status(404).render('404', { title: '404' });
});