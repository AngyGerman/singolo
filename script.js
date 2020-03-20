/*
 * Slider and slides
 */

let previousSlideArrow = document.querySelector('.slider .prev');
let nextSlideArrow = document.querySelector('.slider .next');

function changeSlide(direction) {
    let slidesNodes = document.querySelectorAll('.slides .slide');
    let slidesCounter = slidesNodes.length;

    let currentSlideIndex = 0;
    let nextSlideIndex;

    slidesNodes.forEach((slide, index) => {
        if (slide.classList.contains('active')) {
            currentSlideIndex = index;
        }
    });

    if (direction === 'prev') {
        nextSlideIndex = currentSlideIndex - 1;

        if (nextSlideIndex < 0) {
            nextSlideIndex = slidesCounter - 1;
        }
    } else if (direction === 'next') {
        nextSlideIndex = currentSlideIndex + 1;

        if (nextSlideIndex > slidesCounter - 1) {
            nextSlideIndex = 0;
        }
    }

    slidesNodes[currentSlideIndex].classList.add('animation');
    slidesNodes[currentSlideIndex].classList.remove('visible');

    slidesNodes[nextSlideIndex].classList.add('active');


    setTimeout(() => {
        slidesNodes[currentSlideIndex].classList.remove('active');
        slidesNodes[currentSlideIndex].classList.remove('animation');
    }, 300);

    setTimeout(() => {
        slidesNodes[nextSlideIndex].classList.add('visible');
    }, 150);
}

previousSlideArrow.addEventListener('click', (e) => {
    let firstScreen = document.getElementById('black');
    firstScreen.classList.remove('black');
    let secondScreen = document.getElementById('black1');
    secondScreen.classList.remove('black1');
    e.preventDefault();

    changeSlide('prev');
});

nextSlideArrow.addEventListener('click', (e) => {
    let firstScreen = document.getElementById('black');
    firstScreen.classList.remove('black');
    let secondScreen = document.getElementById('black1');
    secondScreen.classList.remove('black1');
    e.preventDefault();

    changeSlide('next');
});

function verticalPhoneButton() {
    let element = document.getElementById('black');

    element.classList.toggle('black');
}

function horizontalPhoneButton() {
    let element = document.getElementById('black1');

    element.classList.toggle('black1');
}

/*
 * Tags
 */

let images = document.querySelectorAll('.gallery img');

images.forEach((image) => {
    image.addEventListener('click', function(e) {
        images.forEach((imageSelected) => {
            imageSelected.classList.remove('bordered');
        });

        image.classList.add('bordered');
    });
});

let tags = document.querySelectorAll('.portfolio .tag');
let tagBox = document.getElementById('tag-box');

tags.forEach((tag) => {
    tag.addEventListener('click', function (e) {
        let currentTag = e.currentTarget;

        if (currentTag.classList.contains('currentTag-selected')) {
            return;
        }

        tags.forEach((tagSelected) => {
            tagSelected.classList.remove('currentTag-selected');
        });

        currentTag.classList.add('currentTag-selected');

        function shuffle(images) {
            let list = [];

            images.forEach((elem) => {
                list.push(elem);
            });

            list.sort(() => Math.random() - 0.5);

            list.forEach((elem) => {
                tagBox.appendChild(elem);
            });
        }

        shuffle(images);

    });

});

/*
 * Modal Window
 */

let modal = document.getElementById('modal');
let background = document.getElementById('bg');
let closeButton = document.getElementsByClassName('close')[0];

function feedbackFormSubmit() {
    modal.style.display = 'block';
    background.style.display = 'block';

    let subject = document.getElementById('subject').value;

    if (subject === '') {
        document.getElementsByClassName('theme')[0].innerText = 'Without subject';
    } else {

        document.getElementById('your-theme').innerText = subject;
    }

    let description = document.getElementById('description').value;

    if (description === '') {
        document.getElementsByClassName('description')[0].innerText = 'Without description';
    } else {

        document.getElementById('your-description').innerText = description;
    }
}

closeButton.onclick = () => {
    modal.style.display = 'none';
    background.style.display = 'none';
    document.getElementById('form').reset();
};

/*
 * Header Links
 */

let links = document.querySelectorAll('.menu-link li a');
let menuHeight = document.getElementById('container').offsetHeight;

links.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        let targetElementSelector = e.currentTarget.getAttribute('href');
        let targetElement = document.querySelector(targetElementSelector);
        let targetElementOffset = targetElement.offsetTop - menuHeight;

        window.scrollTo({
            top: targetElementOffset,
            left: 0
        });

        links.forEach((element) => {
            element.classList.remove('menu-selected');
        });

        e.currentTarget.classList.add('menu-selected');
    });
});

/*
 * Header on scroll
 */

document.addEventListener('scroll', () => {
    const curPos = window.scrollY;
    const divs = document.querySelectorAll('.box > div, .box > header');
    const menuAdditionalOffset = 5;

    divs.forEach((el) => {
        if (el.offsetTop <= curPos && (el.offsetTop + el.offsetHeight) > curPos + menuHeight + menuAdditionalOffset) {
            links.forEach((a) => {
                a.classList.remove('menu-selected');

                if (el.getAttribute('id') === a.getAttribute('href').substring(1)) {
                    a.classList.add('menu-selected');
                }
            })
        }
    });
});
