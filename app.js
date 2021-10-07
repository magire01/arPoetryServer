const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const db = require("./models");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
require('dotenv').config()
const PORT = process.env.PORT || 8081;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'public')));

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

mongoose.connect(process.env.URI,
  { useNewUrlParser: true })
  .then(console.log('Connected to Database'))
  .catch(err => console.log(err))
        
// home page route
app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html');
});

//login
app.post("/login/", (req, res) => {
  db.Profile.findOne({ user: req.body.user })
  .then(async user => {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const jwtExpirySeconds = 300
      const accessToken = jwt.sign({ user }, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: jwtExpirySeconds
      })
      res.cookie("token", accessToken, { maxAge: jwtExpirySeconds * 1000 })
      app.get("/poems/", (req, res) => {
        const token = req.cookies.token
  if (!token) {
    res.send(401)
  } else {
    res.sendFile(__dirname + '/public/pages/home.html')
  }
      })
      res.json({ message: "Invalid Credentials" });
      console.log("Invalid Credentials")
    }
  })
})

//Create user
app.post("/create/profile/", async(req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = { user: req.body.user, password: hashedPassword }
    db.Profile.create(user)
    .then(console.log(user))
  } catch {
    res.status(201).send()
  }
});

//poems page route
app.get("/home/", (req, res) => {
  const token = req.cookies.token
  if (!token) {
    res.send(401)
  } else {
    res.sendFile(__dirname + '/public/pages/home.html')
  }
})

//poems page route
app.get("/poems/", (req, res) => {
  const token = req.cookies.token
  if (!token) {
    res.send(401)
  } else {
    res.sendFile(__dirname + '/public/pages/allpoems.html')
  }
})


/////////POEMS////////
//Create poem
app.post("/poems/create/", (req, res) => {
  try {
    const poem = { 
    title: req.body.title, 
    orderId: Number(req.body.orderId),
    datePosted: req.body.datePosted,
    text: req.body.text,
    additionalInfo: req.body.additionalInfo
    }
    db.Poems.create(poem)
    .then(console.log("Poem submitted"))
  } catch {
    res.status(201).send();
  }
  
});

//Get All Poems
app.get("/poems/allpoems/", async (req, res) => {
  await db.Poems.find().sort({orderId: 'descending'})
  .then(result => res.json(result))
  .catch(err => console.log(err))
})

//Route to Edit Poem Page
app.get("/poems/:id", async (req, res) => {
  const token = req.cookies.token
  if (!token) {
    res.send(401)
  } else {
    res.sendFile(__dirname + '/public/pages/poem.html')
  }
})

//Get poem to update
app.get("/poems/update/:id", async (req, res) => {
  await db.Poems.findById(req.params.id)
  .then(result => res.json(result))
})

//Submit update Poem
app.put("/poems/submitupdate/:id", async (req, res) => {
  await db.Poems.findByIdAndUpdate(req.params.id, { title: req.body.title, orderId: Number(req.body.orderId), datePosted: req.body.datePosted, text: req.body.text, additionalInfo: req.body.additionalInfo })
  .then(console.log(`Successfully Updated Item ${req.params.id}`))
  .catch(err => console.log(err))
})

//Delete Poem
app.delete("/poems/delete/:id", async (req, res) => {
  await db.Poems.findByIdAndDelete(req.params.id)
  .then(result => console.log(`Record id ${result._id} deleted`))
  .catch(err => console.log(err))
})


//////FILMS ////////
//films page route
app.get("/films/", (req, res) => {
  const token = req.cookies.token
  if (!token) {
    res.send(401)
  } else {
    res.sendFile(__dirname + '/public/pages/allfilms.html')
  }
})
//create film
app.post("/films/create/", (req, res) => {
  try {
    const film = { 
      title: req.body.title,
      orderId: req.body.orderId,
      datePosted: req.body.datePosted,
      directedBy: req.body.directedBy,
      summary: req.body.summary,
      relatability: req.body.relatability,
      relatabilityScore: req.body.relatabilityScore,
      execution: req.body.execution,
      executionScore: req.body.executionScore,
      context: req.body.context,
      contextScore: req.body.contextScore,
      subtext: req.body.subtext,
      subtextScore: req.body.subtextScore,
      emotion: req.body.emotion,
      emotionScore: req.body.emotionScore,
      overallScore: req.body.overallScore,
      song: req.body.song,
      image: req.body.image
    }
    db.Films.create(film)
    .then(console.log("Film submitted"))
  } catch {
    res.status(201).send();
  }
});

//Get All Films
app.get("/films/allfilms/", async (req, res) => {
  await db.Films.find().sort({orderId: 'descending'})
  .then(result => res.json(result))
  .catch(err => console.log(err))
})

//Delete Poem
app.delete("/films/delete/:id", async (req, res) => {
  await db.Films.findByIdAndDelete(req.params.id)
  .then(result => console.log(`Record id ${result._id} deleted`))
  .catch(err => console.log(err))
})

//Route to Edit Film Page
app.get("/films/:id", async (req, res) => {
  const token = req.cookies.token
  if (!token) {
    res.send(401)
  } else {
    res.sendFile(__dirname + '/public/pages/film.html')
  }
})

//Get film to update
app.get("/films/update/:id", async (req, res) => {
  await db.Films.findById(req.params.id)
  .then(result => res.json(result))
})