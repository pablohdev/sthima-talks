function startChat(name = ''){

    userLoged = {
        id: null,
        name
    }

    socket = io('http://localhost:3000', {query:`name=${name}`})

    socket.on('connect', () => {
        userLoged.id = socket.id
     });


   
    socket.on('receivedMessage', data => {

        console.log(data)

        const _data = {
            id: data.user.id, 
            name: data.user.name,
            message: data.message.replace(/(?:\r\n|\r|\n)/g, '<br>'), 
            me: false
        }

        addMessage(_data)
    })

    socket.on('userSignIn', data  => {
        addUserList({id: data.id, name: data.name})
    })
}


function sendMessage(){

    const message = document.querySelector('#send-messages-text').value.trim()

    if(!message){
        return false
    }

    const _dataSend = {
        user: userLoged,
        message
    }
    socket.emit('sendMessage', _dataSend)

    const _data = {
        id: _dataSend.user.id, 
        name: _dataSend.user.name,
        message: message.replace(/(?:\r\n|\r|\n)/g, '<br>'),
        me: true
    }

    addMessage(_data)

    document.querySelector('#send-messages-text').value = ''


 }