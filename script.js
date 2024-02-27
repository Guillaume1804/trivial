let current = 8;

const quest = document.getElementById("question");
const answers = document.getElementById("answers");
const submit = document.getElementById("submit");
const main = document.getElementsByTagName("main");
const nxtBtn = document.getElementById("nxtBtn");
const tryBtn = document.getElementById("tryBtn")
const pit = document.getElementsByClassName("pit");
const pot = document.getElementsByClassName("pot");

async function trivApi() {
    const response = await fetch('data.json');
    const resJSON = await response.json();

    if (current > 9) {
        console.log("fils de pute")
        pot.innerHTML = `
            <p>YOU WIN</p>
        `;
        
        pit.style.display = "none";

        return;
    };

    afficheQuestion(resJSON)

    submit.addEventListener("click", (e) => {
        
        let reponse = document.getElementsByName(`answer`);

        let valeur;
        for(let i = 0; i < reponse.length; i++){
            if(reponse[i].checked){
            valeur = reponse[i];
            }
        }
        
        if (valeur.value == resJSON[current].correctAnswer) {
            submit.innerHTML = ``
            tryBtn.innerHTML = ``
            nxtBtn.innerHTML = `
                <button onclick="displayNext()">Next</button>
            `;
            valeur.parentElement.classList.add("correct");
        }
        else {
            submit.innerHTML = ``
            nxtBtn.innerHTML = ``
            tryBtn.innerHTML = `
                <button onclick="tryAgain()">Try Again</button>
            `;
            valeur.parentElement.classList.add("false");

        }
    })
}

trivApi()

function afficheQuestion(data) {
    quest.innerHTML = `
        <p>${data[current].question}</p>
    `
    answers.innerHTML = ``
    data[current].answer.forEach(element => {
        answers.innerHTML += `
        <div class="radioContainer">
            <input id="${element}" type="radio" name="answer" value="${element}">
            <label for="${element}">${element}</label>
        </div>
        `
    });
    submit.innerHTML = `
        <button id="submitBtn" onclick="">Submit</button>
    `
}

function displayNext() {
    nxtBtn.innerHTML = ``
    tryBtn.innerHTML = ``
    current++;
    trivApi();
}

function tryAgain() {
    nxtBtn.innerHTML = ``
    tryBtn.innerHTML = ``
    current = 0;
    trivApi();
}