<p align="center">
  <img src="https://github.com/Clarent/Clarent/blob/main/Images/ClarentLogo.webp?raw=true" width="623" height="278" alt="Clarent" />
</p>

<h3 align="center">Clarent is a browser-based platform to play Grand Archive. This is an unofficial project not linked to or endorsed by Weebs of the Shore.</h3>

[![license](https://flat.badgen.net/github/license/clarent/clarent)](./LICENSE)
[![discord](https://flat.badgen.net/discord/online-members/JykuRkdd5S?icon=discord)](https://discord.gg/JykuRkdd5S)
[![patreon](https://flat.badgen.net/badge/become/a%20patreon/F96854?icon=patreon)](https://www.patreon.com/clarent)
[![twitter](https://flat.badgen.net/twitter/follow/clarent_online?icon=twitter)](https://twitter.com/clarent_online/)
[![github](https://flat.badgen.net/github/last-commit/Clarent/Clarent-FE?icon=github)](https://github.com/Clarent/Clarent-FE/)

Visit [Clarent.net](https://clarent.net/) to get playing Grand Archive in your browser right now!

# Getting started with Clarent-FE

This is the front end client for clarent.net - completely separate from the back end.

## Project

This is a [Vite](https://vitejs.dev/) single page [React](https://reactjs.org/) App using [Redux](https://redux.js.org/), [Redux Toolkit](https://redux-toolkit.js.org/), and [React Redux](https://react-redux.js.org/) bindings.

## Requirements / How to install:

### Prerequesites:

- [Volta](https://volta.sh/) or FNM to manage node installs.
- node.js (currently 16.19.0), which would be managed automagically by Volta for you.
- git
- basic knowledge of the command line / terminal
  - If you're on Windows, get Windows Powershell or wsl or something.

```
git clone https://github.com/Clarent/Clarent-FE
```

```
cd Clarent-FE
```

```
npm install
```

```
npm run dev
```

Access the server at http://localhost:5173/ (Port 5173 by default, if you configure it to something else in Vite then it'll be there instead).

You will also need the local dev clarent backend running.

If you have problems running the development server, come to the discord and ask for help.

### Important!

If you run into any trouble setting up the project please let LaustinSpayce know so we can fix it, and help make it a smoother process for future contributors.

If you have any configuration that isn't the default for the backend, change the hostname, ports etc in the .env file. You can also twiddle with the .env if you want to develop the FE locally but hook up into the production backend (then you'll want to point to api.clarent.net)

## Optional happy fun things:

Configure Prettier / ES Lint in your text editor of choice.

## How it's organised:

Short answer is it isn't really. If you have a better idea on how to organise the files, please let me know.

Otherwise try to keep everything as small as possible, Reacty-containers. And pulling data from Redux etc. CSS modules help to keep stuff locally scoped.

## The plan for later:

Accomplished so far:

- ✅ automatic deployment to CDN
- ✅ automatic testing for all MR and commits to main

Still need help with:

- More testing coverage
- Building out features and helping with BE bugs etc.

## Learn More

This project was originally bootstrapped with [Create React App](https://github.com/facebook/create-react-app), and is now using Vite.

To learn React, check out the [React documentation](https://reactjs.org/).

There is some redux stuff involved here too so check the [React Redux documentation too.](https://react-redux.js.org/)

## Disclaimer

All artwork and card images © Weebs of the Shore.

Clarent.net is in no way affiliated with Weebs of the Shore. Weebs of the Shore®, Grand Archive™, and set names are trademarks of Weebs of the Shore. Grand Archive characters, cards, logos, and art are property of [Weebs of the Shore](https://legendstory.com/).
