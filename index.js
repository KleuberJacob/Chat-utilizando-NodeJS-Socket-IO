const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.set('view engine', 'ejs')

io.on('connection', (socket) => {

    socket.on('disconnect', () => {//Tratando evento de desconexao recebido do frontend
        console.log('Desconectado: ' + socket.id)
    })

    socket.on('msg', (data) => {
        io.emit('respMsg', data)//Socket = usuario especifico emite apenas para o usuario que enviou  
        console.log(data)       //io = O proprio servidor emite para todos 
    })  
})

app.get('/', (req, res) => {
    res.render('index')
})

http.listen(3000, () => {
    console.log('Servidor Rodando!')
})