console.log('Client side JavaScript file is loaded.');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (event) => {
	event.preventDefault();

	const location = search.value;
	const url = 'http://localhost:3000/weather?address=' + encodeURIComponent(location);
	
	messageOne.textContent = 'Loading...';
	messageTwo.textContent = '';	
	
	fetch(url).then((response) => {
		response.json().then((data) => {
			console.log(data);
			if (data.error) {
				messageTwo.textContent = data.error;
			} else {
				messageOne.textContent = data.location;
				messageTwo.textContent = data.forecastData;
			}
		});
	});
});