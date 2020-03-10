function start() {

    let timing = new Date();
    const index = 'index.html';
    let path = location.pathname; // get the path for the page that calls the event.
    if (path.includes(index)) {
        getTextsFromJson();
        setLogoInHeader();
        setBackgroundImagePage();
        let texts = document.getElementById('text-type');
        texts.onchange = getChosenText;
    }
}


/**
 * ref1 : https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 * ref 2: https://stackoverflow.com/a/22076667
 * */
function getTextsFromJson() {

    let urlJsonTexts = 'JSON/texts.json';
    if (sessionStorage.texts === undefined) {

        var client = new HttpClient();
        client.get(urlJsonTexts, function (response) {

            sessionStorage.texts = response;
            createDropMenuChooseTexts();
        });
    } else {

        createDropMenuChooseTexts();

    }
}

/**
 * Global const call for a GET*/
var HttpClient = function () {
    this.get = function (aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function () {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)

                aCallback(anHttpRequest.responseText);
        };

        anHttpRequest.open("GET", aUrl, true);
        anHttpRequest.send(null);
    }
};

function createDropMenuChooseTexts() {

    let texts = JSON.parse(sessionStorage.texts);
    let chooseText = document.getElementById('choose-text-id'),
        select = document.getElementById('text-type');
    let setOptionValue = 0, option;

    let label = document.createElement('LABEL');
    label.setAttribute('for', 'text-type');
    label.textContent = 'Choose Text:';
    chooseText.appendChild(label);

    texts.forEach(text => {

        option = document.createElement('option'); // will loop through texts and add option for each
        option.setAttribute('value', setOptionValue.toString());
        option.text = text.title;
        // option.addEventListener('onchange', getChosenText);
        // option.onchange = getChosenText;
        select.appendChild(option);
        setOptionValue++;
    });

    chooseText.appendChild(select);
    createInputElement();
}

function createInputElement() {
    let sectionTypeHere = document.getElementById('type-here');
    let form = document.createElement('FORM');
    form.setAttribute('id', 'input-text');
    form.setAttribute('action', '#');

    let inputElement = document.createElement('INPUT');
    inputElement.placeholder = 'Type here..';
    inputElement.setAttribute('id', 'text-value');
    inputElement.setAttribute('type', 'text');
    inputElement.disabled = true;

    form.appendChild(inputElement);
    sectionTypeHere.appendChild(form);
    let div = document.createElement('DIV');
    div.classList.add('wrapper-game-buttons');


    let inputBtnStart = document.createElement('INPUT');
    inputBtnStart.setAttribute('type', 'image');
    inputBtnStart.setAttribute('id', 'game-button');
    inputBtnStart.setAttribute('src', 'img/start-button.svg');
    inputBtnStart.setAttribute('alt', 'start');

    inputBtnStart.addEventListener('click', playFingerFight, false);

    div.appendChild(inputBtnStart);
    sectionTypeHere.appendChild(div);


    sectionTypeHere.appendChild(createElementStatistics());
}

function createElementStatistics() {

    let section = document.createElement('SECTION');
    section.setAttribute('id', 'statistics');
    let arr = ['Gross WPM:', 'Net WPM: ', 'Accuracy: ', 'Errors: '];
    let statElementId = ['gross-wpm-value', 'net-wpm-value', 'accuracy-value', 'errors-value'];
    for (let i = 0; i < 4; i++) {

        let div = document.createElement('DIV');
        let paragraph = document.createElement('P');
        paragraph.classList.add('label');
        paragraph.innerText = arr[i];
        div.appendChild(paragraph);
        paragraph = document.createElement('P');
        paragraph.classList.add('value');
        paragraph.setAttribute('id', statElementId[i]);

        div.appendChild(paragraph);
        section.appendChild(div);

    }

    return section;
}

