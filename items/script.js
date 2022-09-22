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
const mainModal = document.querySelector('.modal-container');
const closebtn = document.querySelectorAll('.close');
const pageContainer = document.querySelector('.container');

const searchMovies = () => {
    movieSearchBtn.addEventListener('click', async function () {
        const enteredValue = input.value;
        let res = await axios.get(`https://api.tvmaze.com/singlesearch/shows?q=${enteredValue}`);
        let data = res.data;
        console.log(data);

        const image = document.querySelector('#img');
        image.src = data.image.original;

        const desc = document.querySelector('.title');
        desc.innerText = data.name;

        const icon = document.querySelector('.ratings');
        icon.innerText = data.rating.average;

        const summary = document.querySelector('.summary');
        summary.innerText = data.summary;

        mainModal.classList.remove('hidden');
    })
}
movieSearchBtn.addEventListener('click', searchMovies)

//Action to close popup windows
closebtn.forEach(btn => btn.addEventListener('click', function () {
    mainModal.classList.add('hidden');
}))