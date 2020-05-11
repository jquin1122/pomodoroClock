//time settings
const pomodoroLength = document.getElementById("pomodoroLength");;
const pomodoroSet = document.getElementById("pomodoroSet");;
const shortBreak = document.getElementById("shortBreak");
const longBreak = document.getElementById("longBreak");

const settings = [pomodoroLength.value, pomodoroSet.value, shortBreak.value, longBreak.value];

let clockStatus;
let clockRunning = false;
let pomodoroCompleted = 0;
let pomodoro = true;

//DOM Items
let clockTime = (settings[0] * 60 * 1000);
let start = document.getElementById("start");
let pause = document.getElementById("pause");
let clock = document.getElementById("clock");
let indicators = document.getElementById("indicators");
let currentTask = document.getElementById("task");
let defaults = document.getElementById("default");

//Button event listener
start.addEventListener('click', startTimer);
pause.addEventListener('click', pauseTimer);
reset.addEventListener('click', resetTimer);
defaults.addEventListener('click', setDefaults);

pomodoroSet.addEventListener('change', setIndicators);

window.onload = function(){
    setIndicators();
    clock.innerHTML = this.formatTime(clockTime);
}

//function formats time from milliseconds to a readable clock on the screen
function formatTime(time){
    let minutes = Math.floor(time / 60000);
    if(minutes < 10){minutes = "0" + minutes};

    let seconds = Math.floor((time % 60000) / 1000);
    if(seconds < 10){seconds = "0" + seconds};
    
    return minutes + ":" + seconds;
}

function setClockTime(){
    if(pomodoro == true){
        clockTime = (settings[0] * 60 * 1000);
        currentTask.innerHTML = "Focused Session";
    }else if((pomodoroCompleted % settings[1]) == 0){
        clockTime = (settings[3] * 60 * 1000);
        resetIndicators();
        currentTask.innerHTML = "Longer Break";
    }else{
        clockTime = (settings[2] * 60 * 1000);
        currentTask.innerHTML = "Short Break";
    }
}

//Clock control functions
function startTimer(){
    if(clockRunning == false){
        clockStatus = setInterval(function(){runTimer();}, 1000);
        clockRunning = true;
        if(pomodoro == true){
            currentTask.innerHTML = "Focused Session";
        }
    }
}

function runTimer(){
    clockTime -= 1000;
    if(clockTime <= 0){
        clock.innerHTML = "00:00";
        if(pomodoro == true){
            pomodoroCompleted += 1;
            updateIndicators();
            pomodoro = false;
        }else{
            pomodoro = true;
        }
        setClockTime();
    }
    clock.innerHTML = formatTime(clockTime);
}

function pauseTimer(){
    clearInterval(clockStatus);
    clockRunning = false;
}

function resetTimer(){
    clearInterval(clockStatus);
    clockRunning = false;
    clockTime = (settings[0] * 60 * 1000);
    clock.innerHTML = formatTime(clockTime);
    pomodoroCompleted = 0;
    pomodoro = true;
    resetIndicators();
}

function setIndicators(){
    while(indicators.firstChild){
        indicators.removeChild(indicators.lastChild);
    }

    for(let i=0; i<pomodoroSet.value; i++){
        ind = document.createElement('li');
        ind.innerHTML = '.';
        indicators.appendChild(ind);
    }
}

function updateIndicators(){
    let indNodes = indicators.children;
    resetIndicators();

    if(pomodoroCompleted != 0 && pomodoroCompleted < settings[1]){
        for(let j=0; j<pomodoroCompleted; j++){
            indNodes[j].style.color = "green";
        }
        return;
    }

    if((pomodoroCompleted % settings[1]) == 0){
        for(let k=0; k<indNodes.length; k++){
            indNodes[k].style.color = "green";
        }
        return;
    }

    for(let l=0; l<(pomodoroCompleted % settings[1]); l++){
        indNodes[l].style.color = "green";
    }
}

function resetIndicators(){
    let indNodes = indicators.children;
    for(let i=0; i<indNodes.length; i++){
        indNodes[i].style.color = "black";
    }
}

function setDefaults(){
    pomodoroLength.value = 25;
    pomodoroSet.value = 4;
    shortBreak.value = 5;
    longBreak.value = 30;
}
//left off trying to get the colored indicators to work after 1 full pomodoro set.