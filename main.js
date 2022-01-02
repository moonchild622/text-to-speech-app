//getting the API
const synth = window.speechSynthesis;

//declaring variables
const input =  document.querySelector('.input');
const rate = document.querySelector('.rate');
const pitch = document.querySelector('.pitch');
const select = document.querySelector('.select');
const button = document.querySelector('.button');

//get voices

let voices = [];

const getVoices = ()=>{
   voices = synth.getVoices()
   voices.forEach((voice)=>{
     let option = document.createElement('option')
     option.textContent = `${voice.name}(${voice.lang})`;

     option.setAttribute('data-name', voice.name);
     option.setAttribute('data-lang', voice.lang);
     select.appendChild(option);
   })
}

getVoices()

if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices;
}

const speak = ()=>{
    if(synth.speaking){
        console.log('ALREADY SPEAKING');
        return;
    }

    if(input.value !== ''){
        const speakText = new SpeechSynthesisUtterance(input.value);

        speakText.onend = e => console.log('done');

        const voiceSelect = select.selectedOptions[0].getAttribute('data-name');

       voices.forEach((voice)=>{
           if(voice == voiceSelect){
               speakText.voice = voice;
           }
       })

       speakText.rate = rate.value;
       speakText.pitch = pitch.value;

       synth.speak(speakText);
    }
}

//add event listeners
button.addEventListener('click', e=>{
    e.preventDefault()
    speak()
})