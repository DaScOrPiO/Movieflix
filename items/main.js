// Javascript for Main web Page

//https://api.themoviedb.org/3/movie/top_rated?api_key=ea48b075cdabf837d2e5c2ad25476d37
const closeBtn = document.querySelector('.close');
const show_Next = document.querySelector('.next');
const show_Prev = document.querySelector('.prev');
const CurrentlyPlaying = async () => {
    const req = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=ea48b075cdabf837d2e5c2ad25476d37`);
    const data = req.data.results;

    looped2(data)

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
            slideIndex++ // Bug Here
            slide[slideIndex - 1].style.display = 'flex';
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


window.addEventListener('DOMContentLoaded', CurrentlyPlaying);

const slideContainer = document.querySelector('.slider-container')
const sliderMovieContainer = document.querySelector('.slider-movie-info');
const looped2 = (images) => {
    for (let i of images) {
        // console.log(i);
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('slider', 'slider-animation');
        slideContainer.appendChild(imgContainer);
        const image = document.createElement('img');
        let source = image.src = `https://image.tmdb.org/t/p/original/${i.poster_path}`
        imgContainer.appendChild(image);
        const view_More_Container = document.createElement('a');
        view_More_Container.classList.add('more-info');
        imgContainer.appendChild(view_More_Container);
        view_More_Container.innerText = 'View More';
        view_More_Container.addEventListener('click', () => {

            sliderMovieContainer.classList.remove('hidden');
            const infoContainer = document.createElement('div');
            infoContainer.classList.add('movie-info');
            sliderMovieContainer.appendChild(infoContainer);
            const videoContainer = document.createElement('div');
            videoContainer.classList.add('video');
            infoContainer.appendChild(videoContainer);
            const videoImg = document.createElement('img');
            videoContainer.appendChild(videoImg);
            videoImg.src = `https://image.tmdb.org/t/p/w500/${i.poster_path}`;
            const overview = document.createElement('div');
            overview.classList.add('overview');
            const h1 = document.createElement('h1')
            h1.innerText = 'OVERVIEW';
            overview.appendChild(h1);
            const p = document.createElement('p');
            p.innerText = i.overview;
            overview.appendChild(p);
            infoContainer.appendChild(overview);
            const title = document.createElement('div');
            title.classList.add('title');
            infoContainer.appendChild(title);
            const p1 = document.createElement('p');
            p1.innerText = `TITLE: ${i.name}`;
            title.appendChild(p1);
            const releaseDate = document.createElement('div');
            releaseDate.classList.add('release-date');
            infoContainer.appendChild(releaseDate)
            const p2 = document.createElement('p');
            p2.innerText = `RELEASE-DATE: ${i.first_air_date}`
            releaseDate.appendChild(p2);
            const status = document.createElement('div');
            status.classList.add('title');
            infoContainer.appendChild(status);
            const p3 = document.createElement('p');
            status.appendChild(p3);
            const genre = document.createElement('div');
            genre.classList.add('release-date');
            let genreId = i.genre_ids;
            for (let genres of genreId) {
                if (genreId.length <= 1) genre.innerText = `GENRE: ${genreId}`;
                genre.innerText = `GENRES: ${genres}`;
            }
            infoContainer.appendChild(genre);

            const similar_Movies__generator = async () => {
                const req = await axios.get(`https://api.themoviedb.org/3/movie/${i.id}/similar?api_key=ea48b075cdabf837d2e5c2ad25476d37`);
                const data = req.data.results;
                const h1 = document.createElement('h1');
                h1.classList.add('h1-div');
                h1.innerText = 'SIMILAR MOVIES';
                sliderMovieContainer.appendChild(h1)
                for (let i of data) {
                    const similarMovies = document.createElement('div');
                    similarMovies.classList.add('similar-movies');
                    sliderMovieContainer.appendChild(similarMovies);
                    const imgContainer = document.createElement('div');
                    imgContainer.classList.add('movie-img');
                    similarMovies.appendChild(imgContainer);
                    const image = document.createElement('img');
                    image.src = `https://image.tmdb.org/t/p/original/${i.poster_path}`
                    imgContainer.appendChild(image);
                    const movieDesc = document.createElement('div');
                    movieDesc.classList.add('movie-desc');
                    similarMovies.appendChild(movieDesc)
                    const similar_movie_title = document.createElement('div');
                    similar_movie_title.classList.add('movie-title');
                    movieDesc.appendChild(similar_movie_title)
                    const subP = document.createElement('p');
                    similar_movie_title.appendChild(subP)
                    subP.innerText = `TITLE: ${i.title}`;
                    const showRatings = document.createElement('div');
                    showRatings.classList.add('ratings');
                    movieDesc.appendChild(showRatings)
                    const icon = document.createElement('i');
                    icon.classList.add('bi', 'bi-star-fill', 'ratings', 'gold-color');
                    icon.innerText = `RATING: ${i.vote_average}`;
                    showRatings.appendChild(icon);
                    const similar_movie_overview = document.createElement('div');
                    similar_movie_overview.classList.add('movie-desc-overview');
                    similar_movie_overview.innerText = i.overview;
                    movieDesc.appendChild(similar_movie_overview);
                    const releaseDate2 = document.createElement('div');
                    releaseDate2.classList.add('release-date');
                    releaseDate2.innerText = `Release-date: ${i.release_date}`;
                    movieDesc.appendChild(releaseDate2)
                }
            }
            similar_Movies__generator();

            closeBtn.addEventListener('click', () => {
                sliderMovieContainer.classList.add('hidden')
                while (sliderMovieContainer.lastElementChild) {
                    sliderMovieContainer.removeChild(sliderMovieContainer.lastElementChild);
                }
                sliderMovieContainer.appendChild(closeBtn)
            })
        })
    }
}

