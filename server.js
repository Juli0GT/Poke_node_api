const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');

const redis = require('./helpers/redis.js');


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

const setInRedisAndReturnResponse = ({
  path,
  res,
  status,
  payload,
  client,
}) => {
  redis.set({
    path,
    data: payload,
    status,
    client,
  })
  returnHttpResponse({
    res,
    status,
    payload,
  });

}


const getPokemonFromAPI = ({
  path,
  res,
  client,
}) => {
  return axiosInstance.get(path)
  .then(resp => {
    const { data } = resp;
    const status = 200;

    const payload = {
      success: true,
      data,
    };

    return setInRedisAndReturnResponse({
      path,
      res,
      status,
      payload,
      client,
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

    return setInRedisAndReturnResponse({
      path,
      res,
      status,
      payload,
      client,
    });
  });
}

const getPokemon = ({
  path,
  res,
  client,
}) => {
  try {
    redis.get({
      path,
      client,
    }).then(value => {
      value ?
        returnHttpResponse({
          res,
          status: value.status,
          payload: value.data,
        })
      :
        getPokemonFromAPI({
          path,
          res,
          client,
        })
    });
  } catch (err) {
    getPokemon({
      path,
      res,
      client: redis.client,
    });
  }
}

app.get('/pokemon/:name', (req, res) => {
  const path = req.path;
  getPokemon({
    path,
    res,
    client: redis.client,
  });
})


console.log(`Runing at port: ${PORT}`);

module.exports = app;
