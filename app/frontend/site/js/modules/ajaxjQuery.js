import $ from 'jquery'
import { outputMsg } from './messageViews'
import { openLoader, closeLoader } from './loaders'
import { openMenu, closeMenu, existOpenMenu } from './menuViews'
import { createListHouses, createTableHouses } from './createHTML'

export const ajax = (api, data, form) => {
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
            createTableHouses(data)
        },
        error: function (jqXHR, exception, e) {
            if (jqXHR.status === 0) {
                form.find('button,input').removeAttr('disabled')
                closeLoader()
                outputMsg(
                    form.find('.form-message'),
                    'Error network connection'
                )
            }
            if (exception === 'timeout') {
                // Произошел тайм-аут
                //Включение кнопки и элементов формы
                form.find('button,input').removeAttr('disabled')
                closeLoader()
                outputMsg(form.find('.form-message'), 'Error timeout')
            }
            if (exception == 'parsererror') {
                //Включение кнопки и элементов формы
                form.find('button,input').removeAttr('disabled')
                closeLoader()
                outputMsg(form.find('.form-message'), 'Error data accept')
            }
        },
    })
}
