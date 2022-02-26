const express = require('express')
const restful = require('node-restful')
const bodyParser = require('body-parser')
const cors = require('cors')

const server = express()
const mongoose = restful.mongoose

//DataBase connection
mongoose.Promise = global.Promise //API de conexao do mongoose esta depreciada
mongoose.connect('mongodb://db/mydb')

//middlewares
server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(cors())

//ODM
const Client = restful.model('Client', {
  name: {type: String, required: true}
})

//Rest API
Client.methods(['get', 'post', 'put', 'delete'])
Client.updateOptions({new: true, runValidators: true})

//Rotas
Client.register(server, '/clients')

//Start Server
server.listen(3000, function(){
  console.log('Executando...')
})