
let hours = document.querySelector(".hours");
let minutes = document.querySelector(".minutes");
let seconds = document.querySelector(".seconds");
let milliseconds = document.querySelector(".milliseconds");

let Start = document.getElementById("Start");
let Pause = document.getElementById("Pause");
let Reset = document.getElementById("Reset");
let Restart = document.getElementById("Restart");
let Lap = document.getElementById("Lap");
let ResetLaps = document.getElementById("Reset-laps");

let lapsList = document.querySelector(".laps");


Start.addEventListener("click", start);
Pause.addEventListener("click", pause);
Reset.addEventListener("click", reset);
Restart.addEventListener("click", restart);
Lap.addEventListener("click", addLap);
ResetLaps.addEventListener("click", resetLaps);

let running = false;
let interval;
let timer = 0;


function start() {
    if (running == false) {
        interval = setInterval(update, 10);
        running = true;
    }
}


function update() {
    timer++;
    let hValue =  Math.floor(timer / 360000);
    let minValue = Math.floor((timer % 360000) / 6000);
    let secValue = Math.floor((timer % 6000) / 100);
    let milisecValue = timer % 100;

    hours.innerHTML = formatTime(hValue);
    minutes.innerHTML = formatTime(minValue);
    seconds.innerHTML = formatTime(secValue);
    milliseconds.innerHTML = formatTime(milisecValue);

}


function formatTime(time) {
    if (time < 10) {
        return "0" + time;
    } else {
        return time;
    }
}

function pause() {
    clearInterval(interval);
    running = false;
}

function reset() {

    clearInterval(interval);
    running = false;
    timer = 0;
    hours.innerHTML = "00";
    minutes.innerHTML = "00";
    seconds.innerHTML = "00";
    milliseconds.innerHTML = "00";
}

function restart() {
    reset();
    start();
}

function addLap() {
    if (running == true) {
        let laps = hours.innerHTML + " : " + minutes.innerHTML + ": " + seconds.innerHTML + ": " + milliseconds.innerHTML;
        let list = document.createElement("li");
        list.innerHTML = laps;
        lapsList.appendChild(list);   
    }
    savedata()
}

function resetLaps() {
    lapsList.innerHTML = "";
    savedata()
}

function savedata(){
    localStorage.setItem("lap" , lapsList.innerHTML);
}


function showdata(){
    lapsList.innerHTML = localStorage.getItem("lap");
}

showdata();