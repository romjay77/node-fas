const express = require('express');
const compression = require('compression');
const bodyParser = require("body-parser");
const ejs = require('ejs');
const LRU = require('lru');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const PORT = process.env.PORT || 4040;

const homeRouter = require('./routes/homeRouter');
const adminRouter = require('./routes/adminRouter');
const helperProvider = require('./helpers/_helperProvider.js');

const admin = helperProvider.sender().getAdmin();
const app = express();
app.use(cors());
app.use(session({
	secret: 'fasad token',
	saveUninitialized: true,
	resave: true
}));
app.use(compression());
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

ejs.cache = LRU(150);

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use('/admin', adminRouter);
app.use('/', homeRouter);

app.post('/send', (req,res) => {
	helperProvider.sender().send(req.body.email, req.body.name);

	let data = helperProvider.sender().saveData(req);

	admin.forEach(email => {
		helperProvider.sender().sendToAdmin(email, data);
	});

	res.redirect('/');
});

app.use((req, res) => {
	res.status(404).redirect('/error.html');
});

app.listen(PORT, () => console.log('app working on http://localhost:4040 port'));