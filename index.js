var fs = require('fs'),
    path = require('path'),

    winston = module.parent.require('winston'),
    settings = module.parent.require('./settings'),
    socketAdmin = module.parent.require('./socket.io/admin'),
    
    nodemailer = require('nodemailer'),
    appSettings = new Settings('smpt-server'),
    Emailer = {};

var SocketAdmin = module.parent.require('./socket.io/admin');
SocketAdmin.settings.smptserver = function() {
    appSettings.sync();
};

Emailer.init = function(app, middleware, controllers, callback) {
    function renderAdminPage(req, res, next) {
        res.render('admin/emailers/local', {});
    }

    app.get('/admin/emailers/local', middleware.admin.buildHeader, renderAdminPage);
    app.get('/api/admin/emailers/local', renderAdminPage);

    callback();
};

Emailer.send = function(data) {
    var username = appSettings.get('username');
    var pass = appSettings.get('password');
    var transportOptions = {
        host: appSettings.get('host'),
        port: appSettings.get('port'),
    };
    if (appSettings.get('ssl') == 'on')
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
            "name": 'EmailerSMPT'
        });

        callback(null, custom_header);
    }
};
//module.exports = Emailer;
