nodebb-plugin-emailer-local
===========================

NodeBB plugin for sending emails via SMTP services<br>
Support SSL connection

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
* Set hostname, port, SSL, user name, from and password fields
* Click on Settings and set the desired address to use on the Email tab.

Example configuration for Yandex SMTP
---
* Adress: smtp.yandex.ru
* Port: 465
* User: example@example.com
* Password: *******
* From address: Example Example <example@example.com>
* Use SSL: On

Credits
---

**Original author**: [Alfred Dobradi](https://github.com/AlfredDobradi)<br>
**Last version author**: [Loutchansky Oleg](https://github.com/Luchnik22/)
