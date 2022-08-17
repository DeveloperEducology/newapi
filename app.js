const express = require("express");
const cors = require("cors");

const db = require("./models");
const userss = require("./models/User");
const Product = require("./models/Product");
const Questions = require("./models/Question")

const app = express();
app.use(express.json());
app.use(cors());

const URL = `mongodb+srv://educology:educology123@educology.b5cu0.mongodb.net/Educology?retryWrites=true&w=majority`;

db.mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

app.post("/register", async (req, res) => {
  try {
    let user = new userss(req.body);
    let result = await user.save();
    // result = result.toObject();
    // delete result.password;
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

app.get("/userss", async (req, res) => {
  let userData = await userss.find();
  userData.length;
  console.log(userData);
  res.send(userData);
});


app.post("/add-product", async (req, res) => {
  const productt = new Product();
  
  productt.name = req.body.name;
  productt.price = req.body.price;
  productt.category = req.body.category;
  productt.tag[0] = req.body.tag[0];
  productt.tag[1] = req.body.tag[1];
  productt.tag[2] = req.body.tag[2];
  await productt.save((err, productt) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      console.log(productt);
      res.send(productt);
    }
  });
});


app.get("/products", async (req, res) => {
  try {
    let products = await Product.find();
    // res.send(products);
    if (products.length > 0) {
      res.send(products);
    } else {
      res.send({ result: "No products found" });
    }
  } catch (err) {
    console.log(err);
  }
});


app.post("/add-question", async (req, res) => {
    const question = new Questions();
    question.question = req.body.question;
    question.answer_options[0] = req.body.answer_options[0]; 
    question.answer_options[1] = req.body.answer_options[1]; 
    question.answer_options[2] = req.body.answer_options[2]; 
    question.answer_options[3] = req.body.answer_options[3]; 
    question.category = req.body.category;
    question.type = req.body.type;
    await question.save((err, question) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      console.log(question);
      res.send(question);
    }
  });
})



app.get("/questions", async (req, res) => {
  try {
    let questions = await Questions.find();

    if (questions.length > 0) {
      console.log(questions);
      res.send(questions);
    } else {
      res.send({ result: "No questions found" });
    }
  } catch (err) {
    console.log(err);
  }
});


app.delete("/question/:id", async (req, res) => {
  const result = await Question.deleteOne({ _id: req.params.id });
  
  res.send(result);
});



app.get('/v1', (req, res) => {
res.send("Welcome to Home Page");
})

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});