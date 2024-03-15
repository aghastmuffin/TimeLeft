window.addEventListener('load', function () {
    const cookies = getCookies();
    if (!cookies.age) {
        generateAgeInputForm();
    } else {
        const age = new Date(cookies.age);
        const endDate = new Date(age.getFullYear() + 77, age.getMonth(), age.getDate(), 12, 59, 59).getTime();
        startCountdown(endDate);
    }
});

function getCookies() {
    const pairs = document.cookie.split(";");
    const cookies = {};
    for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i].split("=");
        cookies[(pair[0].trim())] = decodeURIComponent(pair.slice(1).join('='));
    }
    return cookies;
}

function generateAgeInputForm() {
    const div = document.createElement('div');
    div.id = 'askage';

    const tt = document.createElement('tt');
    tt.textContent = "Your age wasn't found!";
    tt.style.color = 'white';
    div.appendChild(tt);

    div.appendChild(document.createElement('br'));

    const label = document.createElement('label');
    label.setAttribute('for', 'age');
    label.textContent = 'Enter Age';
    div.appendChild(label);

    div.appendChild(document.createElement('br'));

    const input = document.createElement('input');
    input.id = 'age';
    input.type = 'date';
    input.placeholder = '1';
    div.appendChild(input);

    div.appendChild(document.createElement('br'));

    const button = document.createElement('button');
    button.textContent = '✓';
    button.onclick = function(event) {
        submitage(event);
    };
    div.appendChild(button);

    document.body.appendChild(div);
}

function submitage() {
    const ageInput = document.getElementById("age");
    if (!ageInput.value) {
        alert("Please enter your age.");
        return;
    }
    const age = new Date(ageInput.value);
    const endDate = new Date(age.getFullYear() + 77, age.getMonth(), age.getDate(), 12, 59, 59).getTime();
    startCountdown(endDate);
    console.log(endDate);
    const divage = document.getElementById("askage");
    divage.innerHTML = "";
    divage.remove();
    document.cookie = "age=" + age.toUTCString() + ";";
}

function startCountdown(endDate) {
    let countdownInterval = setInterval(function() {
        let now = new Date().getTime();
        let distance = endDate - now;
        let distanceInSeconds = Math.round(distance / 1000);

        document.getElementById("sec").textContent = distanceInSeconds + "s";

        if (distance < 0) {
            clearInterval(countdownInterval);
            console.log("Countdown finished");
        }
    }, 1000);
}
