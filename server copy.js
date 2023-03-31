const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.use("/public", express.static("public"));

app.get("/", function (req, res) {
  res.render("list.ejs");
});

app.listen(3000, () => {
  console.log("서버실행");
});

const { MongoClient } = require("mongodb");
const url =
  "mongodb+srv://gusdn02337:ruftla7410*@cluster0.cdp0kyq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

// const dbName = "project3";

// async function main() {
//   await client.connect();
//   console.log("서버실행");
//   const db = client.db(dbName);
//   const collection = db.collection("post");

//   console.log("이 영역에 코드 추가");

//   return "끝";
// }

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
