export class loader {
    constructor() { }
    showloader(show) {
        let loader = document.querySelector(".overlay");
        if (show === true) {
            loader.classList.remove('d-none');
        } else {
            loader.classList.add('d-none');
        }
    }
}