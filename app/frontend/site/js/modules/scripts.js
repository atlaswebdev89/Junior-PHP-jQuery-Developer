// Стили для приложения
import '../../css/style.scss'
const jQuery = require('jquery')

const navSearch = document.querySelector('.nav-search')
const overlay = document.querySelector('.overlay')
const body = document.querySelector('body')
const close = document.querySelector('.close-aside')
const aside = document.querySelector('.aside')
const notScroll = 'body-overlay'
const openOverlay = 'overlay-open'
const mainLoader = document.querySelector('.loading')
const formLoader = document.querySelector('.data-loading')
const items = [navSearch, overlay, close]
const defaultPhoto = 'images/houses.jpeg'

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

const openLoader = () => {
    mainLoader.classList.add('load')
    formLoader.classList.add('loading')
}
const closeLoader = () => {
    mainLoader.classList.remove('load')
    formLoader.classList.remove('loading')
}

for (const item of items) {
    item.addEventListener('click', (event) => {
        if (navSearch.classList.contains('open')) {
            closeMenu()
        } else {
            openMenu()
        }
    })
}

const form = document.querySelector('#search_houses')
Array.from(form).forEach((element) => {
    const placeholders = element.placeholder
    element.addEventListener('focus', (event) => {
        element.placeholder = ''
    })
    element.addEventListener('blur', (event) => {
        element.placeholder = placeholders
    })
})

const createListHouses = (jsonData) => {
    const main = document.querySelector('.main')
    main.querySelectorAll('.item-house').forEach(function (elem) {
        elem.remove()
    })

    if (jsonData.length === 0) {
        const article = document.createElement('article')
        const title = document.createElement('h2')
        title.textContent = 'Not founds'
        article.classList.add('item-house')
        article.append(title)
        main.append(article)
    } else {
        jsonData.forEach((element) => {
            const article = document.createElement('article')
            const div = document.createElement('div')
            const img = document.createElement('img')
            const title = document.createElement('h2')
            const price = document.createElement('p')
            const div3 = document.createElement('div')

            article.classList.add('item-house')
            div.classList.add('images-houses')
            element.Photo ? (img.src = element.Photo) : (img.src = defaultPhoto)
            title.textContent = element.Name
            price.textContent = '$ ' + element.Price

            const div2 = document.createElement('div')
            const ul = document.createElement('ul')
            const li = document.createElement('li')
            const a = document.createElement('a')
            a.href = '#'
            div2.classList.add('description-house')
            ul.classList.add('list-value')
            a.textContent = 'More...'
            const rooms = element.Rooms
            for (const room in rooms) {
                const li = document.createElement('li')
                li.textContent = room + ':' + rooms[room]
                ul.append(li)
            }
            div3.append(title)
            div3.append(price)

            div2.append(ul)
            div2.append(a)
            div.append(img)
            article.append(div)
            article.append(div3)
            article.append(div2)
            main.append(article)
        })
    }
}

jQuery.noConflict()
;(function ($) {
    $(function () {
        // Simple validate
        const validate = (form) => {
            const errorValidate = $('<div></div>')
            const classErr = 'error-validate'

            let countError = 0
            let countEmpty = 0

            form.closest('form')
                .find('.' + classErr)
                .each(function () {
                    $(this).remove()
                })

            $('.form-message').text('')

            $.each(form, function () {
                if ($(this).val().length !== 0) {
                    countEmpty++
                    if ($(this).attr('type') === 'number') {
                        if (!Number.isInteger(Number($(this).val()))) {
                            $(this).after(errorValidate.addClass(classErr))
                            $('.error-validate').text(
                                'Please enter only number'
                            )
                            countError++
                        }
                    }
                    if ($(this).attr('type') === 'text') {
                        if (Number.isInteger(Number($(this).val()))) {
                            $(this).after(errorValidate.addClass(classErr))
                            $('.error-validate').text(
                                'Please enter don`t only number'
                            )
                            countError++
                        }
                    }
                }
            })

            if (countEmpty === 0) {
                $('.form-message').text('Please enter at least one field')
                countError++
            }
            return countError
        }

        $('#search_houses').on('submit', (event) => {
            event.preventDefault()

            const api = 'http://localhost:8118'
            const form = $(this)

            const outputMsg = (msg) => {
                form.find('.form-message').text(msg)
                setTimeout(function () {
                    $('.form-message').text('')
                }, 3000)
            }

            if (validate(form.find('input')) === 0) {
                let data = JSON.stringify(
                    $(this).find('input').serializeArray()
                )

                $.ajax({
                    type: 'POST',
                    url: api,
                    data: data,
                    processData: false,
                    contentType: 'application/json; charset=utf-8',
                    timeout: 5000,
                    dataType: 'json',
                    beforeSend: function (data) {
                        //Блокируем кнопку и элементы формы
                        form.find('button, input').attr('disabled', 'disabled')
                        openLoader()
                    },
                    success: function (data) {
                        //Включение кнопки и элементов формы
                        form.find('button,input').removeAttr('disabled')
                        closeLoader()

                        if (existOpenMenu) {
                            closeMenu()
                        }
                        createListHouses(data)
                    },
                    error: function (jqXHR, exception, e) {
                        if (jqXHR.status === 0) {
                            form.find('button,input').removeAttr('disabled')
                            closeLoader()
                            outputMsg('Error network connection')
                        }
                        if (exception === 'timeout') {
                            // Произошел тайм-аут
                            //Включение кнопки и элементов формы
                            form.find('button,input').removeAttr('disabled')
                            closeLoader()
                            outputMsg('Error timeout')
                        }
                        if (exception == 'parsererror') {
                            //Включение кнопки и элементов формы
                            form.find('button,input').removeAttr('disabled')
                            closeLoader()
                            outputMsg('Error data accept')
                        }
                    },
                })
            }
        })
    })
})(jQuery)
