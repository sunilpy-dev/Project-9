const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const fs = require('fs');
const path = require('path');
dotenv.config();
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser')
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const port = process.env.PORT || 3000
const secret = process.env.JWT_SECRET;
function OTPGenerator() {
  return 10000 + Math.floor(Math.random() * 90000);
}

const allowedOrigins = [
  'https://snip-vault-frontend.onrender.com'
];
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));



app.use(express.json({ limit: '1mb' }));
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const dbName = 'Snip_Vault';

app.get('/', async (req, res) => {
  res.send('Hello world');
})
// app.get('/', async (req, res) => {
//   const db = client.db(dbName);
//   const collection = db.collection('Code_details');
//   const result = await collection.find({ "id": { $regex: /-mhbhagat9900$/ } }).toArray();
//   res.json(result)
// })
app.get('/logot', async (req, res) => {
  try {
    res.clearCookie('token',
      {
        httpOnly: true,
        secure: true,
        sameSite: "None"
      }
    );
    res.send(true)
  } catch (error) {
    console.log(error)
  }
})
app.get('/verifyUser', isLoggedIn, async (req, res) => {
  res.json({ loggedIn: true, user: req.user });
})
app.post('/sendConfirm', async (req, res) => {
  const { username, email } = await req.body
  try {
    sendConfirmation(username, email);
    res.json({ loggedIn: true, user: req.user });

  } catch (error) {
    res.status(500).json({ Message: "Message not sent" });
  }
})

app.post('/fetchdata', async (req, res) => {
  const { regx } = await req.body
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('Code_details');
    // console.log("using regex:", new RegExp(`${regx}$`))
    const result = await collection.find({ "id": { $regex: new RegExp(`${(regx)}$`) } }).toArray();
    // const result = await collection.find({"id":{$regex:/-mhbhagat9900$/}}).toArray();
    res.json({ Result: result })
  } catch (error) {
    res.status(500).json({ Message: "Data not found" });
  }
})

app.post('/', isLoggedIn, async (req, res) => {
  const data = await req.body
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('Code_details');
    const result = await collection.insertOne(data)
    res.json({ Success: true, Result: result })
  } catch (error) {
    res.status(500).json({ Success: false, Result: "Server error" });
  }

})
app.post('/sendMessage', isLoggedIn, async (req, res) => {
  const data = await req.body
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('Message_details');
    const result = await collection.insertOne(data)
    res.json({ Success: true, Result: result })
  } catch (error) {
    res.status(500).send("Data not inserted");
  }
})
app.post('/finduser', async (req, res) => {
  const data = await req.body
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('Register_details');
    const result = await collection.findOne({ email: data.email })
    // console.log(result)
    res.send(result == null) //if the results are sended in the formate of the json then recive that in the formate of json and if in text form like res.send recive it in frontend as the res.text()
  } catch (error) {
    res.status(500).send(error);
  }
})
app.post('/saveRegister', async (req, res) => {
  let { username, email, password, id, verificationCode } = await req.body //we can use this also to fetch out frontend data
  try {
    // const data = await req.body
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        // console.log({ username: username, email: email, password: hash, id: id })
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('Temp_register');
        await collection.deleteMany({ email: email })
        const Message = await sendEmail(username, email, verificationCode)
        if (Message.message == true) {
          const result = await collection.insertOne({ username: username, email: email, password: hash, id: id, verificationCode: verificationCode })
          // console.log(token)
          // res.send(true)
          res.json({ Success: true, Result: result })
        } else {
          return res.json({ Success: false, Result: Message.message })
        }
      });
    });

  } catch (error) {
    res.status(500).json({ Result: "Server error" });
  }
})
app.post('/checkUser', async (req, res) => {
  const data = req.body
  try {

    // await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('Register_details');
    const result = await collection.findOne({ email: data.email })
    // console.log(result)
    if (result) {
      // console.log({pass1:result.password,pass2:data.password})
      bcrypt.compare(data.password, result.password, function (err, isMatch) {
        if (isMatch) {
          let token = jwt.sign({ email: data.email }, secret, { expiresIn: '10m' })
          res.cookie('token', token
            , {
              httpOnly: true,
              secure: true,
              sameSite: 'Strict', // or 'Lax'
              maxAge: 10 * 60 * 1000, // 10 minutes
            }
          )
          return res.json({ Success: true, Result: result });
        }
        if (err) {
          res.status(500).json({ Result: "Something went wrong!" });
        }
        else { return res.json({ Result: false }); }  //for sending the res to frontend in the through if else use the return here
      })
    }
    else {
      return res.json({ Result: "Please registerd" });
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
})
// app.post('/findemail', async (req, res) => {
//   const email = await req.body
//   await client.connect();
//   const db = client.db(dbName);
//   const collection = db.collection('Register_details');
//   const result = await collection.findOne({ email: email })
//   res.send(true)
// })


app.post('/verifyOTP', async (req, res) => {
  const { email, verificationCode } = req.body
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('Temp_register');
    const newcollection = db.collection('Register_details')
    const result = await collection.findOne({ email: email, verificationCode: verificationCode })
    // console.log(result)
    if (!result) {
      // console.log("enterd here2")
      return res.json({ Success: false, Result: "Inavlid OTP try again!" })
    }
    // console.log("enterd here1")
    let token = jwt.sign({ email: email }, secret, { expiresIn: '10m' })
    res.cookie('token', token
      , {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict', // or 'Lax'
        maxAge: 10 * 60 * 1000, // 10 minutes
      }
    )
    // console.log("till here")
    const { _id, username, password, id } = result;
    await newcollection.insertOne({ username: username, email: email, password: password, id: id })
    await collection.deleteMany({ email: email })
    return res.json({ Success: true, Result: "Loggedd In" })

  } catch (error) {
    // console.log("entered here3", error)
    res.status(500).json({ Success: false, Result: error });
  }
})
app.post('/resetOTP', async (req, res) => {
  const { username, email, verificationCode } = await req.body
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('Temp_register');
    const Message = await sendEmail(username, email, verificationCode)
    if (Message.message == true) {
      const result = await collection.updateOne({ email: email },
        [
          { $set: { verificationCode: verificationCode } }
        ])
      res.json({ Success: true, Result: "OTP resended" })
    } else {
      res.json({ Success: false, Result: Message.message })
    }
  } catch (error) {
    res.status(500).json({ Result: "Server error!" });
  }
})



