var fs = require('fs'),
    path = require('path'),

    winston = module.parent.require('winston'),
    Meta = module.parent.require('./meta'),

    nodemailer = require('nodemailer'),
    Emailer = {};


Emailer.init = function(data, callback) {
    function renderAdminPage(req, res, next) {
        res.render('admin/emailers/local', {});
    }

    data.router.get('/admin/emailers/local', data.middleware.admin.buildHeader, renderAdminPage);
    data.router.get('/api/admin/emailers/local', renderAdminPage);

    callback();
};

Emailer.send = function(data) {
	Meta.settings.get('emailer-local', function(err, options){
		var username = options['emailer:local:username'];
		var pass = options['emailer:local:password'];
		var transportOptions = {
			host: options['emailer:local:host'],
			port: options['emailer:local:port'],
			secureConnection: (options['emailer:local:secure'] === 'on')
		};
		if( username || pass ) {
			transportOptions.auth = {
				user: username,
				pass: pass
			};
		}
		var transport = nodemailer.createTransport('SMTP', transportOptions);
		transport.sendMail({
			from: data.from,
			to: data.to,
			html: data.html,
			text: data.plaintext,
			subject: data.subject
		},function(err,response) {
			console.log(err);
			if ( !err ) {
				winston.info('[emailer.smtp] Sent `' + data.template + '` email to uid ' + data.uid);
			} else {
				winston.warn('[emailer.smtp] Unable to send `' + data.template + '` email to uid ' + data.uid + '!!');
				// winston.error('[emailer.smtp] ' + response.message);
			}
		});
	});

}

Emailer.admin = {
    menu: function(custom_header, callback) {
        custom_header.plugins.push({
            "route": '/emailers/local',
            "icon": 'fa-envelope-o',
            "name": 'Emailer (Local)'
        });

        callback(null, custom_header);
    }
};

module.exports = Emailer;
