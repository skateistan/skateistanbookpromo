# skateistan.org/book

A small site to promote Skateistan's [book](http://skateistan.org/book/).

## Contributing

```
git clone git@github.com:skateistan/skateistanbookpromo.git
```

After you've done your work and committed locally, you should do:

```
git push origin master
```

This will invoke a service hook which is set up to hit `http://skateistan.org/book/deploy.php` when the GitHub repo receives a push.

The app runs from `/usr/local/book` on skateistan.org, which is a git repository and has a remote named `origin` which points to the GitHub repository (`git@github.com:skateistan/skateistanbookpromo.git`).

There is an ssh key pair for the `www-data` user in `/var/www/.ssh/` which is added as a GitHub deploy key and therefore has access to fetch from the GitHub repository:

```
$ sudo ls -la /var/www/.ssh/
-rw------- 1 www-data www-data 1675 2013-01-03 19:18 id_rsa
-rw-r--r-- 1 www-data www-data  399 2013-01-03 19:18 id_rsa.pub
```

When GitHub's POST request hits [deploy.php](https://github.com/skateistan/skateistanbookpromo/blob/master/deploy.php), the deploy script looks after the deployment of the latest changes pushed to GitHub.

If you look at the apache access log files, by doing `tail -f /var/log/apache2/access.log`, you should see an entry like this when the service hook is invoked:

```
50.57.231.61 - - [15/Jan/2013:18:18:24 +0430] "POST /book/deploy.php HTTP/1.1" 200 211 "-" "GitHub Services Web Hook"
```
