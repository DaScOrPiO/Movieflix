// Javascript for Main web Page

//https://api.themoviedb.org/3/movie/top_rated?api_key=ea48b075cdabf837d2e5c2ad25476d37
const closeBtn = document.querySelector('.close');
const show_Next = document.querySelector('.next');
const show_Prev = document.querySelector('.prev');
const CurrentlyPlaying = async () => {
    const req = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=ea48b075cdabf837d2e5c2ad25476d37`);
    const data = req.data.results;

    looped2(data)

    const getMoreInfo = async (e) => {

        sliderMovieContainer.classList.remove('hidden');
        const infoContainer = document.createElement('div');
        infoContainer.classList.add('movie-info');
        sliderMovieContainer.appendChild(infoContainer);
        const videoContainer = document.createElement('div');
        videoContainer.classList.add('movie-info');
        infoContainer.appendChild(videoContainer);
        const title = document.createElement('div');
        title.classList.add('title');
        infoContainer.appendChild(title);
        const p1 = document.createElement('p');
        title.appendChild(p1);
        const releaseDate = document.createElement('div');
        releaseDate.classList.add('release-date');
        infoContainer.appendChild(releaseDate)
        const p2 = document.createElement('p');
        releaseDate.appendChild(p2);
        const status = document.createElement('div');
        status.classList.add('title');
        infoContainer.appendChild(status);
        const p3 = document.createElement('p');
        status.appendChild(p3);
        const genre = document.createElement('div');
        genre.classList.add('release-date');
        infoContainer.appendChild(genre);

        const similarMovies = document.createElement('div');
        similarMovies.classList.add('similar-movies');
        sliderMovieContainer.appendChild(similarMovies);
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('movie-img');
        similarMovies.appendChild(imgContainer);
        const image = document.createElement('img');
        imgContainer.appendChild(image);
        const movieDesc = document.createElement('div');
        movieDesc.classList.add('movie-desc');
        sliderMovieContainer.appendChild(movieDesc)
        const showRatings = document.createElement('div');
        showRatings.classList.add('ratings');
        movieDesc.appendChild(showRatings)
        const icon = document.createElement('i');
        icon.classList.add('bi', 'bi-star-fill', 'ratings', 'gold-color');
        icon.innerText = '8.2';
        showRatings.appendChild(icon);
        const similar_movie_title = document.createElement('div');
        similar_movie_title.classList.add('movie-title');
        movieDesc.appendChild(similar_movie_title)
        const subP = document.createElement('p');
        similar_movie_title.appendChild(subP)
        subP.innerText = looped2(data)
        console.dir(sliderMovieContainer)
        closeBtn.addEventListener('click', () => {
            sliderMovieContainer.classList.add('hidden')
            while (sliderMovieContainer.lastElementChild) {
                sliderMovieContainer.removeChild(sliderMovieContainer.lastElementChild);
            }
            sliderMovieContainer.appendChild(closeBtn)
        })
    }


    let viewMore = document.querySelector('.more-info');
    let slide = document.getElementsByClassName('slider');
    let slideIndex = 1;
    var clickedState = false;
    const animation = (n) => {
        var updatedState = () => {
            clickedState = true;
            if (clickedState === true) {
                console.log('Element Clicked!');
            }
        }
        if (slide) {
            if (slideIndex > slide.length || n > slide.length) {
                slideIndex = 1;
            }
            if (n < 1) {
                slideIndex = slide.length
            }
            for (let i = 0; i < slide.length; i++) {
                slide[i].style.display = 'none'
            }
            // slideIndex++ // Bug here
            slide[slideIndex - 1].style.display = 'flex';
            viewMore.addEventListener('click', () => {
                looped2(getMoreInfo(slideIndex))
            })
            setTimeout(animation, 8000);
        }
    }
    animation(slideIndex);
    let plusSlides = (n) => {
        animation(slideIndex += n);
    }
    show_Next.addEventListener('click', () => {
        plusSlides(1);
    })
    show_Prev.addEventListener('click', () => {
        plusSlides(-1);
    })
}


window.addEventListener('DOMContentLoaded', CurrentlyPlaying)

const slideContainer = document.querySelector('.slider-container')
const sliderMovieContainer = document.querySelector('.slider-movie-info');
const looped2 = (images) => {
    const view_More_Container = document.createElement('a');
    view_More_Container.classList.add('more-info');
    slideContainer.appendChild(view_More_Container);
    view_More_Container.innerText = 'View More';
    for (let i of images) {
        console.log(i);
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('slider', 'slider-animation');
        slideContainer.appendChild(imgContainer);
        const image = document.createElement('img');
        let source = image.src = `https://image.tmdb.org/t/p/original/${i.poster_path}`
        imgContainer.appendChild(image);
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