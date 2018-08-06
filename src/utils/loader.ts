export function Loader(show: boolean) {
    let loader = document.querySelector<HTMLDivElement>(".overlay");
    if (loader) {
        if (show === true) {
            loader.classList.remove('d-none');
        } else {
            loader.classList.add('d-none');
        }
    } else {
    }
}