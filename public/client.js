const socket = io()

let yourName;
let textarea = document.querySelector('#textarea');
let messagearea = document.querySelector('.message__area')
do{
    yourName = prompt('Enter Your Name');
}while(!yourName);

textarea.addEventListener('keyup',(e) =>{
    if(e.key === "Enter"){
        sendMessage(e.target.value);

    }

})

function sendMessage (message){
    let msg = {
        user: yourName,
        message: message.trim()
    }
    //Append Message in your Message section

    appendMessage(msg,'outgoing');
    textarea.value =""
    //send message to server
    socket.emit('message',msg);
} 

function appendMessage(msg , type){
    const mainDiv = document.createElement('div');
    const className = type
    mainDiv.classList.add(className,'message');
    
    const markup = `<h4>${msg.user}</h4>
    <p>${msg.message}</p>`;

    mainDiv.innerHTML = markup;
    messagearea.appendChild(mainDiv);
}

//recieve Message

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
})