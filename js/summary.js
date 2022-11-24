function SumTodoChangeImage(img) {
    document.getElementById('sum_todo_img').src = img;
}


function SumDoneChangeImage(img) {
    document.getElementById('sum_done_img').src = img;
}


async function getDaytime() {
    let url = 'https://worldtimeapi.org/api/timezone/Europe/Berlin';
    let response = await fetch(url);
    let responseJSON = await response.json();
    let datetime = responseJSON['datetime'];
    let hour = datetime.slice(11,13);
    let minute = datetime.slice(14,16);
    let time = hour + minute;
    generateGreeting(time);
}


function generateGreeting(time) {
    let greeting = [];
    if (time > 1200 && time < 1800) {
        greeting.push('Good day');
    }
    else if (time > 1800 && time < 2400) {
        greeting.push('Good evening');
    }
    else if (time > 0000 && time < 1200) {
        greeting.push('Good morning');
    }
    let greet = greeting[0];
    console.log(greet);
    document.getElementById('sum_daytime').innerHTML = `${greet},`;
    document.getElementById('sum_daytime_mobile').innerHTML = `${greet},`;
}


function NoMobileGreeting() {
    // document.getElementById('sum_greeting_mobile').style.display = "none";
    document.getElementsByClassName('sum_greeting_mobile').style = "display:none";
}





