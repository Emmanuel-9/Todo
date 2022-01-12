var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));
mongoose.connect("mongodb://localhost:27017/todolistDB");

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

app.listen(3000, function() {
    console.log("listening on port 3000.")

});