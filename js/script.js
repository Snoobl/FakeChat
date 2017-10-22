//Only execute code once pages has loaded
window.onload = function () {

    //Find inputs on the page
    const inputChatBoxes = findInputs("chatinput", 3);
    const inputNameBoxes = findInputs("nameinput", 3);
    const checkBoxFanPacks = findInputs("check-fanpack", 3);
    const redRadioButtons = findInputs("team-red", 3);
    const blueRadioButtons = findInputs("team-blue", 3);
    const allChats = findInputs("allchat", 3);
    const teamChats = findInputs("teamchat", 3);
    const bgList = [
        "img/bg-1.jpg",
        "img/bg-1.jpg",
        "img/bg-2.jpg",
        "img/bg-3.jpg",
        "img/bg-4.jpg",
        "img/bg-5.jpg"
    ];

    //Bind events to found inputs
    bindChatInputsToKeyEvents(inputChatBoxes, "chatmessage");
    bindChatInputsToKeyEvents(inputNameBoxes, "name");
    bindBoxToggles(checkBoxFanPacks, "chatmessage", "fanpack");
    bindBoxToggles(redRadioButtons, "name", "blue", classToggle, "red");
    bindBoxToggles(blueRadioButtons, "name", "red", classToggle, "blue");
    bindChatModeEvents(allChats, "chatmode", "[ALL] ", "[TEAM] ");
    bindChatModeEvents(teamChats, "chatmode", "[TEAM] ", "[ALL] ");
    bgSelect();

}

// of an input to find, and how many to find. So in the format chatinput1, id is
// chatinput which it appends i onto for the complete id.
function findInputs(id, count) {
    const inputs = [];
    for (let i = 1; i <= count; i++) {
        const input = document.getElementById(`${id}${i}`);
        if (input) {
            inputs.push(input);
        }
    }
    return inputs;
}
// Accepts an array of elements and an elementID of which it needs to change,
// using i as the iterator again.
function bindChatInputsToKeyEvents(inputBoxes, elementID) {
    inputBoxes.forEach((box, i) => {
        box.onkeyup = () => document
            .getElementById(`${elementID}${i + 1}`)
            .innerHTML = box.value;
    });
}
// Accepts an array of checkbox elements, which it then puts the event handler
// to toggle a specified class name which is also passed.
function bindBoxToggles(checkBoxes, input, className, extraFunc, extraClassName) {
    checkBoxes.forEach((box, i) => {
        box.onchange = classToggle(`${input}${i + 1}`, className, extraFunc
            ? extraFunc(`${input}${i + 1}`, extraClassName)
            : 0);
    });
}

// function bindBoxToggles(boxes, elementToChangeID, funcToCall) A function to
// pass to other functions, accepts the element name (input) of what to find,
// and toggles a specific class. and then calls another function if provided.
function classToggle(input, className, next) {
    return (() => {
        document
            .getElementById(input)
            .classList
            .toggle(className);
        if (next) 
            next();
        }
    );
}
//Add event onto bgselector
function bgSelect() {
    document
        .getElementById("bg-select")
        .onchange = () => {
        const selectedBG = parseInt(document.getElementById("bg-select").value);
        document
            .getElementById("bg")
            .src = bgList[selectedBG];
    }
}
//Bind click events onto team chat modes/all chat modes
function bindChatModeEvents(chatBoxes, elementIDToChange, text1, text2) {
    chatBoxes.forEach((box, i) => {
        box.onclick = () => {
            const elementToChange = document.getElementById(`${elementIDToChange}${i + 1}`)
            if (box.checked) {
                elementToChange.innerHTML = text1;
            } else {
                elementToChange.innerHTML = text2;
            }
        }
    });
}