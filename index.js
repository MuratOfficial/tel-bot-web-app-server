// server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const admin = require("firebase-admin");
const serviceAccount = require("tel-bot-server-firebase-adminsdk-gtwyf-5217c595d6.json");

// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbOMvUFn-ofxEAc_DXsGRCtxrHSXgHewM",
  authDomain: "tel-bot-server.firebaseapp.com",
  projectId: "tel-bot-server",
  storageBucket: "tel-bot-server.appspot.com",
  messagingSenderId: "922764117283",
  appId: "1:922764117283:web:6df6c0f70eb835484eb896",
  measurementId: "G-W5MG02GPL7",
};

// Initialize Firebase
const app1 = initializeApp(firebaseConfig);

const app = express();
const port = 3001; // You can use any port you prefer

app.use(express.json());
app.use(cors());

app.get("/api/products", async (req, res) => {
  try {
    const apiUrl = "https://api.moysklad.ru/api/remap/1.2/entity/product";
    const username = "admin@dessert1";
    const password = "7212565689";

    const credentials = Buffer.from(
      `${username}:${password}`,
      "utf-8"
    ).toString("base64");

    const headers = {
      Authorization: `Basic ${credentials}`,
      // Remove "Accept-Encoding": "gzip" - let the browser handle compression
    };

    const response = await axios.get(apiUrl, { headers });
    res.json(response.data);
  } catch (error) {
    console.error("Error in proxy request:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