function getChosenText(e) {


    let texts = JSON.parse(sessionStorage.texts);

    let textContent = document.getElementById('text-content-id'),//<section> element

        selectedIndex = e.target.options.selectedIndex - 1,// removes for the hard coded <option> in index.html
        contentTitle, contentAuthor, textWords = 0, textChars = 0;
    textContent.innerHTML = ''; // Removes all children from paragraph.
    let selectedObject = texts[selectedIndex];

    let paragraph = document.createElement('P');

    paragraph.classList.add('text-content');

    contentTitle = document.createElement('H3');
    contentTitle.classList.add('text-content-title');
    contentTitle.innerText = selectedObject.title;

    paragraph.appendChild(contentTitle);

    contentAuthor = document.createElement('P');
    contentAuthor.classList.add('text-content-author');

    // Loop through the object counting words and chars adding to author element
    for (let i = 0; i < selectedObject.text.length; i++) {

        if (selectedObject.text[i] === ' ') {
            textWords++;
            textChars--; // Removes the whitespace character from counter.
        }
        textChars++;
    }
    let calcTexts = ' (' + textWords + ' words' + ', ' + textChars + ' chars)';

    contentAuthor.innerText = "Författare: " + selectedObject.author + calcTexts;
    paragraph.appendChild(contentAuthor);
    let audio = document.createElement('AUDIO');
    audio.id = 'audio';
    audio.src = 'http://www.soundjay.com/button/beep-07.wav';
    audio.autostart = 'false';

//Puts all chars in <span> and adding classes
    for (let i = 0; i < selectedObject.text.length; i++) {
        let elementSpan = document.createElement('SPAN');

        elementSpan.classList.add('text-char');
        elementSpan.classList.add('inactive');
        elementSpan.innerText = selectedObject.text[i];

        paragraph.appendChild(elementSpan);
    }
    paragraph.appendChild(audio);

    textContent.appendChild(paragraph);
}

function playFingerFight(event) {
    let inputElement = document.getElementById('text-value');
    let textElements = document.querySelectorAll('.text-char');
    let errors = 0, correctChars = 0, accuracy, currentChars = 0,
        startTime, time = new Date(), elapsedMin, diffMillisec, grossWPM, netWPM;
    let typedChars = 0, ignoreCase = document.getElementById('ignore-case').checked,
        button = document.getElementById('game-button');

    button.onclick = endGame;
    event.preventDefault();

    let image = event.target.getAttribute('alt');
    image === 'start' ? startGame() : endGame(); // either start och stop the game

    function startGame() {
        event.target.setAttribute('src', 'img/stop-button.svg');
        event.target.setAttribute('alt', 'stop');
        startTime = time.getTime();
        inputElement.disabled = false;
        textElements[typedChars].setAttribute('class', 'active');// highlights first letter
        inputElement.focus();

        document.getElementById('gross-wpm-value').innerText = '';
        document.getElementById('net-wpm-value').innerText = '';
        document.getElementById('accuracy-value').innerText = '';
        document.getElementById('errors-value').innerText = '';
    }

    function endGame() {
        event.target.setAttribute('src', 'img/start-button.svg');
        event.target.setAttribute('alt', 'start');
        inputElement.disabled = true;
    }

    function calculateStat() {

        accuracy = ((correctChars / typedChars) * 100);

        if (elapsedMin >= 1) {
            grossWPM = Math.ceil((typedChars / 5) / elapsedMin);
            netWPM = Math.ceil(grossWPM - (errors / 60));
            document.getElementById('gross-wpm-value').innerText = grossWPM;
            document.getElementById('net-wpm-value').innerText = netWPM;
        }
        document.getElementById('errors-value').innerText = errors.toString();
        document.getElementById('accuracy-value').innerText = accuracy.toFixed(2) + ' %';
    }

    function getInputValue(e) {

        if (textElements[typedChars].innerText === e.target.value[currentChars]) {
            textElements[typedChars].classList.add('done');
            textElements[typedChars].classList.remove('active');
            correctChars++;
            currentChars++;


        } else {
            let sound = document.getElementById("audio");
            sound.play();
            textElements[typedChars].classList.add('fail');
            textElements[typedChars].classList.remove('active');
            errors++;
            currentChars++;

        }
        textElements[typedChars].classList.add('inactive');
        textElements[typedChars + 1].classList.remove('inactive');
        textElements[typedChars + 1].classList.add('active');
        typedChars++;

        if (e.target.value[currentChars - 1] === ' ') { // subtract the added value above to check iff textbox value is whitespace.
            document.getElementById('text-value').value = '';
            currentChars = 0;

            diffMillisec = Date.now() - new Date(startTime).getTime();// Diff  between now and set time
            elapsedMin = Math.floor(diffMillisec / 60000);// Calculates elapsedMin from difffMillisec
            calculateStat();
        }
    }

    inputElement.oninput = getInputValue;
}

function setLogoInHeader() {
    document.getElementById('label-logo').style.content = "url('img/computer-144980_1280.png')";
}

function setBackgroundImagePage() {
    document.getElementById("page-container").style.backgroundImage = "url('img/elegant-white-background-with-shiny-lines.jpg')";
}

window.addEventListener('load', start, false);