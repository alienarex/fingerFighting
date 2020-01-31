function start() {

    const index = 'test_index.html';
    let path = location.pathname; // get the path for the page that calls the event.
    if (path.includes(index)) {
        getTextsFromJson();
        setLogoInHeader();
        setBackgroundImagePage();

    }
    let texts = document.getElementById('text-type');
    // let testar2 = texts.options[texts.selectedIndex].text;
    // let op = document.getElementById('text-type').options;
    // debugger
    texts.onchange = getChosenText;


}

/**
 * ref1 : https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 * ref 2: https://stackoverflow.com/a/22076667
 * */
function getTextsFromJson() {

    let urlJsonTexts = 'JSON/texts.json';
    debugger

    if (sessionStorage.texts == null) {

        var client = new HttpClient();
        client.get(urlJsonTexts, function (response) {
            debugger
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
    debugger
    let label = document.createElement('LABEL');
    label.setAttribute('for', 'text-type');
    label.textContent = 'Choose Text:';
    chooseText.appendChild(label);

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
    //
    // inputElement.addEventListener('keyup', inputEvent => {
    //     getInputValue(inputEvent);
    // });

    form.appendChild(inputElement);

}

function getChosenText(e) { // TODO Check if works when drop menu created
    debugger

    let test1 = document.getElementById('text-type');
    let selectedIndex = test1.options[test1.selectedIndex].value; // returns index of selected

    let texts = JSON.parse(sessionStorage.texts);
    let selectedObject = texts[selectedIndex];

    //
    // checkText = getTestString();
    // textHeader, textWriter;
    //
    // textHeader = document.createElement('H6');
    // textHeader.classList.add('text-header');
    // document.getElementById('text-content').appendChild(textHeader);
    // textWriter = document.createElement('P');
    // textWriter.classList.add('text-writer');
    // document.getElementById('text-content').appendChild(textWriter);


    for (let i = 0; i < selectedObject.text.length; i++) {
        let elementSpan = document.createElement('SPAN');

        elementSpan.innerText = selectedObject.text[i];
        document.getElementById('text-to-check-against').appendChild(elementSpan);
    }
    startFingerFight(selectedObject.text);
    return selectedObject.text;

}


function startFingerFight(controlString) {

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


    inputElement.addEventListener('keyup', getInputValue);

}

function setLogoInHeader() {
    document.getElementById('label-logo').style.content = "url('computer-144980_1280.png')";
}

function setBackgroundImagePage() {
    document.getElementById("page-container").style.backgroundImage = "url('elegant-white-background-with-shiny-lines.jpg')";
}

window.addEventListener('load', start, false);