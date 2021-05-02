console.log("carousel.js is loaded");

$(document).ready(function() {
    $('#slick-carousel .slick').slick({
        arrows: true,
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'
    });
});