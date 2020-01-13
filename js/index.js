//glibal variables
const baseUrl = 'http://localhost:3000/books/'
const bookList= document.querySelector("[id='list']")
const showPanel = document.querySelector("[id='show-panel']")
const usersList = document.createElement("ul")

//requests 

function get(url){
    return fetch(url)
    .then((response) => response.json())
}

function patch(url, id, bodyOject){
    return fetch(`${url}${id}`, {
        method:"PATCH",
        headers:{
            'Content-Type': 'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify(bodyOject)
    }).then((response) => response.json())
}

//functions 

function renderBooks(book){
    let li = document.createElement("li")
    li.innerText = book.title 
    li.addEventListener('click', () => showBook(book))
    bookList.appendChild(li)
}

function showBook(book){
    showPanel.innerHTML = ""
    let h1 = document.createElement("h1")
    h1.innerText = book.title
    let img = document.createElement("img")
    img.src = book.img_url
    let p = document.createElement("p")
    p.innerText = book.description  
    usersList.innerText = "" 
    book.users.forEach(renderUsers)
    let readButton = document.createElement("button")
    readButton.innerText = 'Read Book'
    readButton.addEventListener('click', () => updateBookUsers(book))
    showPanel.append(h1, img, p, usersList, readButton)
}

function renderUsers(user){
    let li = document.createElement("li")
    li.innerText = user.username
    usersList.appendChild(li)
}

function getAllBooks(){
    get(baseUrl)
    .then((books) => books.forEach(renderBooks)
    )
}

function updateBookUsers(book){
    event.preventDefault()
    let listUsers = book.users
    listUsers.push({"id":1, "username":"pouros"})
    bodyOject = {
        users: listUsers
    }
    patch(baseUrl, book.id, bodyOject)
    .then((book) => showBook(book))

}



document.addEventListener("DOMContentLoaded", function() {

    getAllBooks()

});
