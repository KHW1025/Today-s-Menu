const express = require("express");
const app = express();

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use("/public", express.static("public"));

const { MongoClient } = require("mongodb");
const url =
  "mongodb+srv://gusdn02337:ruftla7410*@cluster0.cdp0kyq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

async function main() {
  try {
    await client.connect();
    const postCollection = client.db("project3").collection("post");
    const counterCollection = client.db("project3").collection("counter");
    console.log("서버에 연결됐다");

    //GET
    app.get("/", async (req, res) => {
      // const query = {};
      const cursor = postCollection.find({});
      const result = (await cursor.toArray()).sort().reverse();

      res.render("list.ejs", { post: result });
    });

    app.get("/write", (req, res) => {
      res.render("write.ejs");
    });
    // 연결만 할 때는 이렇게

    app.get("/detail/:id", async function (req, res) {
      const result = await postCollection.findOne({
        _id: parseInt(req.params.id),
      });
      console.log(result);
      res.render("detail.ejs", { data: result });
    });
    // 디테일 페이지가 요청됐을 때 클릭한 디테일 페이지만 보여지게

    app.get("/edit/:id", async function (req, res) {
      const result = await postCollection.findOne({
        _id: parseInt(req.params.id),
      });
      res.render("edit.ejs", { post: result });
    });
    // 특정 리스트 수정해야하니 파라미터 문법 ':id' 사용

    //POST
    app.post("/add", async function (req, res) {
      let { menu, category, photoUrl, comment, recipe } = req.body;
      const { totalcounter } = await counterCollection.findOne({
        name: "count",
      });
      await postCollection.insertOne({
        _id: totalcounter + 1,
        postMenu: menu,
        postCategory: category,
        postPhotoUrl:
          photoUrl ||
          "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbEutAF%2Fbtr6UDdx2ll%2FUBsVnwTePkrzJ2J114oU70%2Fimg.png",
        PostComent: comment,
        PostRecipe: recipe,
      });
      await counterCollection.updateOne(
        { name: "count" },
        { $inc: { totalcounter: 1 } }
      );
      res.redirect("/");
    });

    // DELETE
    app.delete("/delete", async function (req, res) {
      req.body._id = parseInt(req.body._id);
      await postCollection.deleteOne(req.body);
      res.status(200).send({ message: "성공" });
    });

    //PUT
    app.put("/edit", async (req, res) => {
      const { id, menu, category, photoUrl, comment, recipe } = req.body;
      console.log(req.body);

      await postCollection.updateOne(
        { _id: parseInt(id) },
        {
          $set: {
            postMenu: menu,
            postCategory: category,
            postPhotoUrl:
              photoUrl ||
              "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbEutAF%2Fbtr6UDdx2ll%2FUBsVnwTePkrzJ2J114oU70%2Fimg.png",
            PostComent: comment,
            PostRecipe: recipe,
          },
        }
      );
      console.log("수정완료");
      res.redirect("/");
    });
  } finally {
    console.log("마무리");
  }
}

main().catch(console.dir);

app.listen(3000, () => {
  console.log("서버작동");
});
