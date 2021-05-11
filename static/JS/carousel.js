console.log("carousel.js is loaded");

// initialize carousel inside toggle wrapper

$(document).ready(function() {
    $('#slick-button').click(function() {
        $('#slick-carousel .slick').slick({
            arrows: true,
            dots: true,
            infinite: true,
            speed: 500,
            fade: true,
            cssEase: 'linear'
        });
    });
});

// Serious gratitude to 'Webmaster Manish' on the threat at https://github.com/kenwheeler/slick/issues/235 for identifying and 
// solving the exact awful combo of bootstrap / accordion / slick that I was trying to solve, and then posting about it so I didn't
// have to throw up my hands in despair.
