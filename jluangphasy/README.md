# ![CF](http://i.imgur.com/7v5ASc8.png) Http Hello/Goodbye World Server

An http server that either responds with "hello world" or "goodbye world".

## Getting Started

1. Install [Node.js](https://nodejs.org/en/)
2. Run `git clone https://github.com/jluangphasy/http-hello-goodbye-world.git`
3. Run `git checkout jluangphasy`
4. Run `npm install`

Default port number is `8080`.

To run server: `node index.js`.

Routes:

  - `http://localhost:8080/hello`
  - `http://localhost:8080/hello?format=figlet`
  - `http://localhost:8080/hello?format=cowsay`
  - `http://localhost:8080/goodbye`
  - `http://localhost:8080/goodbye?format=figlet`
  - `http://localhost:8080/goodbye?format=cowsay`
  - `http://localhost:8080/form`
