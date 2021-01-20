//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Event Listeners
eventListeners();
function eventListeners(){
    formulario.addEventListener('submit', agregarTweet);

    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse (localStorage.getItem('tweets')) || [] ;
    
        console.log (tweets);
    
        crearHTML();
    }); 
};

// Functions
function agregarTweet(e){
    e.preventDefault();

    const tweet = document.querySelector('#tweet').value
    if(tweet === ''){
        mostrarError('El mensaje no debe estar vacio');
        return; // Evita que el codigo se siga ejecutando
    }

    const tweetObj = {
        id: Date.now(),
        tweet           
    }
    tweets = [...tweets, tweetObj];
    
    crearHTML();

    formulario.reset();
}

function mostrarError(mensaje){
         
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('error');
    formulario.appendChild(mensajeError)

    setTimeout(() => {
      mensajeError.remove();  
    }, 2000);
}

function crearHTML(){

     limpiarHTML();

    if ( tweets.length > 0){
        tweets.forEach(tweet => {
            //Crear BTN eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X';

            //Añadir la funcion elmiminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            const li = document.createElement('li');
            li.innerText = tweet.tweet;
            li.appendChild(btnEliminar);
            listaTweets.appendChild(li);
        });
    }

    agregarStorage();
};


function agregarStorage() {
    localStorage.setItem('Tweets', JSON.stringify(tweets))   
}

function borrarTweet(id){
    tweets = tweets.filter( tweet => tweet.id !== id );

    crearHTML();
}

// Limpiar html
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}