const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const templatePath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', templatePath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Aaron Sawyer',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    info: 'My name is Aaron and I am a web developer.',
    name: 'Aaron',
    title: 'About',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    info: 'To get help please call 555-555-5555 or email us at help@youareawesome.com',
    name: 'Aaron',
    title: 'Help',
  });
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide and address!'
		});
	}
  
	const address = req.query.address;
	geocode(address, (error, {latitude, longitude, location} = {}) => {
		if (error) {
			return res.send({ error });
		}
      
		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({ error });
			}
			res.send({
				location,
				address: req.query.address,
				forecastData: forecastData,
			});
			console.log(`${location}`)
			console.log('Data:', forecastData)
		})
	})
});

// app.get('/products', (req, res) => {
//   if (!req.query.search) {
//     return res.send({
//       error: 'You must provide a search term',
//     });
//   }

//   console.log(req.query);
//   res.send({
//     products: [],
//   });
// });

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: 'Help article not found.',
    name: 'Aaron Sawyer',
    title: '404',
  });
});

app.get('*', (reg, res) => {
  res.render('404', {
    errorMessage: 'Page not found.',
    name: 'Aaron Sawyer',
    title: '404',
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
