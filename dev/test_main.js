function start() {

    const index = 'test_index.html';
    let path = location.pathname; // get the path for the page that calls the event.
    if (path.includes(index)) {
        getTextsFromJson();
        setLogoInHeader();
        setBackgroundImagePage();

    }
    debugger
    let texts = document.getElementById('text-type');
    // let op = document.getElementById('text-type').options;
    texts.onchange = getChosenText;


}

/**
 * ref1 : https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 * ref 2: https://stackoverflow.com/a/22076667
 * */
function getTextsFromJson() {

    let urlJsonTexts = 'JSON/texts.json';
    debugger
    var client = new HttpClient();
    if (sessionStorage.texts == null) {

        client.get(urlJsonTexts, function (response) {
            sessionStorage.texts = response;
        });
    }
    createDropMenuChooseTexts();
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
    let setOptionValue = 1;
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
    inputElement.addEventListener('keyup', inputEvent => {
        getInputValue(inputEvent);
    });
    form.appendChild(inputElement);

}

function getChosenText(e) { // TODO Check if works when drop menu created

    let texts = JSON.parse(sessionStorage.texts);
    let test = texts[e.target.options.selectedIndex];
    console.log(test);
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

    console.log(e.target.options.selectedIndex);

    for (let i = 0; i < test.text.length; i++) {
        let elementSpan = document.createElement('SPAN');

        elementSpan.innerText = test.text[i];
        document.getElementById('text-to-check-against').appendChild(elementSpan);
    }

    debugger

}

function getInputValue(keyUpEvent) {
    // TODO How to ??
    let typedString = '';
    let controlString = document.getElementById('text-to-check-against').innerText;
    let writtenChars = 0;


    debugger;
    // typedString += keyUpEvent.key;
    if (controlString[writtenChars] === keyUpEvent.key) {
        let test = controlString[writtenChars];
        let fuck = +document.getElementById('text-value').value;
        document.getElementById('text-value').value = typedString;
    }
    if (controlString[writtenChars] === " ") {
        document.getElementById('text-value').value = null;
        typedString = '';
    }
    writtenChars++;

}

function setLogoInHeader() {
    document.getElementById('label-logo').style.content = "url('computer-144980_1280.png')";
}

function setBackgroundImagePage() {
    document.getElementById("page-container").style.backgroundImage = "url('elegant-white-background-with-shiny-lines.jpg')";
}

window.addEventListener('load', start, false);