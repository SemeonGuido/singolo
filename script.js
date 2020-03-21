// Menu

const navigationElement = document.querySelector(".menu");

navigationElement.addEventListener("click", event => {
    setActive("menu_link", "menu_link_active", event);
});

function setActive(elementsClass, activeClass, event) {
    if (event.target.classList.contains(`${elementsClass}`)) {
        const elements = document.querySelectorAll(`.${elementsClass}`);
        elements.forEach(element => {
            element.classList.remove(`${activeClass}`);
        });
        event.target.closest(`.${elementsClass}`).classList.add(`${activeClass}`);
    }
}

window.addEventListener('scroll', () => {
    if (window.pageYOffset >= sticky) {
        navigation.classList.add("navigation__fixed")
    } else
        navigation.classList.remove("navigation__fixed");
})


// Slider

const arrowLeftElement = document.querySelector(".chev-left");
const arrowRightElement = document.querySelector(".chev-right");
const slideElements = document.querySelectorAll(".slide-1, .slide-2");

let currentSlide = 0;
let isEnable = true;

arrowLeftElement.addEventListener("click", () => {
    if (isEnable) {
        showPreviousSlide(currentSlide);
    }
});

arrowRightElement.addEventListener("click", () => {
    if (isEnable) {
        showNextSlide(currentSlide);
    }
});

function showPreviousSlide(currentSlide) {
    hideSlide("to-right");
    changeCurrentSlide(currentSlide - 1);
    showSlide("from-left");
}

function showNextSlide(currentSlide) {
    hideSlide("to-left");
    changeCurrentSlide(currentSlide + 1);
    showSlide("from-right");
}

function hideSlide(direction) {
    isEnable = false;
    slideElements[currentSlide].classList.add(direction);
    slideElements[currentSlide].addEventListener("animationend", function () {
        this.classList.remove("slide_active", direction);
    });
}

function changeCurrentSlide(newSlide) {
    currentSlide = (slideElements.length + newSlide) % slideElements.length;
}

function showSlide(direction) {
    slideElements[currentSlide].classList.add("slide_active", direction);
    slideElements[currentSlide].addEventListener("animationend", function () {
        this.classList.remove("slide_active", direction);
        this.classList.add("slide_active");
        isEnable = true;
    });
}


// Display on-off

const slide1Element = document.querySelector(".slide-1");

slide1Element.addEventListener("click", event => {
    let phoneSelectedElement = event.target.closest(".base");

    if (phoneSelectedElement) {
        changeScreenMode(phoneSelectedElement);
    }
});

function changeScreenMode(phoneSelected) {
    const screenSelectedElement = phoneSelected.querySelector(".display");

    let currentMode;
    let newMode;

    if (screenSelectedElement.classList.contains("display_on")) {
        currentMode = "display_on";
        newMode = "display_off";
    } else {
        currentMode = "display_off";
        newMode = "display_on";
    }

    screenSelectedElement.classList.remove(`${currentMode}`);
    screenSelectedElement.classList.add(`${newMode}`);
}


//Portfolio

const portfolioButtonsElements = document.querySelector(".categories");
const galleryElement = document.querySelector(".gallery");
const picturesElements = document.querySelectorAll(".gallery.image > div");

portfolioButtonsElements.addEventListener("click", event => {
    if (event.target.classList.contains("portfolio_button")) {
        reorderPictures();
    }
    setActive("portfolio_button", "button_active", event);
    picturesElements.forEach(picture => {
        picture.classList.remove("picture_active");
    });
});

function reorderPictures() {
    const firstPicture = galleryElement.children[0];
    const firstPictureCopy = firstPicture.cloneNode();
    firstPicture.remove();
    galleryElement.append(firstPictureCopy);
}

galleryElement.addEventListener("click", event => {
    setActive(`image`, `picture_active`, event);
});

function setActive(elementsClass, activeClass, event) {
    if (event.target.classList.contains(`${elementsClass}`)) {
        const elements = document.querySelectorAll(`.${elementsClass}`);
        elements.forEach(element => {
            element.classList.remove(`${activeClass}`);
        });
        event.target.closest(`.${elementsClass}`).classList.add(`${activeClass}`);
    }
}


// Form

const formElement = document.querySelector("form");
const submitFormButton = document.querySelector("button[type='submit']");
console.log(submitFormButton);
const modalWrapperElement = document.querySelector(".modal-wrapper");
const nameInput = document.querySelector("input[name='name']");
const emailInput = document.querySelector("input[name='email']");
const subjectInput = document.querySelector("input[name='Subject']");
const textareaInput = document.querySelector("textarea");
const modalSubjectElement = document.querySelector("#modal-subject");
const modalDescriptionElement = document.querySelector("#modal-description");
const modalCloseButton = document.querySelector("#modal-close-button");

submitFormButton.addEventListener("click", event => {
    event.preventDefault();

    if (!nameInput.value) {
        nameInput.classList.add("invalid");
    }

    if (!emailInput.value) {
        emailInput.classList.add("invalid");
    }

    if (nameInput.value && emailInput.value) {
        modalWrapperElement.classList.remove("visually-hidden");
        modalSubjectElement.innerText = subjectInput.value ?
            `Тема: ${subjectInput.value}` :
            "Без темы";
        modalDescriptionElement.innerText = textareaInput.value ?
            `Описание: ${textareaInput.value}` :
            "Без описания";
        document.body.classList.add("locked");
        document.body.style.paddingRight = `${scrollWidth}px`;
    }
});

modalCloseButton.addEventListener("click", () => {
    modalWrapperElement.classList.add("visually-hidden");
    document.body.classList.remove("locked");
    formElement.reset();
    document.body.style.paddingRight = "";
});

nameInput.addEventListener("focus", function () {
    this.classList.remove("invalid");
});

emailInput.addEventListener("focus", function () {
    this.classList.remove("invalid");
});