const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('message-input')
const messageContainer = document.querySelector('.container')
const audio = new Audio('./sound/ting.mp3')

const append = (message, position) => {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageElement.classList.add('msg')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
    if(position == 'left'){
        audio.play()
    }
}

const name = prompt('What is your name?')
socket.emit('new-user-joined', name)

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'left')
})

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left')
})

socket.on('left', name => {
    append(`${name} left the chat`, 'left')
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})



