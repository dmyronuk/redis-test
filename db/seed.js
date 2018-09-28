const redis = require("redis");
const redisClient = redis.createClient();
const redisMulti = redisClient.multi();

const seedDatabse = (dataset, multi) => {
  dataset.forEach(elem => {
    const productKey = "product:" + elem.sku;

    multi.hmset(productKey, [
      "sku", elem.sku,
      "name", elem.name,
      "price", elem.price,
      "imgURL", elem.imgURL,
    ]);

    multi.sadd("products:keyset", productKey);
  })

  multi.exec((err, results) => {
    if(err){
      console.log(err);
    }else{
      console.log("success");
    }
  });
}

products = [
  {
    sku: 1,
    name: "Glue",
    price: 5.99,
    imgURL: "images/glue.jpeg",
  },
  {
    sku: 2,
    name: "Pencils",
    price: 1.99,
    imgURL: "images/pencils.jpg",
  },
  {
    sku: 3,
    name: "Notebook",
    price: 4.99,
    imgURL: "images/notebook.png",
  },
  {
    sku: 4,
    name: "Brushes",
    price: 11.99,
    imgURL: "images/brushes.jpg",
  },
  {
    sku: 5,
    name: "Crayons",
    price: 4.99,
    imgURL: "images/crayons.jpeg",
  },
  {
    sku: 6,
    name: "Paper",
    price: 2.99,
    imgURL: "images/construction_paper.jpeg",
  },
  {
    sku: 7,
    name: "Desk",
    price: 149.99,
    imgURL: "images/desk.jpg",
  },
  {
    sku: 8,
    name: "Ruler",
    price: 3.99,
    imgURL: "images/ruler.jpg"
  },
]

seedDatabse(products, redisMulti);
redisClient.quit();