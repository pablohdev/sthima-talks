const express = require('express');
const path = require('path');

const app     = express();
const server  = require("http").createServer(app);
const io      = require("socket.io")(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('view', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
    res.render('index.html');
})



io.on('connection', socket => {

    
    const user = {
        id: socket.id,
        name: socket.handshake.query.name
    }
    socket.broadcast.emit('userSignIn', user)


    socket.on('sendMessage', data => {
        console.log('message', data)
        socket.broadcast.emit('receivedMessage', data)
    })
})


server.listen(3000)
