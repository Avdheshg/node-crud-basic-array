
const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`./tours-simple.json`));
// console.log(JSON.parse(tours));

// READ
app.get("/", (req, res) => {
    /*
        Require fs
        Read the JSON file 
        parse it
        send it to HOME
    */

    res.status(200).json({
        status: "success",
        results: tours.length,
        tours
    })

});

// CREATE
app.post("/", (req, res) => {
    /*
        creating a new tour from the req params
            implement the MW to read the req.body
            read the data from the req obj
                build the id
                    get the index of the last element of the tour.json
                    increment the id by 1
                create new object with it
            save it to the tours
            save tours into the json file
                use writeFile
    */
    const newID = tours[tours.length-1].id + 1;
    console.log("new id: " + newID);

    // const newObj = {
    //     id: newID,
    //     name: req.body.name,
    //     duration: req.body.duration
    // }
    // Better alternative as it removes the thinking about what the data will be sent to us. Here "assign" will take all the data and add our date to create a new object
    const newObj = Object.assign({id: newID}, req.body);

    console.log(newObj); 

    tours.push(newObj);
    
    fs.writeFile(`./tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: "success",
            newTour: newObj
        });
    })
    
    console.log(tours);
})

app.patch("/:id", (req, res) => {
    /*
        Get the object by finding into the tour
        update it 
        write back into the file

    */
   const id = req.params.id*1;
   console.log(typeof id);

   const foundTour = tours.find(tour => tour.id === id);
   console.log("found tour: ", foundTour);

   foundTour.duration = req.body.duration;

   tours.map(tour => {
      if (foundTour === tour) {
        //   console.log("updated");

          return foundTour;
      }
   })

   fs.writeFile(`./tours-simple.json`, JSON.stringify(tours), err => {
        res.status(200).json({
            status: "success",
            tours
        })
   });

});

app.delete("/tours/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);

    // const index = tours[id];
    // console.log("index: ", index);

    tours.splice(id, 1);
    console.log(tours);

    fs.writeFile('./tours-simple.json', JSON.stringify(tours), err => {
        res.status(200).json({
            status: "success",
            result: tours.length,
            tours
        }); 
    });
});




const port = 4000;
app.listen(port, () => {
    console.log(`App is running on the port ${port}`);
})








































