![CF](http://i.imgur.com/7v5ASc8.png) Http Hello/Goodbye World Server
===
### Usage: 
Request resources by adding a path in the URL bar.

- /hello
- /goodbye
- /godzilla
- /form

Access the secret Godzilla page by entering the path */godzilla* along writing a query string:
```godzilla = gojira```

The HTTP server will respond with unique HTML pages on listed paths above and will response with a 404 page when the path or resourse cannot be found.

On the */form* page, submitting text in the input text box with make a POST request to the server and then write the data to a server file, posts.txt.

---
* Lab instructions are [here](LAB.md)

* Lab Part 2 instructions are [here](LAB-Part2.md)
