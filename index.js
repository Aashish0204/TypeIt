
import words from './words.json' assert { type: "json" };   //Importing the words list from word.json

var wordsArr = words['words'];  //Inserting the words list in the array wordsArr
var totalWords = Math.floor(Math.random() * 20 + 5) //randomly picking number of words to be displayed with min 5 and max 20
var displayTxt = ""

function rightTyped(len, ogLength) {
    //triggered when typed right letter
    //update the value in done id span and atLetter id span and toWrite id span
    document.getElementById('done').innerHTML = displayTxt.slice(0, len)
    document.getElementById('atLetter').innerHTML = displayTxt.slice(len, len + 1)
    document.getElementById('toWrite').innerHTML = displayTxt.slice(len + 1, ogLength)
}

function wrongTyped(len) {
    //triggered when typed wrong letter
    //changes the border color and outline color of input area and add a class redit to make that letter red in atLetter id span
    document.getElementById('text').style.border = '2px solid red'
    document.getElementById('text').style.outline = '2px solid red'
    document.getElementById('atLetter').classList.add('redIt')
}

function resetAll() {
    document.getElementById('atLetter').innerHTML = '';
    try {
        document.getElementById('done').innerHTML = '';
    } catch (error) {
        console.log('first time')
    }
    document.getElementById('toWrite').innerHTM = '';
    document.querySelector('input').value = '';
    displayTxt = ''
    document.querySelector('input').disabled = true
    document.getElementById('playBtn').style.display = 'none';
    document.getElementById('timer').innerHTML = 3;

}
var stopInterval = ''
function quitAll() {
    document.getElementById('playBtn').innerHTML = 'Play';
    clearInterval(stopInterval)
    document.getElementsByClassName('container')[0].style.display = 'none'
    resetAll()
    document.getElementById('playBtn').style.display = 'inline';
    document.getElementById('h2OfTimer').style.display = 'none';


}
document.getElementById('playBtn').addEventListener('click', (e) => { startPlaying() })
document.getElementById('quitBtn').addEventListener('click', (e) => { quitAll() })


function startPlaying() {
    resetAll()

    var totalWords = Math.floor(Math.random() * 20 + 5) //randomly picking number of words to be displayed with min 5 and max 20
    document.getElementsByClassName('container')[0].style.display = 'block'
    //This for loop makes a string full of words combination in displayTxt
    for (let i = 0; i < totalWords; i++) {
        i == 0 ? displayTxt = displayTxt + (wordsArr[Math.floor(Math.random() * wordsArr.length)]) :
            displayTxt = displayTxt + " " + (wordsArr[Math.floor(Math.random() * wordsArr.length)]);
    }
    document.getElementById('atLetter').innerHTML = displayTxt.slice(0, 1);//putting value of first letter of string to atLetter id span
    document.getElementById('toWrite').innerHTML = displayTxt.slice(1, displayTxt.length);//putting rest of the values of string to toWrite id span
    var ogLength = displayTxt.length    //taking the length of string

    document.getElementById('h2OfTimer').style.display = 'inline';
    var timerClearInterval = setInterval(() => {
        document.getElementById('timer').innerHTML = parseInt(document.getElementById('timer').innerHTML) - 1
        if (parseInt(document.getElementById('timer').innerHTML) <= 0) {
            document.getElementById('h2OfTimer').style.display = 'none';
            clearInterval(timerClearInterval)
        }
    }, 1000);

    setTimeout(() => {
        var date = new Date()
        var startTime = date.getTime()
        console.log(startTime)

        document.querySelector('input').disabled = false
        document.querySelector('input').focus()
        //stopInterval will be used to stop the setInterval function
        var stopInterval = setInterval(() => {
            let len = document.querySelector('input').value.length   //storing the length of string entered in input box
            let inputtedText = document.querySelector('input').value    //storing the values entered in input box
            let inputCall = document.getElementById('text')     //storing the input element for future use
            let temptxt = displayTxt.slice(0, len)      //storing the temp text for compairing with the required and typed text

            //checks if the entered string and required string matches completely and finished
            if (inputtedText == displayTxt) {
                var newdate = new Date()
                var endTime = newdate.getTime()
                console.log(endTime)
                rightTyped(len, ogLength)
                document.querySelector('input').disabled = true
                clearInterval(stopInterval)
                document.getElementById('playBtn').style.display = 'inline';
                if (inputtedText.length == 0) {
                    document.getElementById('playBtn').innerHTML = 'Play';
                }
                else {
                    document.getElementById('playBtn').innerHTML = 'Replay';
                    alert(getTime(startTime, endTime, totalWords))
                    console.log("Done")
                }
            }
            //checks if the entered string yet and required string is matching or not ie. typed correctly or not
            else if (inputtedText == temptxt) {
                //tries to remove redit if already class redit is present as now it is correct
                try {
                    document.getElementById('atLetter').classList.remove('redIt')
                } catch (error) {
                    console.log('no redit')
                }
                len != 0
                    ? (inputCall.style.border = '2px solid green')
                    : inputCall.style.border = 'none'
                inputCall.style.outline = 'none';
                rightTyped(len, ogLength)
            }
            //checks if entered string is wrong
            else if (inputtedText != temptxt) {
                wrongTyped(len)
            }
        }, 10);
    }, 3000);
}

function getTime(startTime, endTime, totalWords) {
    var diff = (endTime - startTime) / 1000
    diff = diff / 60
    var time = 1 / diff;
    return ((Math.round(totalWords * time)).toString() + "wpm")

}