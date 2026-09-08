function createLabel(labelText, htmlFor){
    let label = document.createElement("label");
    label.textContent = labelText;
    label.htmlFor = htmlFor;
    return label;
}

function createInput(inputId, inputType){
    let input = document.createElement("input");
    input.id = inputId;
    input.type = inputType;
    return input;
}

function createLabelInputPair(labelText, inputId, inputType){
    return [
        createLabel(labelText, inputId), 
        createInput(inputId, inputType)
    ]
}

function createButton(text, buttonID){
    let button = document.createElement("button");
    button.textContent = text;
    button.id = buttonID;
    return button;
}

export {
    createLabelInputPair, 
    createButton
}