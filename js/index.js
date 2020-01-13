// GLABAL VARIABLES
const booksURI = 'http://localhost:3000/books/'
const usersURI = 'http://localhost:3000/users'
const bookList = document.querySelector('#list')
const bookShow = document.querySelector('#show-panel')

// API FUNCTIONS
function get(url) {
   return fetch(url)
    .then(function(response) {
        return response.json()
    })
}

function show(url, id) {
    return fetch(`${url}${id}`)
    .then(function(response) {
        return response.json()
    })
}

function patch(url, id, bodyObject) {
    return fetch(`${url}${id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(bodyObject)
    })
    .then(function(response) {
        return response.json()
    })
}

// FUNCTIONS
function createBookListItem(book) {
    let li = document.createElement('li')
    li.textContent = book.title
    li.id = book.id
    bookList.appendChild(li)
    li.addEventListener('click', function() {
        bookShow.innerHTML = ''
        getBooksAndRenderDescription(event.target.id)
    })
}

function createBookDescriptionTab(book) {
    let h3 = document.createElement('h3')
    h3.textContent = book.title
    let img = document.createElement('img')
    img.src = book.img_url
    let p = document.createElement('p')
    let userList = document.createElement('div')
    userList.classList.add('user-list')
    book.users.forEach(function(user) {
        let userName = document.createElement('p')
        userName.textContent = user.username
        userList.appendChild(userName)
    })
    p.textContent = book.description
    let likeBtn = document.createElement('button')
    likeBtn.textContent = 'Read book'
    bookShow.setAttribute('data-id', book.id)
    bookShow.append(h3, img, userList, p, likeBtn)
    likeBtn.addEventListener('click', addSelfToUserListAndRender)
}

function getBooksAndRenderListItem() {
    get(booksURI)
    .then(function(books) {
        books.forEach(createBookListItem)
    })
}

function getBooksAndRenderDescription(id) {
    show(booksURI, id)
    .then(createBookDescriptionTab)
}

function addSelfToUserListAndRender(event) {
    patch(booksURI, event.target.parentElement.dataset.id, {
            users: [{
                "id": 1,
                "username": "auer"
            }]
    })
    .then(function() {
        getBooksAndRenderDescription(event.target.parentElement.dataset.id)
        bookShow.innerHTML = ''
    })
}

// EVENT LISTENERS
document.body.onload = getBooksAndRenderListItem()
