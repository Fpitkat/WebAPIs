// USING THE FETCH API

// fetch('https://swapi.dev/api/people/1')
//   .then((res) => {
//     console.log(res)
//     return res.json()
//   })
//   .then((data) => {
//     console.log(data)
//   })
//   .catch((e) => {
//     console.log(e)
//   })

// USING THE ASYNC / AWAIT

// const loadStarWars = async (id) => {
//   try {
//     const res = await fetch(`https://swapi.dev/api/people/${id}`)
//     const data = await res.json()
//     console.log(data)
//   } catch (e) {
//     console.log(e)
//   }
// }

// USING THE AXIOS
// axios.get(`https://swapi.dev/api/people/1`).then((res) => {
//   console.log(res)
// })
//   .catch(e){
//   console.log(e);
// }

const loadStarWars = async (id) => {
  try {
    const res = await axios.get(`https://swapi.dev/api/people/${id}`)
    console.log(res.data)
  } catch (e) {
    throw new Error(e)
  }
}

const btn = document.querySelector('button')
const ul = document.querySelector('ul')

btn.addEventListener('click', async () => {
  addNewJoke()
})

const addNewJoke = async () => {
  const jokeText = await getDadJoke()
  const li = document.createElement('li')
  li.innerText = jokeText
  ul.append(li)
}

const getDadJoke = async () => {
  try {
    const res = await axios.get('https://icanhazdadjoke.com/', {
      headers: { Accept: 'application/json' },
    }) // must include headers with this API
    return res.data.joke
  } catch (e) {
    console.log(e)
  }
}

const form = document.querySelector('form')
const images = document.querySelector('.images')

form.addEventListener('submit', (e) => {
  try {
    e.preventDefault()
    let search = form.elements.search.value
    getMovie(search)
    form.elements.search.value = ''
  } catch (e) {
    console.log(e)
  }
})

const getMovie = async (searchTerm) => {
  try {
    images.innerHTML = ''
    const movieURL = `https://api.tvmaze.com/search/shows`
    const res = await axios.get(movieURL, {
      params: {
        q: searchTerm,
      },
    })
    makeImages(res.data)
  } catch (e) {
    console.log(e)
  }
}

const makeImages = async (shows) => {
  try {
    for (let res of shows) {
      const imgUrl = res.show.image.medium || res.show.image.large
      const img = document.createElement('img')
      img.setAttribute('src', imgUrl)
      images.append(img)
    }
  } catch (e) {
    console.log(e)
  }
}
