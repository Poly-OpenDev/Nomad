// I need everybody to go to Version control and switch to 
// nightly-(developer-edition) - do not edit ANYTHING until you go there.
// if someone creates a new branch - you will need to switch.

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



require("sqreen")
const config = require('./config.js');
const path = require("path");
const fs = require("fs");
const rateLimit = require("express-rate-limit");
var express = require("express");
var exphbs  = require('express-handlebars');
var app = express();
var hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.enable('view cache');

app.enable("trust proxy");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000 // limit each IP to 1000 requests per windowMs
});
//  apply to all requests
app.use(limiter);

app.use('/', express.static('./public'));
app.use(express.static("node_modules"))

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

app.use((req, res, next) => res.status(404).sendFile('404.html', { root: 'views/error/' }));

const port = process.env.PORT || config.port;
app.listen(port, () => {
  console.log('Express server listening on port', port)
});

