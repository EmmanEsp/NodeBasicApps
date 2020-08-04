const socket = io();

// Elements
const messageForm = document.querySelector('#message-form');
const messageInput = messageForm.querySelector('#message');
const sendMessage = messageForm.querySelector('#send-message');
const sendLocation = document.querySelector('#send-location');
const messages = document.querySelector('#messages');

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationTemplate = document.querySelector('#location-template').innerHTML;
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML;

// Options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true });

const autoscroll = () => {
    const newMessage = messages.lastElementChild;

    // Height of the new message
    const newMessageStyles = getComputedStyle(newMessage);
    const newMessageMargin = parseInt(newMessageStyles.marginBottom);
    const newMessageHeight = newMessage.offsetHeight + newMessageMargin;
    
    //Visible height
    const visibleHeight = messages.offsetHeight;

    // Height of messages container
    const containerHeight = messages.scrollHeight;

    //how far have I scrolled?
    const scrollOffset = messages.scrollTop + visibleHeight;

    if( (containerHeight - newMessageHeight) <= scrollOffset) {
        messages.scrollTop = messages.scrollHeight;
    }
    
}

socket.on('message', (message) => {
    console.log(message);
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('hh:mm a')
    });
    messages.insertAdjacentHTML('beforeend', html);
    autoscroll();
});

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage.setAttribute('disabled', 'disabled');

    const message = messageInput.value; 

    socket.emit('sendMessage', message, (error) => {
        sendMessage.removeAttribute('disabled');
        messageInput.value = '';
        messageInput.focus();

        if(error){
            return console.log(error);
        }

        console.log('The message was delivered');
    });
});

socket.on('roomData', ({ room, users }) => {
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    });
    document.querySelector('#sidebar').innerHTML = html;
});

socket.on('locationMessage', (message) => { 
    console.log(message);
    const html = Mustache.render(locationTemplate, {
        username: message.username,
        url: message.url,
        createdAt: moment(message.createdAt).format('hh:mm a')
    });
    messages.insertAdjacentHTML('beforeend', html);
    autoscroll();
});  

sendLocation.addEventListener('click', (e) => { 
    
    sendLocation.setAttribute('disabled', 'disabled');

    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    navigator.geolocation.getCurrentPosition((position) => {
                
        socket.emit('sendLocation', {
            latitude: position.coords.latitude, 
            longitude: position.coords.longitude
        }, () => {
            sendLocation.removeAttribute('disabled');
            console.log('Location shared!');
        });
    })
});

socket.emit('join', { username, room }, (error) => {
    if(error) {
        alert(error);
        location.href= '/';
    }
});
