# ![CF](http://i.imgur.com/7v5ASc8.png) Http Hello/Goodbye World Server

An http server that either responds with "hello world" or "goodbye world".

## Getting Started

1. Install [Node.js](https://nodejs.org/en/)
2. Run `git clone https://github.com/jluangphasy/http-hello-goodbye-world.git`
3. Run `git checkout jluangphasy`
4. Run `npm install`

Default port number is `4000`. If you want to use a different port, replace `[port]` with whatever port you want.

To run server: `node index.js` or `node index.js [port]`.

In your browser, visit `http://localhost:[port]/hello` or `http://localhost:[port]/goodbye`.

Examples of optional parameters:

  - `http://localhost:[port]/hello?format=figlet`
  - `http://localhost:[port]/hello?format=cowsay`
  - `http://localhost:[port]/goodbye?format=figlet`
  - `http://localhost:[port]/goodbye?format=cowsay`
