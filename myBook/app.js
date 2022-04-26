// 16

const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

// reading the JSON file
const books = JSON.parse(fs.readFileSync("./books.json", "utf-8"));
// console.log(books);

// MW
app.use((req, res, next) => {
    console.log("1. Hello from the MW");

    console.log("res: ", req);

    next();
    console.log("Will give error");
});                                               

console.log("2. After the MW");

// Defining Route Handler functions
const getAllBooks = (req, res) => {

    // console.log("3. In getAllBooks route \n==================================");
    /* 
        Read the json file, require fs
        parse it to string
        send json with length
    */
    res.status(200).json({
        status: "success",
        results: books.length,
        books
    });  
}
                       
const createBook = (req, res) => {
    // console.log(req.params.newBook); 
    console.log("4. In createBook route \n ******************** ");

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
    // console.log(books);

    fs.writeFile("./books.json", JSON.stringify(books), err => {
        res.status(201).json({
            status: "success",
            results: books.length,
            books
        });
    })
}
                                              
const updateBook = (req, res) => {
    console.log("5. In updateBook route \n -------------------------------- ");
    /*
        Get the value passed into the params 
        find that book in array, TR the whole array and save the foundBook into an var
        update the doc with the passed values
        write it into the file
        send the response 
    */
    const authorName = req.params.authorName;
    // console.log(authorName);

    let foundBook = "";
    books.map(book => {
        if (book.author === authorName) {
            foundBook = book;
        }
    });
    foundBook.author = req.body.author;             
    // console.log("foundBook: ", foundBook);
    books.push(foundBook);

    fs.writeFile("./books.json", JSON.stringify(books), err => {
        res.status(200).json({
            status: "success",
            results: books.length,
            books
        })
    })
}

const deleteBook = (req, res) => {
    console.log("6. In deleteBook route \n ####################################### ");
    
    const authorName = req.params.authorName;  
    console.log("Author name: " ,authorName);

    // TR the array, remove the book with the author name and save the new array into the JSON
    const filteredBooks = books.filter((book) => {
        // console.log(book);
        // console.log("book.authorName: ", book.authorName, " authorName: " + authorName );
        return book.author !== authorName
    });

    fs.writeFile("./books.json", JSON.stringify(filteredBooks), err => {
        res.status(200).json({
            results: filteredBooks.length,
            filteredBooks: filteredBooks
        })
    })

   
    // console.log(newBooks);
}

// // reading all books                                                                                                   
// app.get("/allBooks", getAllBooks);
// // creating a new book
// app.post("/allBooks", createBook);

// // updating a book
// app.patch("/allBooks/:authorName", updateBook);
// // Deleting a book
// app.delete("/allBooks/:authorName", deleteBook);

// Defining route for "/allBooks"
app
    .route("/allBooks")
    .get(getAllBooks)
    .post(createBook); 

// Route for "/allBooks/:authorName"
app     
    .route("/allBooks/:authorName")
    .patch(updateBook)
    .delete(deleteBook);



const port = 4000;
app.listen(port, () => {
    console.log(`myBook app is running on the port ${port}`);
})














































