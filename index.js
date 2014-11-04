var fs = require('fs'),
    path = require('path'),

    winston = module.parent.require('winston'),
    Meta = module.parent.require('./meta'),

    nodemailer = require('nodemailer'),
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
    var username = Meta.config['emailer:local:username'];
    var pass = Meta.config['emailer:local:password'];
    var transportOptions = {
        host: Meta.config['emailer:local:host'],
        port: Meta.config['emailer:local:port'],
    };
    if (Meta.config['emailer:local:ssl'] == 'true')
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

    transport.sendMail({
        from: data.from,
        to: data.to,
        html: data.html,
        text: data.plaintext,
        subject: data.subject
    },function(err,response) {
        if ( !err ) {
            winston.info('[emailer.smtp] Sent `' + data.template + '` email to uid ' + data.uid);
        } else {
            winston.warn('[emailer.smtp] Unable to send `' + data.template + '` email to uid ' + data.uid + '!!');
            // winston.error('[emailer.smtp] ' + response.message);
        }
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
