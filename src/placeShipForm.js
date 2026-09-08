import { createLabelInputPair, createButton } from "./formComponentFactories";
import placeShipButtonHandler from "./placeShipButtonHandler";

export default function createPlaceShipForm(playerName){
    let form = document.createElement("form");
    form.dataset.playerName = playerName.replaceAll(' ', '');

    const [startXLabel, startXInput] = createLabelInputPair(
        "Start X", `StartX_${form.dataset.playerName}`, "text"
    )

    const [startYLabel, startYInput] = createLabelInputPair(
        "Start Y", `StartY_${form.dataset.playerName}`, "text"
    )

    const [endXLabel, endXInput] = createLabelInputPair(
        "End X", `EndX_${form.dataset.playerName}`, "text"
    )

    const [endYLabel, endYInput] = createLabelInputPair(
        "End Y", `EndY_${form.dataset.playerName}`, "text"
    )

    const placeShipButton = createButton(
        "Place Ship", `PlaceShipButton_${form.dataset.playerName}`
    )

    // Add a handler to the submit ship button
    placeShipButton.addEventListener("click", placeShipButtonHandler);

    for (const element of [
        startXLabel, startXInput,
        startYLabel, startYInput,
        endXLabel, endXInput,
        endYLabel, endYInput,
        placeShipButton
    ]){
        form.appendChild(element);
    }

    return form;
}