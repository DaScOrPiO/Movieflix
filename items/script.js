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
// animation();
const input = document.querySelector('#form1');
const movieSearchBtn = document.querySelector('#button1');
const seriesSearchBtn = document.querySelector('#button2');

const searchMovies = async () => {
    movieSearchBtn.addEventListener('click', function () {
        console.log(input.value);
    })
    // let res = await axios.get(`https://api.tvmaze.com/singlesearch/shows?q=girls`);
    // console.log(res.data);
}
movieSearchBtn.addEventListener('click', searchMovies)