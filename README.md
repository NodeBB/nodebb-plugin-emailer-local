nodebb-plugin-emailer-local
===========================

NodeBB plugin for sending emails via SMTP services<br>
Support SSL connection - special for yandex smtp.

Installation
---

* First install the package from the NPM repository

``` bash
cd /nodebb/install/path
npm install git://github.com/Luchnik22/nodebb-plugin-emailer-local
```

* Then enable the plugin in NodeBB's Admin Control Panel in the Plugins tab.
* Restart NodeBB

Configuration
---

* Open NodeBB's Admin Control Panel
* Click on the Emailer (SMTP) item in the Plugins section
* Set hostname, port, user name and password fields and use SSL
* Click on Settings and set the desired address to use on the Email tab.

Credits
---

**Original Author**: [AlfredDobradi](https://github.com/AlfredDobradi)

The NodeBB team is currently taking care of maintenance upgrades for this plugin (compatibility between versions). If anybody wishes to become the core maintainer of this plugin and add new features, please give us a shout on this plugin's [thread](https://community.nodebb.org/topic/496/-nodebb-plugin-emailer-local-local-email-plugin) on our community. :)
