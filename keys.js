// class KeyObj {
//     constructor(eventKey, eventLocation, eventWhich, eventCode) {
//         this.key = eventKey;
//         this.location = eventLocation;
//         this.which = eventWhich;
//         this.code = eventCode;
//     }
// }

// let newKey = new KeyObj(
//     e.target.innerText, // eventKey
//     e.target.innerText.charCodeAt(0), 
//     e.target.eventWhich, 
//     e.target.eventCode
//     )

let selectedKeys = [];
let shift = false;
console.log("onload shift is: " + shift)
let preventKeys = true;
document.addEventListener('DOMContentLoaded', addEventListnerToKeys);
function toggleClickedKey(e) {
    let testValue = e.target.getAttribute('data-k');
    console.log(shift)
    if(shift === true) {
        if(testValue === "shift") {
            shift = false;
            keyValue = e.target.getAttribute('data-k');
            console.log("shift was true and is now false: " + shift +" , testValue: " + testValue)
        } else {
            keyValue = e.target.getAttribute('data-shift-k');
            console.log("shift was true and is still true: " + shift +" , testValue: " + testValue + " , keyValue should be uppercase: " + keyValue )
        }
    } else if(shift === false) {
        if(testValue === "shift") {
            shift = true
            keyValue = e.target.getAttribute('data-shift-k');
            console.log("shift was clicked and is now true: " + shift + " , testValue: " + testValue + " , keyValue: " + keyValue)
        } else {
            keyValue = e.target.getAttribute('data-k');
            console.log("shift is false: " + shift + " , testValue: " + testValue + " , keyValue: " + keyValue)
        }       
    }
    if(selectedKeys.indexOf(keyValue) > -1) {
        removeKeyFromSelectedKeysList(keyValue);
    } else {
        addKeyToSelectedKeysList(keyValue);
    }
    console.log(keyValue)
    if(e.target.classList.contains('upperSelected') || e.target.classList.contains('lowerSelected')){
        removeSelectedClassFromKey(e)
        console.log(selectedKeys)
    } else {
        addSelectedClassToKey(e)
        console.log(selectedKeys);
    }
    toggleResetButton()
}

function addSelectedClassToKey(e){
    if(shift) {
        e.target.classList.add('upperSelected');
    } else {
        e.target.classList.add('lowerSelected');
    }
    
}
function removeSelectedClassFromKey(e){
    if(shift){
        e.target.classList.remove('upperSelected')
    } else {
        e.target.classList.remove('lowerSelected')
    }
}
function addKeyToSelectedKeysList(keyValue){
    selectedKeys.push(keyValue);
    document.getElementById('preview').innerHTML = selectedKeys.toString()
}
function removeKeyFromSelectedKeysList(keyValue){
    index = selectedKeys.indexOf(keyValue)
    if(index > -1) {
        selectedKeys.splice(index,1)
    }
    document.getElementById('preview').innerHTML = selectedKeys.toString()
}
function toggleResetButton(){
    if(selectedKeys.length === 0) {
        document.getElementById('resetKeyboard').classList.add('disabled')
    } else {
        document.getElementById('resetKeyboard').classList.remove('disabled')
    }
}
function addEventListnerToKeys() {
    let keys = Array.from(document.querySelectorAll('.key'));
    keys.forEach(key => key.addEventListener('click', toggleClickedKey))
    document.getElementById('testInput').addEventListener('keydown', function(e){
        if(selectedKeys.includes(e.key)){
            e.preventDefault();
        };
    });
};
function resetKeyboard(keys){
    keys = Array.from(document.querySelectorAll('.key'));
    keys.forEach(key => key.classList.remove('upperSelected'));
    keys.forEach(key => key.classList.remove('lowerSelected'));
    document.getElementById('resetKeyboard').classList.add('disabled')
    document.getElementById('testInput').value = ""
    selectedKeys = []
    console.log(selectedKeys)
}

