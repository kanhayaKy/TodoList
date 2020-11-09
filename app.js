const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash');

const app = express();

// App setup
app.set("view engine" , "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

// Database setup
var URL = "mongodb://localhost:27017/todolistDb";
mongoose.connect(URL ,{ useNewUrlParser: true });

// Database schema
const itemSchema = {
    name : {
        type:String,
        require:[1]
    }
}

const customListSchema = {
    name : {
        type:String,
        require:[1]
    },
    items:[itemSchema]
}

// Database model
const Item = mongoose.model("Item" , itemSchema);
const List = mongoose.model("List", customListSchema);


app.get('/', function(req , res){

   
    Item.find({}, function(err, items){
        if(err)
            console.log(err);
        else{
            res.render('index', {title: 'Today' , list : items});
        }
    });

})

app.post('/', function(req , res){
    const task = req.body.newItem;
    const list = req.body.list;
    const newitem = new Item({name:task});

    if(list == 'Today'){
        newitem.save();
        res.redirect('/');
    }else{
        List.findOne({name:list}, function(err , result){
            if(!err){
                result.items.push(newitem);
                result.save();
                res.redirect(`/${list}`);
            }
        });
    }

})

app.post('/delete', function(req,res){
    item = req.body.checkbox;
    list = req.body.list;

    if(list=='Today'){
        Item.findByIdAndRemove(item , function(err){
            if(!err){
                res.redirect('/')
            }
        });
    }else{
        List.findOneAndUpdate({name:list}, {$pull:{items:{_id:item}}}, function(err){
            if(!err){
                res.redirect(`/${list}`);
            }
        })
    }

});

app.get('/:listName', function(req, res){
    listname = _.capitalize(req.params.listName);
    List.findOne({name:listname }, function(err, list){
        if(!err){
            if(list){

                res.render('index', {title: list.name , list : list.items});
            }
            else{
                newList = new List({
                    name:listname,
                    items:[]
                })
                newList.save()
                res.redirect(`/${listname}`)
            }
        }
    });

});



let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


app.listen(port, function(){
    console.log("Server has started at local host 3000");
})
