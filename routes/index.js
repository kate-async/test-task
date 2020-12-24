const express = require('express');
const fs = require('fs');

const router = express.Router();
const itemsPerPage = 8;

router.get('/products', async (req, res) => {
  const { page, size } = req.query;

  if (page && (page < 1 || !Number.isInteger(+page))) {
    return res.status(500).send({ err: 'page param is invalid'});
  };
  if (size && (size < 1 || !Number.isInteger(+size))) {
    return res.status(500).send({ err: 'size param is invalid'});
  };

  fs.readFile('data.json', (err, data) => {

    if (err) {
      return res.status(500).send({});
    };

    // Converting to JSON
    const products = JSON.parse(data).products;
    let slicedProducts = [];

    if (page) {
      slicedProducts = products.slice((page - 1) * (size || itemsPerPage), page * (size || itemsPerPage));
    }

    return res.send({
      products: slicedProducts,
      totalItems: products.length
    });
  });
});


module.exports = router;
