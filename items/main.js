// Javascript for Main web Page

//https://api.themoviedb.org/3/movie/top_rated?api_key=ea48b075cdabf837d2e5c2ad25476d37
const CurrentlyPlaying = async () => {
    const req = await axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=ea48b075cdabf837d2e5c2ad25476d37`);
    const data = req.data.results;

    looped2(data)


    let slide = document.getElementsByClassName('slider');
    let slideIndex = 0;
    const animation = () => {
        if (slide) {
            for (let i = 0; i < slide.length; i++) {
                slide[i].style.display = 'none'
            }
            slideIndex++
            if (slideIndex > slide.length) {
                slideIndex = 1;
            }
            slide[slideIndex - 1].style.display = 'block';
            setTimeout(animation, 8000);
        }
    }
    animation()
}


window.addEventListener('DOMContentLoaded', CurrentlyPlaying)

const slideContainer = document.querySelector('.slider-container')
const looped2 = (images) => {
    for (const i of images) {
        console.log(i.poster_path);
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('slider', 'slider-animation');
        slideContainer.appendChild(imgContainer);
        const image = document.createElement('img');
        image.src = `https://image.tmdb.org/t/p/original/${i.poster_path}`
        imgContainer.appendChild(image)
    }
}

const topRatedContainer = document.querySelector('.genral-container');
const viewTopRated = async () => {
    // let req = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=ea48b075cdabf837d2e5c2ad25476d37`);
    const req = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=ea48b075cdabf837d2e5c2ad25476d37`);
    const data = req.data.results;
    looped(data)
}

const looped = (movie_content) => {
    for (const i of movie_content) {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-img-contaier');
        topRatedContainer.appendChild(movieContainer);
        const containerImg = document.createElement('img');
        containerImg.src = `https://image.tmdb.org/t/p/w200/${i.poster_path}`;
        movieContainer.appendChild(containerImg);
        const showRatings = document.createElement('div');
        showRatings.classList.add('ratings');
        movieContainer.appendChild(showRatings)
        const icon = document.createElement('i');
        icon.classList.add('bi', 'bi-star-fill', 'ratings', 'gold-color');
        icon.innerText = i.vote_average;
        showRatings.appendChild(icon);
        const descriptionContainer = document.createElement('div');
        descriptionContainer.classList.add('desc');
        descriptionContainer.innerText = i.title;
        movieContainer.appendChild(descriptionContainer)
    }
}
window.addEventListener('DOMContentLoaded', viewTopRated);