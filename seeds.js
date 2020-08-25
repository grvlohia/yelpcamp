var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
    {
        name: "Cloud's Rest",
        image: "https://q9m3bv0lkc15twiiq99aa1cy-wpengine.netdna-ssl.com/wp-content/uploads/2019/07/TENT.jpeg",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure vero vel perferendis, sint voluptatibus, quibusdam facere voluptatem voluptas, aliquid reiciendis quod nisi. Culpa sit magnam cupiditate excepturi quibusdam, nesciunt animi totam exercitationem ipsa non ullam molestiae qui sed iure rerum dolores dolor voluptate aspernatur voluptatem provident impedit ipsam repellendus consequatur. Facere, quisquam excepturi! Nisi itaque, laboriosam voluptas dolor ducimus odio quia error. Maiores quo quod quia aspernatur repudiandae, itaque quasi temporibus? Illo libero non odit quo perferendis! Ullam laudantium nesciunt assumenda tempora, repellendus illo ea, minima aut harum rem nulla qui porro? Tenetur at debitis eveniet saepe repudiandae inventore aliquid."
    },
    {
        name: "Lost Angle's Ground",
        image: "https://laistassets.scprdev.org/i/0a1539c659eb373083bdd95e6a619291/5ec9707ba758ab0008b1c2ae-eight.jpg",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure vero vel perferendis, sint voluptatibus, quibusdam facere voluptatem voluptas, aliquid reiciendis quod nisi. Culpa sit magnam cupiditate excepturi quibusdam, nesciunt animi totam exercitationem ipsa non ullam molestiae qui sed iure rerum dolores dolor voluptate aspernatur voluptatem provident impedit ipsam repellendus consequatur. Facere, quisquam excepturi! Nisi itaque, laboriosam voluptas dolor ducimus odio quia error. Maiores quo quod quia aspernatur repudiandae, itaque quasi temporibus? Illo libero non odit quo perferendis! Ullam laudantium nesciunt assumenda tempora, repellendus illo ea, minima aut harum rem nulla qui porro? Tenetur at debitis eveniet saepe repudiandae inventore aliquid."
    },
    {
        name: "God's Meadow",
        image: "https://www.discoverlosangeles.com/sites/default/files/styles/hero/public/images/2019-04/Table%20Mountain%20Campground%20tents.jpg?itok=aW2w0ktq",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure vero vel perferendis, sint voluptatibus, quibusdam facere voluptatem voluptas, aliquid reiciendis quod nisi. Culpa sit magnam cupiditate excepturi quibusdam, nesciunt animi totam exercitationem ipsa non ullam molestiae qui sed iure rerum dolores dolor voluptate aspernatur voluptatem provident impedit ipsam repellendus consequatur. Facere, quisquam excepturi! Nisi itaque, laboriosam voluptas dolor ducimus odio quia error. Maiores quo quod quia aspernatur repudiandae, itaque quasi temporibus? Illo libero non odit quo perferendis! Ullam laudantium nesciunt assumenda tempora, repellendus illo ea, minima aut harum rem nulla qui porro? Tenetur at debitis eveniet saepe repudiandae inventore aliquid."
    }
]

function seedDB() {
    Campground.remove({}, (err) => {
        if (err) {
            console.log(err);
        }
        console.log("Removed campgrounds");
        //remove existing comments
        Comment.remove({}, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Removed all comments");
                // add a few campgrounds
                data.forEach((seed) => {
                    Campground.create(seed, (err, campground) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("added a campground");
                            // create a comment for every campground
                            Comment.create({
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, (err, comment) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            });
                        }
                    });
                });
            }
        });
    });
}

module.exports = seedDB;