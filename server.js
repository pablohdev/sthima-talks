const express = require('express');
const path = require('path');

const app     = express();
const server  = require("http").createServer(app);
const io      = require("socket.io")(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('view', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (_, res) => {
    res.render('index.html');
})

const usersActive = []

io.on('connection', socket => {
    
    const user = {
        id: socket.id,
        name: socket.handshake.query.name
    }

    socket.broadcast.emit('userSignIn', user)
    usersActive.push(user)
    socket.emit('UsersActive', usersActive);

    socket.on('sendMessage', data => {
        socket.broadcast.emit('receivedMessage', data)
    })

    socket.on("disconnect", () => {
        const findIndex = usersActive.findIndex(item => item.id === user.id)
        socket.broadcast.emit('userLogout', user)

        if(findIndex){
            usersActive.splice(findIndex, 1)
        }
    });
})


server.listen(3000)
