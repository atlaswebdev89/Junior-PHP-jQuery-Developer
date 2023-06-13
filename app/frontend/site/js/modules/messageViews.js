export const outputMsg = (field, msg) => {
    field.text(msg)
    setTimeout(function () {
        field.text('')
    }, 3000)
}
