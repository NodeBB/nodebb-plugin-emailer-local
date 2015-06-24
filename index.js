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

    Meta.settings.get('emailer-local', function(err, settings) {

        if (err) {
            return winston.error('[emailer.smtp] No settings: ' + err);
        }

        var username = settings['emailer:local:username'];
        var pass = settings['emailer:local:password'];
        var transportOptions = {
            host: settings['emailer:local:host'],
            port: settings['emailer:local:port']
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
            if ( !err ) {
                // winston.info('[emailer.smtp] Sent `' + data.template + '` email to uid ' + data.uid + ': ' + JSON.stringify(response));
            } else {
                winston.warn('[emailer.smtp] Unable to send `' + data.template + '` email to uid ' + data.uid + ': ' + JSON.stringify(response));
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
