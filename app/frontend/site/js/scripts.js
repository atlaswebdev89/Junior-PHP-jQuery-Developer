const navSearch = document.querySelector('.nav-search')
const overlay = document.querySelector('.overlay')
const body = document.querySelector('body')
const close = document.querySelector('.close-aside')
const aside = document.querySelector('.aside')
const notScroll = 'body-overlay'
const openOverlay = 'overlay-open'
const items = [navSearch, overlay, close]

for (const item of items) {
    item.addEventListener('click', (event) => {
        if (navSearch.classList.contains('open')) {
            navSearch.classList.remove('open')
            body.classList.remove(notScroll)
            overlay.classList.remove(openOverlay)
            aside.classList.remove('open-aside')
        } else {
            navSearch.classList.add('open')
            body.classList.add(notScroll)
            overlay.classList.add(openOverlay)
            aside.classList.add('open-aside')
        }
    })
}

jQuery.noConflict()
;(function ($) {
    $(function () {
        /* код на jQuery */
        // ...
    })
})(jQuery)
