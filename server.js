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
}))

const getProductData = async (productKey) => {
  return redisClient.hgetall(cur);
}

app.get("/", (req, res) => {
  res.render("index");
})

app.post("/login", (req, res) => {
  req.session.username = req.body.username;
  res.redirect("/products");
})

app.get("/products", (req, res) => {
  res.render("products");
})

app.get("/favorites", (req, res) => {
  const multi = redisClient.multi();
  const favoritesKey = req.session.username + ":favorites";

  redisClient.smembers(favoritesKey, function(err, productKeys){
    productKeys.forEach( key => {
      multi.hgetall(key);
    })

    multi.exec((err, results) => {
      if(err){
        throw err;
      }else{
        res.render("favorites", { data: results });
      }
    })
  })
})

app.post("/favorites/delete", (req, res) => {
  const userFavoritesKey = req.session.username + ":favorites";
  redisClient.del(userFavoritesKey);
  res.json({status: "complete"});
})

app.post("/favorites", (req, res) => {
  const sku = req.body.sku;
  const productStr = JSON.stringify(req.body);
  const productKey = "product:" + sku;
  const userFavoritesKey = req.session.username + ":favorites";

  redisClient.sadd(userFavoritesKey, productKey);

  redisClient.hmset(productKey, [
    "name", req.body.name,
    "price", req.body.price,
    "imgURL", req.body.imgURL
  ], function(err, data){
    if(err){
      console.log("Error: ", err);
    }
    res.json({status: "complete"});
  });
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})