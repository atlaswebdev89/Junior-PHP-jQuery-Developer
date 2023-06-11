const navSearch = document.querySelector('.nav-search')
const overlay = document.querySelector('.overlay')
const body = document.querySelector('body')
const close = document.querySelector('.close-aside')
const aside = document.querySelector('.aside')
const notScroll = 'body-overlay'
const openOverlay = 'overlay-open'

const openMenu = () => {
    navSearch.classList.add('open')
    body.classList.add(notScroll)
    overlay.classList.add(openOverlay)
    aside.classList.add('open-aside')
}

const closeMenu = () => {
    navSearch.classList.remove('open')
    body.classList.remove(notScroll)
    overlay.classList.remove(openOverlay)
    aside.classList.remove('open-aside')
}

const existOpenMenu = () => {
    if (aside.classList.contains('open')) {
        return true
    }
    return false
}

export { openMenu, closeMenu, existOpenMenu }
