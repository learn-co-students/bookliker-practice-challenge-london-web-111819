//Elements Creator
function createElement(tag, options = {}) {
    const el = document.createElement(tag)
    if (options.innerText) el.innerText = options.innerText
    if (options.src) el.src = options.src
    if (options.onClick) el.addEventListener('click', options.onClick)
    if (options.li) el.li = options.li
    if (options.id) el.id = options.id
    return el
}

// Book Constants
const listPanel = document.querySelector('#list-panel')
const list = document.querySelector('#list')
const showPanel = document.querySelector('#show-panel')

//User Constants 

const currentUser =  {"id":1, "username":"pouros"}

//Render - Index
function renderBooks() {
    get(booksURL)
        .then(books => {
            books.forEach(renderBook)
        });
}
renderBooks()

function renderBook(book) {
    let showBookButton = createElement('button', {
        innerText: "Show Book",
        onClick: () => showBookInShowPanel(book)
    })

    let bookItem = createElement('li', {
        innerText: book.title
    })

    bookItem.append(showBookButton)
    list.append(bookItem)
}

//Show

function showBookInShowPanel(book) {
    showPanel.innerHTML = ""

    let bookTitle = createElement('h2', {
        innerText: book.title
    })
    let bookThumbnail = createElement('img', {
        src: book.img_url
    })
    let bookDescription = createElement('p', {
        innerText: book.description
    })

    let currentlyReading = createElement('h4', {
        innerText: `These users are currently reading ${book.title} too!`
    })

    let readersList = createElement('ul', {})

    function displayUser(user) {
        let reader = createElement('li', {
            id: user.id,
            innerText: user.username
        })
        readersList.append(reader)
    }

    book.users.forEach(displayUser)

    let readBookButton = createElement('button', {
        innerText: "Like Book",
        onClick: () => addUserToCurrentBook(currentUser, book, event)
    })

    let unreadBookButton = createElement('button', {
        innerText: "Unlike Book",
        onClick: () => removeUserFromCurrentBook(currentUser, book, event)
    })
    

    showPanel.append(bookTitle, bookThumbnail, bookDescription, currentlyReading, readersList, readBookButton, unreadBookButton)
}

// Update

function addUserToCurrentBook(user, book, event){

    if (book.users.includes(user)){
        alert("You've already read this book!")
    } else {

        book.users.push(user)

        let updateReadersListObject = {
            users: book.users
        };

        patch(booksURL, book.id, updateReadersListObject)
            .then(() => { showBookInShowPanel(book)  
            })
        alert("We've add you to the list!")

    }
}

function removeUserFromCurrentBook(user, book, event){


    if (book.users.includes(user)){

        book.users.pop(user)

        let updateReadersListObject = {
            users: book.users
        };

        patch(booksURL, book.id, updateReadersListObject)
            .then(() => { showBookInShowPanel(book) 
            })

        alert("we've removed you from this list !")

    } else {
        alert("You've not read this book!")
    }

}


