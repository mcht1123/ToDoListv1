const express = require("express");
const app = express();

const items = ["Wake Up"];
const workItems = [];
app.use(express.urlencoded())
app.use(express.static("public"))
app.set('view engine', "ejs");

app.get("/",function(req,res){
    let today = new Date();
    let options = {
        weekday: 'long',
        day: "numeric",
        month: "long"
    }

    let day = today.toLocaleDateString("en-US",options);


    res.render('list',{kindOfDay: day, newListItem: items})
})

app.get("/work", function(req,res){
    res.render("list",{kindOfDay: "Work List", newListItem: workItems});
})

app.post("/work",function(req,res){
    let item = req.body.newItem
    workItems.push(item);
    res.redirect("/work");
})

app.post("/",function(req,res){
    let item = req.body.newItem;

    if (req.body.list === "Work List"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
    
    
})

app.get("/about",function(req,res){
    res.render("about")
})

app.listen(3000);