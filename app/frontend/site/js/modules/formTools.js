// Удаляет placeholder  при клике мыши на input
import $ from 'jquery'

export const delPlaceholder = (form) => {
    Array.from(form).forEach((element) => {
        const placeholders = element.placeholder
        element.addEventListener('focus', (event) => {
            element.placeholder = ''
        })
        element.addEventListener('blur', (event) => {
            element.placeholder = placeholders
        })
    })
}

// Simple validate
export const validateForm = (form) => {
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
                    $('.error-validate').text('Please enter only number')
                    countError++
                }
            }
            if ($(this).attr('type') === 'text') {
                if (Number.isInteger(Number($(this).val()))) {
                    $(this).after(errorValidate.addClass(classErr))
                    $('.error-validate').text('Please enter don`t only number')
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
