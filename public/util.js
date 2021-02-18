
   const notyf = new Notyf({
      position: {x:'left',y:'bottom'}
   });


   function JoinChat(){

      const nameUser = document.querySelector('#name-user').value

      if(!nameUser){
         return notyf.error('Username must contain at least 3 characters')
      }

      notyf.success(`Welcome to Sthima, ${nameUser}`)


      document.querySelector('#entrar').style.display = 'none'
      document.querySelector('#chat').style.display   = 'flex'

      startChat(nameUser)
   }


   function addUserList(obj){

      const {id, name} = obj;

      let element = document.createElement('li');
      element.innerHTML = name;
      element.id = id


      document.querySelector('#list-users').appendChild(element)

      notyf.success(`<b>${name}</b> acabou de entrar`)

   }

   function removeUserList(obj){

      const {id, name} = obj;

      document.getElementById(id).remove()

      notyf.error(`<b>${name}</b> saiu da conversa`)

   }

   function addMessage(data){
      const {id, name, message, me} = data


      let element = document.createElement('div');
      element.className = `box box-arrow ${me && 'me'}`
      element.id = id
      element.innerHTML = `<h4>${name}</h4><p>${message}</p>`

      document.querySelector('#list-messages').appendChild(element)

   }


   document.querySelector('#send-messages-text').addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        sendMessage()
      }
  });