const topRatedContainer = document.querySelector('.genral-container');
const viewTopRated = async () => {
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

const movieSearchInput = document.querySelector('#form1');
const movieSearchBtn = document.querySelector('#movies-search-btn');
const Search_result_container = document.querySelector('.search-results-container');
const _search_Movie_ = async () => {
    const Movie_Name = movieSearchInput.value;
    const values = {params: {query: Movie_Name}}
    const req = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=ea48b075cdabf837d2e5c2ad25476d37`, values);
    const data = req.data.results;
    console.log(data);
    looped3(data);
}
movieSearchBtn.addEventListener('click', () => {
    _search_Movie_();
    movieSearchInput.value = '';
});

const result = document.querySelector('.right');
const looped3 = (movie_content) => {
    for (let i of movie_content) { // ADD logic to run incase of empty results
        const results = document.createElement('a');
        results.classList.add('result-container');
        Search_result_container.appendChild(results);
        const resultsImg = document.createElement('div');
        resultsImg.classList.add('img-container');
        const image = document.createElement('img');
        if (i.poster_path) {
            image.src = `https://image.tmdb.org/t/p/w200/${i.poster_path}`;
        } else {
            image.alt = 'No photo available';
        }
        resultsImg.appendChild(image);
        results.appendChild(resultsImg);
        const resultsTitle = document.createElement('div');
        resultsTitle.classList.add('title-container');
        resultsTitle.innerText = i.title;
        results.appendChild(resultsTitle);
    }
    Search_result_container.classList.remove('hidden');
}
document.body.addEventListener('click', () => {
    while (Search_result_container.lastElementChild) {
        Search_result_container.removeChild(Search_result_container.lastElementChild);
    }
    Search_result_container.classList.add('hidden');
})

const seriesSearchBtn = document.querySelector('#nav-search-btn');
const pop_up_container = document.querySelector('.pop-up');
const seriesInputField = document.querySelector('#form2');
const closeBtn2 = document.querySelector('.close1');
const _Generate_series = async () => {
    const searchTerm = seriesInputField.value;
    const value = { params: { query: searchTerm } }
    const req = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=ea48b075cdabf837d2e5c2ad25476d37`, value);
    const data = req.data.results;
    console.log(data);
    looped4(data);

    closeBtn2.addEventListener('click', () => {
        pop_up_container.classList.add('hidden')
        while (pop_up_container.lastElementChild) {
            pop_up_container.removeChild(pop_up_container.lastElementChild);
        }
        pop_up_container.appendChild(closeBtn2)
    })
}
seriesSearchBtn.addEventListener('click', () => {
    _Generate_series();
    seriesInputField.value = '';
});

const looped4 = (Movie_content) => {
    for (let i of Movie_content) {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-img-contaier');
        pop_up_container.appendChild(movieContainer);
        const containerImg = document.createElement('img');
        containerImg.src = `https://image.tmdb.org/t/p/original/${i.poster_path}`;
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
        movieContainer.appendChild(descriptionContainer);
        const link = document.createElement('a');
        descriptionContainer.appendChild(link);
        link.innerText = i.name;
    }
    pop_up_container.classList.remove('hidden');
}