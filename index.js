// where did all everyone's motivation go -WYLD
// Hey guys - we have merged with Coders united which 
// means there are now 13 devs on this repl.

// had to get round the limit via a personal repl.


// commit daily to nightly
// commit weekly to weekly  
// commit monthly to monthly
// commit yearly to yearly
//
// date start 30th August 2020
//
// hey guys - codeteacher is starting a team at 
// https://coders.flarum.cloud/
// feel free to join.
 

const config = require('./config.js');
const path = require("path");
const fs = require("fs");

const express = require("express");
const app = express();

const rateLimit = require("express-rate-limit");
const exphbs  = require('express-handlebars');
const http = require('http').Server(app);
const io = require('socket.io')(http);
require("sqreen")
const bad = require('bad-words');
const filter = new bad();

// var hbs = exphbs.create({});

app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static("node_modules"));

app.enable('view cache');

app.enable("trust proxy");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000
});
app.use(limiter);

app.use((req, res, next) => {
	const url = req.path.toString().split('?')[0];
	const allowed = ['/', '/download'];
	const userId = req.get('X-Replit-User-Id');
	if(userId) {
		const credentials = {
			username: req.get('X-Replit-User-Name'),
			id: userId
		}
		res.locals.creds = credentials;
	}
	if(allowed.includes(url)) {
		next();
	}
	else {
		userId ? next() : res.redirect('/');
	}
});

// 'home','dashboard','download
app.get('/', (req, res) => {
	res.render('home', res.locals.creds);
	// if(req.get('X-Replit-User-Id').render('home'))
})

app.all('/logout', (req, res) => {
	res.set('Clear-Site-Data', `"cache", "cookies", "storage", "executionContexts"`);

	res.redirect('/');
})

for(const page of config.pages) {
	app.get(`/${page}`, (req, res) => {
		res.render(`${page}.html`, res.locals.creds);
	})
}

/*
for (let page of config.pages) {
	let root = './views/';
	if (fs.existsSync(`./pages/custom/${page}.html`)) {
		root = './views/custom/';
	}
	if (page == 'home')
  {
		app.get('/', async function(req, res, next){

      if (req.get('X-Replit-User-Id'))
      {
        res.sendFile(`${page}.html`, { root: root, headers: {"x-username": req.get("X-Replit-User-Name"), "x-userid": req.get("X-Replit-User-Id")}});
      }
      else
      {
        res.sendFile(`${page}.html`, { root: root });
      }
      
    });
	}
  else
  {
		app.get(`/${page}`, async function(req, res, next){

      if (req.get('X-Replit-User-Id'))
      {
        res.sendFile(`${page}.html`, { root: root, headers: {"x-username": req.get("X-Replit-User-Name"), "x-userid": req.get("X-Replit-User-Id")}});
      }
      else
      {
        res.sendFile(`${page}.html`, { root: root });
      }
      
    });
   }
}
*/
app.use((req, res, next) =>  {
	// res.status(404).sendFile('404.html', { root: 'views/error/' }));
	res.status(404).render('error/404.html')
});

const port = process.env.PORT || config.port;
app.listen(port, () => {
  	console.log('Express server listening on port', port)
});

 