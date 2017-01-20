pygmy - A Chinese Language Tool Front End
---------------------

pygmy is the front end of a Chinese language tool. It relies on [pygmy-api][7f4ae64e], the backend API.

  [7f4ae64e]: https://github.com/jiaola/pygmy-api "pygmy-api"

Currently it's deployed at http://pygmy.brickowls.com

## Development

### Setup

Get code from github
```
git clone git@github.com:jiaola/pygmy.git
```

Install packages

```
npm install
```

Now it's ready to be run on the local machine. Make sure port 4040 is free, then run

```
npm run start:development
```

To really use it, you'll need to setup [pygmy-api][7f4ae64e] and have it run locally too.


## Deployment

### First time setup

Set up apache to point to `/path/to/pygmy/dist`. Repeat `git clone` and `npm install` commands in Development Setup.  Run

```
npm run bulid:webpack
```

On brickowls.com, pygmy is in `/opt/brickowls/pygmy`

### To update with new commits,

SSH to the server `brickowls.com`, then run

```
cd /opt/brickowls/pygmy
git pull
npm run build:webpack
```

The settings will be shown on http://pygmy.brickowls.com
