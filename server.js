const express = require("express");
const app = express();
const PORT = 8080;
const path = require("path");
const bodyParser = require("body-parser");

const redis = require("redis");
const redisClient = redis.createClient();


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("index");
})

app.get("/products", (req, res) => {
  res.render("products");
})

app.get("/favorites", (req, res) => {
  redisClient.smembers("favorites", function(err, skus){
    console.log(skus);
    redisClient.mget(skus, function(err, data){
      console.log(data);
      let parsedData = [];

      if(data){
        parsedData = data.reduce((acc, cur) => {
          let parsedItem = JSON.parse(cur);
          acc.push(parsedItem);
          return acc;
        }, [])
      }
      res.render("favorites", {parsedData});
    })
  })
})

app.post("/favorites/delete", (req, res) => {
  redisClient.del("favorites");
  res.json({status: "complete"});
})

app.post("/favorites", (req, res) => {
  sku = req.body.sku;
  productStr = JSON.stringify(req.body);
  redisClient.sadd("favorites", sku);
  console.log(req.body)
  redisClient.set(sku, productStr);
  res.json({status: "complete"});
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})