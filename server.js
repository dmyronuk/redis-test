const express = require("express");
const app = express();
const PORT = 8080;
const path = require("path");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

const redis = require("redis");
const redisClient = redis.createClient();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cookieSession({
  name: "session",
  keys: ["secretkey"],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/login", (req, res) => {
  req.session.username = req.body.username;
  res.redirect("/products");
});

app.get("/products", (req, res) => {
  const multi = redisClient.multi();

  //get user favorites
  const userFavoritesKey = req.session.username + ":favorites";
  redisClient.smembers(userFavoritesKey, (err, favorites) => {
    if(err){
      console.log(err);
    }

    data = { favorites };

    //get product data
    redisClient.smembers("products:keyset", function(err, productKeys){
      productKeys.forEach( key => {
        multi.hgetall(key);
      });

      multi.exec((err, results) => {
        if(err){
          console.log(err);
          res.redirect("/")
        }else{
          data.products = results;
          res.render("products", data);
        }
      });
    });
  });
});

app.get("/favorites", (req, res) => {
  const multi = redisClient.multi();
  const favoritesKey = req.session.username + ":favorites";

  redisClient.smembers(favoritesKey, function(err, productKeys){
    productKeys.forEach( key => {
      multi.hgetall(key);
    });

    multi.exec((err, results) => {
      if(err){
        console.log(err);
      }else{
        res.render("favorites", { data: results });
      }
    });
  });
});

app.post("/favorites/delete", (req, res) => {
  const userFavoritesKey = req.session.username + ":favorites";
  redisClient.del(userFavoritesKey);
  res.json({status: "complete"});
});

app.post("/favorites", (req, res) => {
  const productKey = "product:" + req.body.sku;
  const userFavoritesKey = req.session.username + ":favorites";

  redisClient.sadd(userFavoritesKey, productKey, (err, result) => {
    if(err){
      console.log(err);
    }
    res.json({status: "complete"});
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});