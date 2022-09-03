let slideIndex = 0;
const animation = () => {
    let slide = document.getElementsByClassName('slider');
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
animation();