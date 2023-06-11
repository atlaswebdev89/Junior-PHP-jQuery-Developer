import { type } from 'jquery'

const main = document.querySelector('.main')
const defaultPhoto = 'images/houses.jpeg'

export const createListHouses = (jsonData) => {
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
            div3.append(title, price)
            div2.append(ul, a)
            div.append(img)
            article.append(div, div3, div2)
            main.append(article)
        })
    }
}

export const createTableHouses = (jsonData) => {
    let tableMain, h2
    if ((tableMain = main.querySelector('.table-houses'))) tableMain.remove()
    if ((h2 = main.querySelector('h2'))) h2.remove()

    if (jsonData.length === 0) {
        const title = document.createElement('h2')
        title.textContent = 'Not founds'
        main.append(title)
    } else {
        const table = document.createElement('table')
        const thead = document.createElement('thead')
        const tbody = document.createElement('tbody')

        table.classList.add('table-houses')
        const firstElement = jsonData[0]
        if (firstElement) {
            const th = document.createElement('th')
            th.textContent = 'Num'
            thead.appendChild(th)
            for (let head in firstElement) {
                const th = document.createElement('th')
                th.textContent = head
                thead.appendChild(th)
            }
        }
        table.appendChild(thead)

        table.appendChild(tbody)
        jsonData.forEach((element, index) => {
            const tr = document.createElement('tr')
            const td = document.createElement('td')

            td.textContent = index
            tr.appendChild(td)

            for (let item in element) {
                const td = document.createElement('td')
                td.textContent = element[item]
                tr.appendChild(td)
            }
            tbody.append(tr)
            main.append(table)
        })
    }
}
