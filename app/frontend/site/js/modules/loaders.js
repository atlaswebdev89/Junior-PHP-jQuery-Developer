const mainLoader = document.querySelector('.loading')
const formLoader = document.querySelector('.data-loading')

const openLoader = () => {
    mainLoader.classList.add('load')
    formLoader.classList.add('loading')
}
const closeLoader = () => {
    mainLoader.classList.remove('load')
    formLoader.classList.remove('loading')
}

export { openLoader, closeLoader }
