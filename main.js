// Javascript for Main web Page

//https://api.themoviedb.org/3/movie/top_rated?api_key=ea48b075cdabf837d2e5c2ad25476d37
const closeBtn = document.querySelector('.close');
const show_Next = document.querySelector('.next');
const show_Prev = document.querySelector('.prev');
const popContainer = document.querySelector('.modal-container');
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.toggle');
nav.addEventListener('click', () => {
    if (hamburger.classList.contains('bi-list')) {
        hamburger.classList.replace('bi-list', 'bi-x');
    } else {
        hamburger.classList.replace('bi-x', 'bi-list');
    }
})

//Code for Page slider
const CurrentlyPlaying = async () => {
    const req = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=ea48b075cdabf837d2e5c2ad25476d37`);
    const data = req.data.results;

    looped2(data)

    let slide = document.getElementsByClassName('slider');

    let slideIndex = 0;
    let auto = true;
    let timeOut = 2000;
    const animation = () => {
        timeOut = 2000;

        for (let i = 0; i < slide.length; i++) {
            slide[i].style.display = 'none'
        }

        slideIndex++;

        if (slideIndex > slide.length) {
            slideIndex = 1;
        }

        slide[slideIndex - 1].style.display = 'flex';
    }

    const prevSlide = () => {
        timeOut = 2000;

        for (let i = 0; i < slide.length; i++) {
            slide[i].style.display = 'none';
        }

        slideIndex--;

        if (slideIndex > slide.length) {
            slideIndex = 1;
        }

        if (slideIndex == 0) {
            slideIndex = slide.length;
        }

        slide[slideIndex - 1].style.display = 'flex';
    }

    show_Prev.addEventListener('click', prevSlide);
    show_Next.addEventListener('click', animation);

    const sliderAuto = () => {
        timeOut = timeOut - 20;
        if (auto == true && timeOut < 0) {
            animation();
        }
        setTimeout(sliderAuto, 20);
    }
    sliderAuto();
}
window.addEventListener('DOMContentLoaded', CurrentlyPlaying);

const slideContainer = document.querySelector('.slider-container')
const sliderMovieContainer = document.querySelector('.slider-movie-info');
const looped2 = (images) => {
    for (let i of images) {
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
                sliderMovieContainer.appendChild(h1);
                const arr_similar = [];
                let id_similar;
                for (let i of data) {
                    id_similar = i.id;
                    arr_similar.push(id_similar);
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

                const index = document.querySelectorAll('.similar-movies');
                index.forEach((el, i) => {
                    el.addEventListener('click', async () => {
                        console.log(arr_similar[i]);
                        const simila_movie_id = arr_similar[i];

                        const req = await axios.get(`https://api.themoviedb.org/3/movie/${simila_movie_id}?api_key=ea48b075cdabf837d2e5c2ad25476d37`);
                        const data = req.data;
                        console.log(data);
                        const closebtn = document.querySelector('.close2');

                        const updatePop_container = () => {
                            const image = document.querySelector('.image-container > img');
                            const pageLink = document.querySelector('.homepage > a');
                            const title = document.querySelector('.title');
                            const icon = document.querySelector('#pop-rating');
                            const summary = document.querySelector('.summary');
                            const releaseDate = document.querySelector('.day-released > span');

                            image.src = `https://image.tmdb.org/t/p/original/${data.poster_path}`;

                            if (data.homepage != '') {
                                pageLink.innerText = data.homepage;
                                pageLink.href = data.homepage;
                            } else {
                                pageLink.innerText = 'N/A';
                            }

                            title.innerText = data.original_title;

                            icon.innerText = data.vote_average;

                            summary.innerText = data.overview;

                            releaseDate.innerText = data.release_date;

                            popContainer.classList.remove('hidden')
                        }
                        updatePop_container();
                        closebtn.addEventListener('click', () => {
                            popContainer.classList.add('hidden');
                        })
                    })
                })
            }
            similar_Movies__generator();
            
            closeBtn.addEventListener('click', () => {
                sliderMovieContainer.classList.add('hidden')
                while (sliderMovieContainer.lastElementChild) {
                    sliderMovieContainer.removeChild(sliderMovieContainer.lastElementChild);
                }
                sliderMovieContainer.appendChild(closeBtn);
            })
        })
    }
}
//End of Code-block for page Slider

