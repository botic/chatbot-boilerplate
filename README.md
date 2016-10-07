# chatbot-boilerplate

A simple boilerplate to develop chatbots with RingoJS. It requires
at least RingoJS 1.0 RC1.

## Getting started

1. get RingoJS running, see [RingoJS.org](http://ringojs.org/get_started/)
1. install Ringo's package manager with `ringo-admin install grob/rp`
1. run `ringo-admin install grob/httpserver`
1. get all dependencies with `rp install`
1. update the config in `config/index.js` with your tokens and keys
1. start the bot with `ringo main.js`

## Dependencies

This boilerplate uses an experimental HTTP server by @grob. You have
to install it manually with `ringo-admin install grob/httpserver`.
All other dependencies can be installed with `rp install` and are
part of the `package.json` descriptor.

## License

This package is licensed under the Apache License Version 2.0.
You can copy, modify and distribute the bot client in source and/or
binary form. Please mark all modifications clearly as being
the work of the modifier.
