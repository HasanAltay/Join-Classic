function SumTodoChangeImage(img) {
    document.getElementById('sum_todo_img').src = img;
}


function SumDoneChangeImage(img) {
    document.getElementById('sum_done_img').src = img;
}


function getTime() {
let currentTime = new Date();
let currentHour = currentTime.getHours().toString().padStart(2, "0");
let currentMinute = currentTime.getMinutes().toString().padStart(2, "0");
let formattedTime = currentHour + currentMinute;
generateGreeting(formattedTime);
}


function generateGreeting(time) {
    let greeting = [];
    if (time >= 0600 && time < 1200) {
        greeting.push('Good morning');
    }
    else if (time >= 1200 && time < 1800) {
        greeting.push('Good day');
    }
    else if (time >= 1800 && time < 2400) {
        greeting.push('Good evening');
    }
    else if (time >= 0000 && time < 0600) {
        greeting.push('Good night');
    }
    let greet = greeting[0];
    console.log(time, greet);
    document.getElementById('sum_daytime').innerHTML = `${greet},`;
    document.getElementById('sum_daytime_mobile').innerHTML = `${greet},`;
}


function NoMobileGreeting() {
    document.getElementsByClassName('sum_greeting_mobile').style = "display:none";
}


