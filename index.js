const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

app.use(cors());
app.use(express.json());

const port = process.env.PORT;
const uri = process.env.DB_URL;
const secret = process.env.SECRET;

function createToken(user) {
  const token = jwt.sign(
    {
      email: user.email,
    },
    secret,
    { expiresIn: "1h" }
  );
  return token;
}

function verifyToken(req, res, next) {
  const rawtoken = req.headers.authorization;
  const token = rawtoken.split(' ')[1];
  console.log(token);
  const verify = jwt.verify(token, secret);
  console.log(verify);
  if (!verify?.email) {
    return res.send({
      message: "Session expired!!! login again",
    });
  }
  req.user = verify.email;
  next();
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const productDatabase = client.db("productDB");
    const userDatabase = client.db("userDB");
    const productCollection = productDatabase.collection("product_collection");
    const userCollection = userDatabase.collection("user_collection");

    app.post("/create-user", async (req, res) => {
      const user = req.body;
      const isUser = await userCollection.findOne({ email: user?.email });
      const token = createToken(user);
      if (isUser) {
        return res.send({
          status: "success",
          message: "login successful",
          token,
        });
      } else {
        const result = await userCollection.insertOne(user);
        return res.send({
          status: "success",
          message: "new user created",
          token,
        });
      }
    });
    app.get("/get-user", async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });
    app.get("/get-user/:email", async (req, res) => {
      const email = req.params.email;
      const result = await userCollection.findOne({ email });
      res.send(result);
    });
    app.patch("/edit-profile",verifyToken, async (req, res) => {
      const user = req.body;
      // const isUser = await userCollection.findOne({ email: user?.email });

      const result = await userCollection.updateOne(
        { email: user.email },
        { $set: user },
        { upsert: true }
      );

      // const result = await productCollection.updateOne(
      //   { _id: new ObjectId(id) },
      //   { $set: updateData }
      // );
      res.send(result);
    });
    app.post("/create-post",verifyToken, async (req, res) => {
      const user = req.body;
      const result = await productCollection.insertOne(user);
      res.send(result);
    });
    app.get("/products", async (req, res) => {
      const result = await productCollection.find().toArray();
      res.send(result);
    });
    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const result = await productCollection.findOne({ _id: new ObjectId(id) });
      res.send(result);
    });
    app.patch("/products/:id",verifyToken, async (req, res) => {
      const id = req.params.id;
      const updateData = req.body;
      const result = await productCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );
      res.send(result);
    });
    app.delete("/products/:id",verifyToken, async (req, res) => {
      const id = req.params.id;
      const result = await productCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    console.log("successfully connected to MongoDB!");
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/about", (req, res) => {
  res.send("this is about");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/asmrayat/final-assignment-BE.git
git push -u origin main