app.delete('/', async (req, res) => {
  const { id } = req.body
  try {
    const db = client.db(dbName);
    const collection = db.collection('Code_details');
    const result = await collection.deleteOne({ id: id })
    if (result.deletedCount > 0) {
      res.json({ Success: true, Result: "Deleted" })
    } else {
      res.json({ Success: false, Result: "Not deleted" })
    }
  } catch (error) {
    res.status(500).json({ Success: false, Resullt: "server error" });
  }
})

app.delete('/deleteOld', async (req, res) => {
  const { id } = req.body
  try {
    const db = client.db(dbName);
    const collection = db.collection('Code_details');
    const result = await collection.deleteOne({ id: id })
    if (result.deletedCount > 0) {
      res.json({ Success: true, Result: "Deleted" })
    } else {
      res.json({ Success: false, Result: "Not deleted" })
    }
  } catch (error) {
    res.status(500).json({ Success: false, Resullt: "server error" });
  }
})

function isLoggedIn(req, res, next) {
  // console.log(req.cookies.token);
  if (!req.cookies.token) {
    return res.status(401).json({ Result: "Please login!" });
  } else {
    let data = jwt.verify(req.cookies.token, secret);
    req.user = data;
    next();
  }
}



// Email sender

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.YOUR_GMAIL,
    pass: process.env.APP_PASS,
  },
});

// Wrap in an async IIFE so we can use await.
const sendEmail = async (username, email, verificationCode) => {
  const name = username;
  const capitalized = name
  .toLowerCase()
  .split(' ')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');
  const templatePath = path.join(__dirname, 'templates', 'emailVerif.html');
  let htmlTemplate = fs.readFileSync(templatePath, 'utf-8');

  htmlTemplate = htmlTemplate
    .replace('{{username}}', capitalized)
    .replace('{{OTP_CODE}}', verificationCode);
  try {
    const info = await transporter.sendMail({
      from: `"Snip-Vault" <${process.env.YOUR_GMAIL}>`,
      to: email,
      subject: "Verify email",
      text: "Hello world?", // plain‑text body
      html: htmlTemplate, // HTML body
    });
    return { message: true }
    // console.log("Message sent:", info.messageId);
  } catch (error) {
    return { message: "Please connect to internet!" }
  }
}
const sendConfirmation = async (username, email) => {
  const name = username;
  const capitalized = name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  const templatePath = path.join(__dirname, 'templates', 'WelcomeEmail.html');
  let htmlTemplate = fs.readFileSync(templatePath, 'utf-8');

  htmlTemplate = htmlTemplate
  .replace('{{username}}', capitalized);
  try {
    const info = await transporter.sendMail({
      from: `"Snip-Vault" <${process.env.YOUR_GMAIL}>`,
      to: email,
      subject: "Verify email",
      text: "Hello world?", // plain‑text body
      html: htmlTemplate, // HTML body
    });
    return { message: true }
    // console.log("Message sent:", info.messageId);
  } catch (error) {
    return { message: "Please connect to internet!" }
  }
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})