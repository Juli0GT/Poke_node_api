const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

console.log(`Runing at port: ${PORT}`);

module.exports = app;
