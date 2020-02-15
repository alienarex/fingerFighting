function start() {

    const index = 'test_index.html';
    let path = location.pathname; // get the path for the page that calls the event.
    if (path.includes(index)) {
        getTextsFromJson();
        setLogoInHeader();
        setBackgroundImagePage();

    }
    let texts = document.getElementById('text-type');
    texts.onchange = getChosenText;
}


/**
 * ref1 : https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 * ref 2: https://stackoverflow.com/a/22076667
 * */
function getTextsFromJson() {

    let urlJsonTexts = 'JSON/texts.json';

    if (sessionStorage.texts == null) {

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
    let chooseText = document.getElementById('choose-text-id');
    let setOptionValue = 0;

    let label = document.createElement('LABEL');
    label.setAttribute('for', 'text-type');
    label.textContent = 'Choose Text:';
    chooseText.appendChild(label);
    debugger
    let select = document.createElement('SELECT');
    select.setAttribute('name', 'text-type');
    select.setAttribute('id', 'text-type');

    texts.forEach(text => {

        let option = document.createElement('option'); // will loop through texts and add option for each
        option.setAttribute('value', setOptionValue.toString());
        option.text = text.title;
        option.addEventListener('change', getChosenText);
        select.appendChild(option);
        setOptionValue++;
    });

    chooseText.appendChild(select);
    createInputElement();
}

function createInputElement() {
    let form = document.getElementById('input-text');
    let inputElement = document.createElement('INPUT');
    inputElement.setAttribute('id', 'text-value');
    inputElement.setAttribute('type', 'text');

    form.appendChild(inputElement);
    let div = document.createElement('DIV');
    div.classList.add('wrapper-game-buttons');


    //TODO refactor so that image switches when clicked!
    let inputBtnStart = document.createElement('INPUT');
    inputBtnStart.setAttribute('type', 'image');
    inputBtnStart.setAttribute('id', 'start-button');
    inputBtnStart.setAttribute('src', '../img/start-button.svg');
    inputBtnStart.setAttribute('alt', 'start'); // TODO use data-attribute to change values
    inputBtnStart.addEventListener('click', event => {
// Code for timing
    });


    div.appendChild(inputBtnStart);
    // inputBtnStop.setAttribute('src', '../img/stop-button.svg');

    form.appendChild(div);

    // <div class="wrapper-game-buttons">
//         <input class="game-button" id="start-button" type="image" src="../img/start-button.svg" alt="start"/>
//         <input class=game-button" id="stop-button" type="image" src="../img/stop-button.svg" alt="stop"/>
//     </div>


}

function getChosenText(e) {

    let texts = JSON.parse(sessionStorage.texts);
    console.log(e.target.options.selectedIndex);
    let test1 = document.getElementById('text-type'),
        textContent = document.getElementById('text-content-id'),//<div> element

        selectedIndex = e.target.options.selectedIndex,
        // test1.options[test1.selectedIndex].value, // returns index of selected
        contentTitle, contentAuthor;

    let selectedObject = texts[selectedIndex];

    let paragraph = document.createElement('P');

    paragraph.classList.add('text-content');

    contentTitle = document.createElement('H3');
    contentTitle.classList.add('text-content-title');
    contentTitle.innerText = selectedObject.title;

    paragraph.appendChild(contentTitle);

    contentAuthor = document.createElement('P');
    contentAuthor.classList.add('text-content-author');
    contentAuthor.innerText = "Författare: " + selectedObject.author;
    paragraph.appendChild(contentAuthor);


    for (let i = 0; i < selectedObject.text.length; i++) {
        let elementSpan = document.createElement('SPAN');

        elementSpan.innerText = selectedObject.text[i];
        paragraph.appendChild(elementSpan);
    }

    debugger

    textContent.appendChild(paragraph);

    startFingerFight(selectedObject.text);
}


function startFingerFight(controlString) {
    debugger
    let inputElement = document.getElementById('text-value');
    let typedString = '';
    let writtenChars = 0, countWordsInControlString = 0, currentWords;


    function currentWordWritten() {

        document.getElementById('text-value').value = typedString;// under DEV. Create some kind of substring to print in textbox

    }

    function removeWrittenWordFromTextbox() {

    }


    function getInputValue(keyUpEvent) {
        // TODO How to ??

        typedString += keyUpEvent.key;
        debugger
        document.getElementById('text-value').value = typedString;

        if (controlString[writtenChars] === ' ') {

            typedString = "";
        }

        if (controlString[writtenChars] === keyUpEvent.key) {
            console.log('Funkish!!');

        }
        writtenChars++;
    }

    inputElement.onkeyup = getInputValue;
    // document.addEventListener('keyup', getInputValue, false);

}

function setLogoInHeader() {
    document.getElementById('label-logo').style.content = "url('computer-144980_1280.png')";
}

function setBackgroundImagePage() {
    document.getElementById("page-container").style.backgroundImage = "url('elegant-white-background-with-shiny-lines.jpg')";
}

window.addEventListener('load', start, false);