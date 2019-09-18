import {ToastBuilder} from "./ToastBuilder.js";

const toastButtons = document.getElementsByName('toast-button');
const toastInput = document.getElementById('toast-text');

const toastBuilder = new ToastBuilder();

const displayToast = (event) => {
    const type = event.target.dataset.type;
    toastBuilder[type](toastInput.value);
};

toastButtons.forEach(button =>
    button.addEventListener('click', displayToast)
);