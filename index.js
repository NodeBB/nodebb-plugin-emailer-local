'use strict';

var winston = module.parent.require('winston'),
    Meta = module.parent.require('./meta'),

    nodemailer = require('nodemailer'),
    Emailer = {};


var settings = {};

Emailer.init = function(data, callback) {
    function renderAdminPage(req, res) {
        res.render('admin/emailers/local', {});
    }

    data.router.get('/admin/emailers/local', data.middleware.admin.buildHeader, renderAdminPage);
    data.router.get('/api/admin/emailers/local', renderAdminPage);

    Meta.settings.get('emailer-local', function(err, _settings) {
        if (err) {
            return winston.error(err);
        }
        settings = _settings;
    });

    callback();
};

Emailer.send = function(data, callback) {

    var username = settings['username'];
    var pass = settings['password'];

    var isSecure = true;
    var requireTls = true;
    var ignoreTls = false;

    switch(settings['security']) {
        case 'NONE':
            isSecure = false;
            requireTls = false;
            ignoreTls = true;
            break;
        case 'STARTTLS':
            isSecure = false;
            requireTls = true;
            ignoreTls = false;
            break;
        default:
        case 'ENCRYPTED':
            isSecure = true;
            requireTls = true;
            ignoreTls = false;
            break;
    }

    var transportOptions = {
        host: settings['host'],
        port: parseInt(settings['port'], 10),
        secure: isSecure,
        ignoreTLS: ignoreTls,
        requireTLS: requireTls
    };

    if( username || pass ) {
        // transportOptions.authMethod = 'LOGIN';
        transportOptions.auth = {
            user: username,
            pass: pass
        };
    }
    var transport = nodemailer.createTransport(transportOptions);

    transport.sendMail({
        from: data.from,
        to: data.to,
        html: data.html,
        text: data.plaintext,
        subject: data.subject
    },function(err) {
        if ( !err ) {
            winston.info('[emailer.smtp] Sent `' + data.template + '` email to uid ' + data.uid);
        } else {
            winston.warn('[emailer.smtp] Unable to send `' + data.template + '` email to uid ' + data.uid + '!!');
          }
        callback(err, data);
    });
};

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
