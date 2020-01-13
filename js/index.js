document.addEventListener("DOMContentLoaded", function() {
//HELPER APIS
function get(URI) {
    return fetch(URI).then(response=>response.json())
}

function patch(URI,id,patchObj){
    let patchData = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
        body: JSON.stringify(patchObj)
        };
        return fetch(`${URI}${id}`,patchData).then(response=>response.json())
}

//CONSTANTS
const BOOK_BASE_URL="http://localhost:3000/books/"
const listPanel = document.getElementById("list")
const showPanel = document.getElementById("show-panel")

//FUNCTIONS
function getAlltheBooksAndPopulateTheListPanel(){
    get(BOOK_BASE_URL).then(books=>books.forEach(renderInTheList));
}

function renderInTheList(book){
    let newBookLi = document.createElement('li')
    newBookLi.innerText = book.title
    newBookLi.id = `book-${book.id}`
    newBookLi.addEventListener("click",()=>showInThePanel(book))
    listPanel.appendChild(newBookLi)
}

function showInThePanel(book){
    let indicator = document.querySelector(".newMainDiv")
    if (indicator != null){
        indicator.remove()
    }
    let newMainDiv = document.createElement('div')
    newMainDiv.classList.add("newMainDiv")
    let newH2 = document.createElement('h2')
    newH2.innerText = book.title
    let newImg = document.createElement('img')
    newImg.src = book.image_url
    let newP = document.createElement('p')
    newP.innerText = book.description
    let newLikeButton = document.createElement('button')
    newLikeButton.innerText = "Like"
    newLikeButton.addEventListener("click",function(event){
        let me = [{"id":1, "username":"pouros"}]
        if (book.users.map(element=>element.id).includes(me[0].id)){
            alert("You are already in the list!")
        } else{
        book.users.includes(me[0])
        let theFullList = me.concat(book.users)
        let objectToSend = {
            users: theFullList
        }
        patch(BOOK_BASE_URL,book.id,objectToSend).then(updatedBook=>updateUsers(updatedBook, newUl))
    }
    })

    let newUl = document.createElement('ul')
    newUl.classList.add("userlist-ul")
    book.users.forEach(user=>{
        let newUserLi = document.createElement('li')
        newUserLi.innerText = user.username
        newUserLi.classList.add("user")
        newUserLi.id = `user-${user.id}`
        newUl.appendChild(newUserLi)
    })
    newMainDiv.append(newH2,newImg,newP,newUl,newLikeButton)
    showPanel.appendChild(newMainDiv)
}

function updateUsers(updatedBook, newUl){
    newUl.innerHTML =""
    updatedBook.users.forEach(user=>{
        let newUserLi = document.createElement('li')
        newUserLi.innerText = user.username
        newUserLi.classList.add("user")
        newUserLi.id = `user-${user.id}`
        newUl.appendChild(newUserLi)
    })
}

//EVENTLISTENERS / INITIAL LOADERS
getAlltheBooksAndPopulateTheListPanel()

});
