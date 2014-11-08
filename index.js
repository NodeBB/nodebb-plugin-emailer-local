var fs = require('fs'),
	path = require('path'),

	winston = module.parent.require('winston'),
	settings = module.parent.require('./settings'),

	nodemailer = require('nodemailer'),
	appSettings = new settings('smpt-settings'),
	Emailer = {};

Emailer.init = function(app, middleware, controllers, callback) {
	function renderAdminPage(req, res, next) {
		res.render('admin/emailers/local', {});
	}

	app.get('/admin/emailers/local', middleware.admin.buildHeader, renderAdminPage);
	app.get('/api/admin/emailers/local', renderAdminPage);

	callback();
};

Emailer.send = function(data) {
	var username = appSettings.cfg.username;
	var pass = appSettings.cfg.password;
	var from = appSettings.cfg.from;
	var transportOptions = {
		host: appSettings.cfg.host,
		port: appSettings.cfg.port,
	};
	if (appSettings.cfg.ssl == 'on')
	{
		transportOptions.secureConnection = true;
	}
	if( username || pass ) {
		transportOptions.auth = {
			user: username,
			pass: pass
		};
	}
	var transport = nodemailer.createTransport('SMTP', transportOptions);

	console.log(data);

	transport.sendMail({
		to: data.to,
		from: from,
		html: data.html,
		text: data.plaintext,
		subject: data.subject
	}, function(err,response) {
		if ( !err ) {
			winston.info('[emailer.smtp] Sent `' + data.template + '` email to uid ' + data.uid);
		} else {
			winston.warn('[emailer.smtp] Unable to send `' + data.template + '` email to uid ' + data.uid + '!!');
			console.log(err);
		}
	});
}

Emailer.admin = {
	menu: function(custom_header, callback) {
		custom_header.plugins.push({
			"route": '/emailers/local',
			"icon": 'fa-envelope-o',
			"name": 'Emailer SMTP'
		});

		callback(null, custom_header);
	}
};
module.exports = Emailer;
