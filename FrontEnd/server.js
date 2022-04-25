const express = require('express');
const path = require('path');
const app = require('./backend/app')
app.use(express.static(__dirname + '/dist/westshop'));
app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname+ '/dist/westshop/index.html'));}); 

const port = process.env.PORT || 3000

const server = app.listen(port);
