var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment")

var data = [
    {
        name: "Clouds Rest",
        image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-									1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        description: "Invariably, and much to the detriment of diplomacy, have the major world powers recognized the merits and applied the principles of what Dr. Henry Kissinger often refers to as a “Westphalian concept of World Order.” Originating in the seventeenth century after the conclusion of the Thirty Years War—a malady which plagued the European people, bringing prolonged death, dogmatism, and uncertainty—the Westphalian method sought to end one common trend in the European political fabric: universalism. Its history being littered with hegemonic aspirations, both in religion and politics (The Universal Catholic Church in the former case and the Roman and the Holy Roman Empire in the latter) European statesmen sought to breathe multi-polarity into a region that had traditionally recognized the yoke of imperial dominion. Carving up the structure of existing polities, they created new powers such as Sweden and the Dutch Republic, each entity equally recognizing the sovereignty of the other, irrespective of size, population, or military power. "
    },

    {
        name: "Clouds Rest",
        image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-									1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        description: "Invariably, and much to the detriment of diplomacy, have the major world powers recognized the merits and applied the principles of what Dr. Henry Kissinger often refers to as a “Westphalian concept of World Order.” Originating in the seventeenth century after the conclusion of the Thirty Years War—a malady which plagued the European people, bringing prolonged death, dogmatism, and uncertainty—the Westphalian method sought to end one common trend in the European political fabric: universalism. Its history being littered with hegemonic aspirations, both in religion and politics (The Universal Catholic Church in the former case and the Roman and the Holy Roman Empire in the latter) European statesmen sought to breathe multi-polarity into a region that had traditionally recognized the yoke of imperial dominion. Carving up the structure of existing polities, they created new powers such as Sweden and the Dutch Republic, each entity equally recognizing the sovereignty of the other, irrespective of size, population, or military power. "
    },

    {
        name: "Clouds Rest",
        image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-									1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        description: "Invariably, and much to the detriment of diplomacy, have the major world powers recognized the merits and applied the principles of what Dr. Henry Kissinger often refers to as a “Westphalian concept of World Order.” Originating in the seventeenth century after the conclusion of the Thirty Years War—a malady which plagued the European people, bringing prolonged death, dogmatism, and uncertainty—the Westphalian method sought to end one common trend in the European political fabric: universalism. Its history being littered with hegemonic aspirations, both in religion and politics (The Universal Catholic Church in the former case and the Roman and the Holy Roman Empire in the latter) European statesmen sought to breathe multi-polarity into a region that had traditionally recognized the yoke of imperial dominion. Carving up the structure of existing polities, they created new powers such as Sweden and the Dutch Republic, each entity equally recognizing the sovereignty of the other, irrespective of size, population, or military power."
    }
]; 

function seedDB(){
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } 
    });
}
 /*       console.log("removed campgrounds");
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a campground");
                    Comment.create({
                        text: "this place is great",
                        author: "Homer"
                    }, function(err, comment){
                        if(err){
                            console.log(err); 
                        } else {
                        campground.comments.push(comment); 
                        campground.save(); 
                        console.log("created new comment")
                        }
                    }); 
                }
            });
        }); 
    });
} */

module.exports = seedDB;