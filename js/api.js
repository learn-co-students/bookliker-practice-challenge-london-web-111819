// Base URL(s)

const booksURL = 'http://localhost:3000/books/'

// API Functions

function get(url) {
    return fetch(url)
        .then(response => response.json())
}

// function post(url, configObj) {
//     return fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             Accept: 'application/json'
//         },
//         body: JSON.stringify(configObj)
//     })
//         .then(response => response.json())
// }

function patch(url, id, configObj) {
    return fetch(`${url}${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(configObj)
    })
        .then(response => response.json())
}

// function destroy(url, id) {
//     return fetch(`${url}${id}`, {
//         method: 'DELETE'
//     })
// }
