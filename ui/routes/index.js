var express = require('express');
const http = require('http');
var router = express.Router();
var ip = "192.168.31.189";
var port = "9000";


router.get('/', function (req, res, next) {
	res.render('layout.ejs', {
		title: 'Express'
	});
});

router.get('/getDashboard', function (req, res, next) {
	res.render('dashboard/dashboard.ejs', {
		title: 'Express'
	});
});

router.get('/getUsers', function (req, res, next) {
	res.render('users.ejs', {
		title: 'Express'
	});
});


router.get('/get-users', (req, resInit) => {

	var str = '';

	const options = {
		hostname: ip,
		port: port,
		path: '/users/get',
		method: 'GET'
	}

	req = http.request(options, res => {


		res.on('data', function (chunk) {
			str += chunk;
		});

		res.on('end', function () {
			console.log(JSON.parse(str));
			// resInit.send(str);
			resInit.render('partials/user-grid.ejs', {
				data: JSON.parse(str)
			});
		});
	})

	req.on('error', error => {

	})

	req.end()
});




router.post('/insert-user', (req, resInit) => {
	console.log("will insert");
	console.log(req.body);
	var str = '';

	const postData = JSON.stringify(req.body);


	const options = {
		hostname: ip,
		port: port,
		path: '/users/insert',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': postData.length
		}
	}

	req = http.request(options, res => {

		res.on('data', function (chunk) {
			str += chunk;
		});

		res.on('end', function () {
			console.log(JSON.parse(str));
			resInit.send(str);
		});
	})

	req.on('error', error => {
		console.error(error)
	})

	req.write(postData)
	req.end()

});


router.get('/get-user-by-id', (req, resInit) => {

	var str = '';

	const options = {
		hostname: ip,
		port: port,
		path: '/users/get-by-id?id=' + req.query.id,
		method: 'GET'
	}

	req = http.request(options, res => {


		res.on('data', function (chunk) {
			str += chunk;
		});

		res.on('end', function () {
			console.log(JSON.parse(str));
			// resInit.send(str);
			resInit.send(str);
		});
	})

	req.on('error', error => {

	})

	req.end()
});


router.patch('/update-user', (req, resInit) => {
	console.log("will update");
	console.log(req.body);
	var str = '';

	const postData = JSON.stringify(req.body);


	const options = {
		hostname: ip,
		port: port,
		path: '/users/update',
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': postData.length
		}
	}

	req = http.request(options, res => {

		res.on('data', function (chunk) {
			str += chunk;
		});

		res.on('end', function () {
			console.log(JSON.parse(str));
			resInit.send(str);
		});
	})

	req.on('error', error => {
		console.error(error)
	})

	req.write(postData)
	req.end()

});

module.exports = router;