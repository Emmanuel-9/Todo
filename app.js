var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());



const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://user:root@cluster0.ocuw0.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

MongoClient.connect(uri, {
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
  })

const itemSchema = {
    name: String,
}

const Item = mongoose.model("Item", itemSchema);
const item1 = new Item({ name: "Welcome to Programming "});
const item2 = new Item({ name: "Continuously improve the user experience "});
const item3 = new Item({ name: "Frequently check for bugs "});

const d = [item1, item2, item3];
Item.insertMany(d, function (err) {
    if(err) {
        console.log(err);
    }else{ 
        console.log("Successfully saved items")
    }
});


app.get("/", function(req, res) {
    Item.find({}, function(err, f) {
        if(f.length === 0) {
            Item.insertMany(d, function (err) {
                if(err) {
                    console.log(err);
                }else{ 
                    console.log("Successfully saved items")
                }
            });
            res.redirect('/');
        } else {
            res.render("list",{ newListItem: f});

        }
        
    }); 
});
app.post("/", function(req, res) {
    i = req.body.n;
    const item = new Item({
        name: i,
    });
    item.save();
    res.redirect("/");
});

app.post("/delete", function(req, res) {
    Item.findByIdAndRemove(req.body.checkbox, function(err) {
        if(!err){
            console.log("Successfully deleted");
            res.redirect("/");
        }

    });
});

app.put("/", function(req, res)  {
    
    ItemCollection.findOneAndUpdate(
        { name: 'Welcome to Programming' },{ $set: {name: req.body.name}},{upsert: true}
    ).then(result => {
        res.json('Success');
        res.redirect('/');
       })
      .catch(error => console.error(error))
  
})










app.listen(3000, function() {
    console.log("listening on port 3000.")

});