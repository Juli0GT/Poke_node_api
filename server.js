const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');

const PORT = process.env.PORT || 3000;


app.use(bodyParser.json({
  limit: '100k',
}));


const axiosInstance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: 1000,
});

app.listen(PORT);

const returnHttpResponse = ({
  res,
  status,
  payload
}) => res.status(status).json(payload);


const getPokemonFromAPI = ({
  path,
  res,
}) => {
  return axiosInstance.get(path)
  .then(resp => {
    const { data } = resp;
    const status = 200;

    const payload = {
      success: true,
      data,
    };

    returnHttpResponse({
      res,
      status,
      payload,
    });
  })
  .catch(err => {
    const {
      status,
      statusText,
    } = err.response;

    const payload = {
      success: false,
      error: {
        code: status,
        message: statusText,
      }
    };

    returnHttpResponse({
      res,
      status,
      payload,
    });
  });
}

app.get('/pokemon/:name', (req, res) => {
  const path = req.path;
  getPokemonFromAPI({
    path,
    res,
  });
})


console.log(`Runing at port: ${PORT}`);

module.exports = app;
