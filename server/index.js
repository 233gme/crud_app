import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "555GGGmvc444ttt",
  database: "test",
});


db.connect(function (err) {
  if (err) throw err;
  console.log("DB Connected!");
});

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.json("server work");
});

app.delete('/items:id', (req, res) => {
  const itemId = req.params.id;
  const q = "DELETE FROM items WHERE id = ?";
  db.query(q, [itemId], (err, data) => {
    if (err) {
      return res.json("Delete Error")
    }

    return res.json('Item Deleted!')
  });
});

app.put('/items:id', (req, res) => {
  const itemId = req.params.id;
  const q = "UPDATE items SET `title` = ?, `desc` = ?, `img` = ?, `price` = ? WHERE id = ?";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.img,
    req.body.price,
  ];

  db.query(q, [...values, itemId], (err, data) => {
    if (err) return res.json('POST Error');

    return res.json('Updated!');
  });
});

app.get('/items', (req, res) => {
  const q = "SELECT * FROM items";
  db.query(q, (err, data) => {
    if (err) {
      return res.json("GET Error")
    }

    return res.json(data)
  })
});

app.get('/item:id', (req, res) => {
  const itemId = req.params.id;
  const q = "SELECT FROM items WHERE id = ?";
  db.query(q, [itemId], (err, data) => {
    if (err) {
      return res.json("GET Item Error")
    }

    return res.json(data)
  });
});

app.post('/items', (req, res) => {
  const q = 'INSERT INTO items (`title`, `desc`, `img`, `price`) VALUES (?)';
  const values = [
    req.body.title,
    req.body.desc,
    req.body.img,
    req.body.price,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json('POST Error');

    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Server start 8800!")
});
