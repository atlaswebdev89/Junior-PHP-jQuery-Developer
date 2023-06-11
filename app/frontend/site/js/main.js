// Стили для приложения
import '../css/style.scss'

import jQuery from 'jquery'
import { openMenu, closeMenu, existOpenMenu } from './modules/menuViews'
import { openLoader, closeLoader } from './modules/loaders'
import { delPlaceholder, validateForm } from './modules/formTools'
import { ajax } from './modules/ajaxjQuery'

const navSearch = document.querySelector('.nav-search')
const overlay = document.querySelector('.overlay')
const close = document.querySelector('.close-aside')

const items = [navSearch, overlay, close]

// Добавление обработчиков для открытия и закрытия меню
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
delPlaceholder(form)

jQuery.noConflict()
;(function ($) {
    $(function () {
        $('#search_houses').on('submit', (event) => {
            event.preventDefault()

            const api = 'http://localhost:8118'
            const form = $(this)

            if (validateForm(form.find('input')) === 0) {
                let data = JSON.stringify(
                    $(this).find('input').serializeArray()
                )
                ajax(api, data, form)
            }
        })
    })
})(jQuery)
