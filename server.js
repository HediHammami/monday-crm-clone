const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
const url = process.env.DB_URL;
const PORT = 5000;

app.get("/tickets", async (req, res) => {
  const options = {
    method: "GET",
    headers: {
      Accepts: "application/json",
      "X-Cassandra-Token": process.env.TOKEN,
    },
  };
  try {
    const response = await axios(`${url}?page-size=20`, options);
    res.status(200).json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

app.post("/tickets", async (req, res) => {
  const formData = req.body.formData;

  const options = {
    method: "POST",
    headers: {
      Accepts: "application/json",
      "X-Cassandra-Token": process.env.TOKEN,
      "Content-Type": "application/json",
    },
    data: formData,
  };
  try {
    const response = await axios(url, options);
    res.status(201).json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

app.delete("/tickets/:documentId", async (req, res) => {
  const id = req.params.documentId;
  const options = {
    method: "DELETE",
    headers: {
      Accepts: "application/json",
      "X-Cassandra-Token": process.env.TOKEN,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios(`${url}/${id}`, options);
    res.status(200).json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

app.get("/tickets/:documentId", async (req, res) => {
  const id = req.params.documentId;

  const options = {
    method: "GET",
    headers: {
      Accepts: "application/json",
      "X-Cassandra-Token": process.env.TOKEN,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios(`${url}/${id}`, options);
    res.status(200).json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

app.put("/tickets/:documentId", async (req, res) => {
  const id = req.params.documentId;
  const data = req.body.data;

  const options = {
    method: "PUT",
    headers: {
      Accepts: "application/json",
      "X-Cassandra-Token": process.env.TOKEN,
    },
    data,
  };

  try {
    const response = await axios(`${url}/${id}`, options);
    res.status(200).json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

app.listen(PORT, () => console.log(`server is running on port ${PORT}...`));
