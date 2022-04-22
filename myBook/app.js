

const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

// reading the JSON file
const books = JSON.parse(fs.readFileSync("./books.json", "utf-8"));
// console.log(books);

// reading all books
app.get("/allBooks", (req, res) => {
    /*
        Read the json file, require fs
        parse it to string
        send json with length
    */
    res.status(200).json({
        status: "success",
        results: books.length,
        books
    })
    
});

// creating a new book
app.post("/allBooks", (req, res) => {
    console.log(req.params.newBook);

    /*
    Algo;
        Use the MW
        Define a new object passed in body
        push it to the array
        write it to the JSON file (stringify)
        send the response
    */

    const newBook = req.body;
    books.push(newBook);
    console.log(books);

    fs.writeFile("./books.json", JSON.stringify(books), err => {
        res.status(201).json({
            status: "success",
            results: books.length,
            books
        });
    })
});

// updating a book
app.patch("/allBooks/:authorName", (req, res) => {
    /*
        Get the value passed into the params 
        find that book in array, TR the whole array and save the foundBook into an var
        update the doc with the passed values
        write it into the file
        send the response 
    */
    const authorName = req.params.authorName;
    console.log(authorName);

    let foundBook = "";
    books.map(book => {
        if (book.author === authorName) {
            foundBook = book;
        }
    });
    foundBook.author = req.body.author;
    console.log("foundBook: ", foundBook);
    books.push(foundBook);

    fs.writeFile("./books.json", JSON.stringify(books), err => {
        res.status(200).json({
            status: "success",
            results: books.length,
            books
        })
    })
});

app.delete("/allBooks/:authorName", (req, res) => {

    
})




const port = 4000;
app.listen(port, () => {
    console.log(`myBook app is running on the port ${port}`);
})














































