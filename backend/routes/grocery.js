const express = require('express');
const router = express.Router();
const GroceryModel = require("../models/grocery");

/**
 * Creation of grocery items using POST method
 */
router.post('/add', function(req,res){
    console.log(req.body);
    const groceryItem = new GroceryModel(req.body);
    groceryItem.save(function(err){
        if(err){
            console.log("err", err);
            res.status(400).send({
                message: 'this is an error',
            })
        } else {
            res.send("Grocery item added");
        }
    })
    
})
/**
 * API to list all items
 */
router.get("/getAll", function(req,res){
    GroceryModel.find({},{__v: 0},function(err,data){
        if(err){
            console.log("err", err);
            res.status(400).send({
                message: 'this is an error',
            })
        } else {
            res.send({results: data});
        }
    })
})

/**
 * Updating item status
 */
router.put("/updatePurchaseStatus", function(req,res){
    GroceryModel.findOneAndUpdate({
        '_id': req.body._id
    },{
        'isPurchased': true
    }, function(err){
        if(err){
            console.log("err", err);
            res.status(400).send({
                message: 'this is an error',
            })
        } else {
            res.send("purchase status updated")
        }
    }
    );
});

/**
 * Deleting grocery item
 */
router.delete("/deleteGroceryItem", function(req,res){
    const groceryItemId = req.body._id;
    GroceryModel.remove({_id: groceryItemId}, function(err){
        if(err){
            console.log("err", err);
            res.status(400).send({
                message: 'this is an error',
            })
        } else {
            res.send({"result": "Grocery Item removed successfully"});
        }
    })
})
module.exports = router;