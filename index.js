const http = require("http");
const fs = require("fs");
const url = require("url");

const html = fs.readFileSync("./Template/index.html", "utf-8");
const products = JSON.parse(fs.readFileSync("./Data/product.json", "utf-8"));
const productsList = fs.readFileSync("./Template/product-list.html", "utf-8");

let productHtmlArray = products.map((product) => {
  let output = productsList.replace("{{%IMAGE%}}", product.productImage);
  output = output.replace("{{%NAME%}}", product.name);
  output = output.replace("{{%MODELNAME%}}", product.modeName);
  output = output.replace("{{%MODELNUMBER%}}", product.modelNumber);
  output = output.replace("{{%SIZE%}}", product.size);
  output = output.replace("{{%CAMARA%}}", product.camara);
  output = output.replace("{{%PRICE%}}", product.price);
  output = output.replace("{{%COLOR%}}", product.color);
  return output;
});

http
  .createServer((req, res) => {
    let s = url.parse(req.url, true);
    console.log(s);
    let path = req.url;
    if (path === "/" || path.toLocaleLowerCase() === "/home") {
      res.writeHead(200, {
        "content-type": "text/html",
        "my-header": "home page",
      });
      res.end(html.replace("{{%CONTENT%}}", "You are in Home page"));
    } else if (path.toLocaleLowerCase() === "/products") {
      let productResponseHtml = productHtmlArray;
      res.writeHead(200, {
        "content-type": "text/html",
        "my-header": "home page",
      });
      res.end(html.replace("{{%CONTENT%}}", productResponseHtml));
    } else if (path.toLocaleLowerCase() === "/about") {
      res.writeHead(200, {
        "content-type": "text/html",
        "my-header": "home about",
      });
      res.end(html.replace("{{%CONTENT%}}", "welcome  to about"));
    } else if (path.toLocaleLowerCase() === "/contact") {
      res.writeHead(200, {
        "content-type": "text/html",
        "my-header": "home contact",
      });
      res.end(html.replace("{{%CONTENT%}}", "welcome  to Contact"));
    } else {
      res.writeHead(404, {
        "content-type": "text/html",
        "my-header": "Error page",
      });
      res.end(
        html.replace("{{%CONTENT%}}", "error :404  \n page is not avilable")
      );
    }
  })
  .listen(8000, "127.0.0.1", () => {
    console.log("connectd sucess fully");
  });