//Code-block for Trending Movies
const topRatedContainer = document.querySelector('.genral-container');
const viewTopRated = async () => {
    const req = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=ea48b075cdabf837d2e5c2ad25476d37`);
    const data = req.data.results;
    looped(data)
}

const looped = (movie_content) => {
    const arr = [];
    let id;
    for (const i of movie_content) {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-img-contaier', 'con2');
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
        id = i.id;
        arr.push(id);
    }
    const searchIndex = document.querySelectorAll('.con2');
    searchIndex.forEach((el, i) => {
        el.addEventListener('mouseover', () => {
            el.classList.add('scale');
        })

        el.addEventListener('click', async () => {
            el.classList.add('scale');
            const trending_Movie_Id = arr[i];
            const req = await axios.get(`https://api.themoviedb.org/3/movie/${trending_Movie_Id}?api_key=ea48b075cdabf837d2e5c2ad25476d37`);
            const data = req.data;
            console.log(data);
            const closebtn = document.querySelector('.close2');

            const updatePop_container = () => {
                const image = document.querySelector('.image-container > img');
                const pageLink = document.querySelector('.homepage > a');
                const title = document.querySelector('.title');
                const icon = document.querySelector('#pop-rating');
                const summary = document.querySelector('.summary');
                const releaseDate = document.querySelector('.day-released > span');

                image.src = `https://image.tmdb.org/t/p/original/${data.poster_path}`;

                if (data.homepage != '') {
                    pageLink.innerText = data.homepage;
                    pageLink.href = data.homepage;
                } else {
                    pageLink.innerText = 'N/A';
                }

                title.innerText = data.original_title;

                icon.innerText = data.vote_average;

                summary.innerText = data.overview;

                releaseDate.innerText = data.release_date;

                popContainer.classList.remove('hidden')
            }
            updatePop_container();
            closebtn.addEventListener('click', () => {
                popContainer.classList.add('hidden');
            })
        })

        el.addEventListener('mouseout', () => {
            el.classList.remove('scale');
        })
    })
}
window.addEventListener('DOMContentLoaded', viewTopRated);
//End of code-block for trending movies

//Code-block for search movies section on website
const movieSearchInput = document.querySelector('#form1');
const movieSearchBtn = document.querySelector('#movies-search-btn');
const Search_result_container = document.querySelector('.search-results-container');
const _search_Movie_ = async () => {
    try {
        const Movie_Name = movieSearchInput.value;
        const values = { params: { query: Movie_Name } }
        const req = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=ea48b075cdabf837d2e5c2ad25476d37`, values);
        const data = req.data.results;
        console.log(data);
        looped3(data);
    }
    catch (e) {
        alert('Error Searching movie')
    }
}
movieSearchBtn.addEventListener('click', () => {
    _search_Movie_();
    movieSearchInput.value = '';
});

const result = document.querySelector('.right');
const looped3 = (movie_content) => {
    if (movie_content.length >= 1) {
        const arr = [];
        let id;
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
            id = i.id;
            arr.push(id);
        }

        Search_result_container.classList.remove('hidden');
        const searchIndex = document.querySelectorAll('.result-container');
        searchIndex.forEach((el, i) => {
            el.addEventListener('click', async () => {
                const movieId = arr[i];
                const req = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=ea48b075cdabf837d2e5c2ad25476d37`);
                const data = req.data;
                console.log(data);
                const closebtn = document.querySelector('.close2');
                // const popContainer = document.querySelector('.modal-container');
                const updatePop_container = () => {
                    const image = document.querySelector('.image-container > img');
                    const pageLink = document.querySelector('.homepage > a');
                    const title = document.querySelector('.title');
                    const icon = document.querySelector('#pop-rating');
                    const summary = document.querySelector('.summary');
                    const releaseDate = document.querySelector('.day-released > span');

                    image.src = `https://image.tmdb.org/t/p/original/${data.poster_path}`;

                    if (data.homepage != '') {
                        pageLink.innerText = data.homepage;
                        pageLink.href = data.homepage;
                    } else {
                        pageLink.innerText = 'N/A';
                    }

                    title.innerText = data.original_title;

                    icon.innerText = data.vote_average;

                    summary.innerText = data.overview;

                    releaseDate.innerText = data.release_date;

                    popContainer.classList.remove('hidden')
                }
                updatePop_container();
                closebtn.addEventListener('click', () => {
                    popContainer.classList.add('hidden')
                })
            })
        })
    } else {
        alert('ERROR! NO RESULT! Try series search instead');
    }
}


