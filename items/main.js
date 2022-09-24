// Javascript for Main web Page

//https://api.themoviedb.org/3/movie/top_rated?api_key=ea48b075cdabf837d2e5c2ad25476d37
let slideIndex = 0;
let slide = document.getElementsByClassName('slider');
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
        setTimeout(animation, 4000);
    }
}
document.addEventListener('DOMContentLoaded', animation)

const topRatedContainer = document.querySelector('.genral-container');
const viewTopRated = async () => {
    let req = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=ea48b075cdabf837d2e5c2ad25476d37`);
    let data = req.data.results;
    looped(data)
}

const looped = (movie_content) => {
    for (let i of movie_content) {
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