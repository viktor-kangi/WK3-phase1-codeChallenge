const url = "http://localhost:3000/films"

fetch("http://localhost:3000/films")
            .then(res=>res.json())
            .then(json=>console.log(json))

const filmList = document.getElementById('films')
const filmInfo = document.getElementById('showing')
let data = ''
let infoData = ''
const poster = document.getElementById('poster')

document.addEventListener('DOMContentLoaded', () => {
    getFilms()
})

function getFilms(){
    fetch(url).then(res => res.json())
    .then(films => {
        films.forEach(film => {
            showFilmName(film)
        });
    })
}

function showFilmName(film){
    const li = document.createElement('li')
    li.className = "film item"
    li.innerHTML = film.title
    filmList.appendChild(li)

    li.addEventListener('click', () => {
      filmDetails(film)
    })

    function clickName(){
      return li.click()
    }

    window.onload = setTimeout(clickName(), 1000)
}

function filmDetails(film){
  poster.src = film.poster
  infoData = `
  <div class="card">
          <div id="title" class="title">${film.title}</div>
          <div id="runtime" class="meta">${film.runtime} minutes</div>
          <div class="content">
            <div class="description">
              <div id="film-info">${film.description}</div>
              <span id="showtime" class="ui label">${film.showtime}</span>
              <span id="ticket-num">${film.tickets_sold}</span> remaining tickets
            </div>
          </div>
          <div class="extra content">
            <button id="buy-ticket" class="ui orange button">
              Buy Ticket
            </button>
          </div>
        </div>
  `
  filmInfo.innerHTML = infoData
  let buyBtn = document.getElementById('buy-ticket')
  buyBtn.addEventListener('click', () => {
    buyTicket(film)
  })
}

function buyTicket(film){
  if (film.tickets_sold == 0) {
    return false
  }
  --film.tickets_sold
  UpdateTickets(film)
}


function UpdateTickets(film){
  fetch(url + `${film.id}`, {method: 'PATCH', headers: {
    'Content-type': 'application/json'
 },
  body: JSON.stringify(film)
  }).then(res => res.json())
  .then(film => filmDetails(film))
}