document.body.addEventListener('click', () => {
    while (Search_result_container.lastElementChild) {
        Search_result_container.removeChild(Search_result_container.lastElementChild);
    }
    Search_result_container.classList.add('hidden');
})
//End of code-block for search Movies

//Code-block for search-series on web Navbar section
const seriesSearchBtn = document.querySelector('#nav-search-btn');
const pop_up_container = document.querySelector('.pop-up');
const seriesInputField = document.querySelector('#form2');
const closeBtn2 = document.querySelector('.close1');
const _Generate_series = async () => {
    const searchTerm = seriesInputField.value;
    const value = { params: { query: searchTerm } }
    const req = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=ea48b075cdabf837d2e5c2ad25476d37`, value);
    const data = req.data.results;
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
    if (Movie_content.length >= 1) {
        const arr = [];
        let id;
        for (let i of Movie_content) {
            const movieContainer = document.createElement('div');
            movieContainer.classList.add('movie-img-contaier', 'con');
            pop_up_container.appendChild(movieContainer);
            const containerImg = document.createElement('img');
            if (i.poster_path) {
                containerImg.src = `https://image.tmdb.org/t/p/original/${i.poster_path}`;
            } else {
                containerImg.alt = `can't find image for this movie`
            }
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
            id = i.id;
            arr.push(id);
        }

        pop_up_container.classList.remove('hidden');
        const searchIndex = document.querySelectorAll('.con');
        searchIndex.forEach((el, i) => {
            el.addEventListener('click', async () => {
                const TvId = arr[i];
                const req = await axios.get(`https://api.themoviedb.org/3/tv/${TvId}?api_key=ea48b075cdabf837d2e5c2ad25476d37`);
                const data = req.data;

                const closebtn = document.querySelector('.close2');

                const updatePop = () => {
                    const image = document.querySelector('.image-container > img');
                    const pageLink = document.querySelector('.homepage > a');
                    const title = document.querySelector('.title');
                    const icon = document.querySelector('#pop-rating');
                    const summary = document.querySelector('.summary');
                    const releaseDate = document.querySelector('.day-released > span');

                    if (data.poster_path) {
                        image.src = `https://image.tmdb.org/t/p/original/${data.poster_path}`;
                    } else {
                        image.src = '';
                        image.alt = `No image for this movie`;
                    }

                    if (data.homepage != '') {
                        pageLink.innerText = data.homepage;
                        pageLink.href = data.homepage;
                    } else {
                        pageLink.innerText = 'N/A';
                    }

                    title.innerText = data.original_name;

                    icon.innerText = data.vote_average;

                    summary.innerText = data.overview;

                    releaseDate.innerText = data.first_air_date;

                    popContainer.classList.remove('hidden')
                }
                updatePop();
                closebtn.addEventListener('click', () => {
                    popContainer.classList.add('hidden')
                })
            })
        })
    } else {
        alert('ERROR! RESULT NOT FOUND! Try movies search instead');
    }
}
//End of code-block for search-series on website 