let d = new Date()
let months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
console.log(months[d.getMonth()]);
const input = document.querySelector('#form1');
const movieSearchBtn = document.querySelector('#button1');
const seriesSearchBtn = document.querySelector('#button2');
const mainModal = document.querySelector('.modal-container');
const closebtn = document.querySelectorAll('.close');
const pageContainer = document.querySelector('.container');

const searchMovies = async () => {
    try {
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
    }
    catch (e) {
        alert(`Movie was not found in database`);
    }
}

movieSearchBtn.addEventListener('click', searchMovies)
movieSearchBtn.addEventListener('click', e => {
    input.value = ''
})

//Action to close popup windows
closebtn.forEach(btn => btn.addEventListener('click', function () {
    mainModal.classList.add('hidden');
}))

