const TOAST_TYPE = {
    info: 'INFO',
    success: 'SUCCESS',
    error: 'ERROR'
};

const TOAST_DISMISS_TIME = 5 * 1000;

export class ToastBuilder {
    constructor() {
        this.toastContainer = document.createElement('div');
        this.toastContainer.className = 'toast-container';

        document.body.appendChild(this.toastContainer);
    }

    info = (text) => {
        this.displayToast(text, TOAST_TYPE.info);
    };

    error = (text) => {
        this.displayToast(text, TOAST_TYPE.error);
    };

    success = (text) => {
        this.displayToast(text, TOAST_TYPE.success);
    };

    displayToast = (text, type) => {
        const toast = document.createElement('div');
        toast.className = `toast ${type.toLowerCase()}`;
        toast.textContent = text;

        this.toastContainer.appendChild(toast);
        setTimeout(() => this.hideToast(toast),
            TOAST_DISMISS_TIME)
    };

    hideToast = (toast) => {
        toast.remove();
    };
}