const headerCityButton = document.querySelector('.header__city-button');

headerCityButton.textContent = localStorage.getItem('lomoda-location') || 'Ваш город';

headerCityButton.addEventListener('click', () => {
    const city = prompt('Ваш город');
    headerCityButton.textContent = city;
    localStorage.setItem('lomoda-location', city);
})


// Блокировка скролл

const disableScroll = () => {

    const widthScroll = window.innerWidth - document.body.offsetWidth;

    document.body.dbScrollY = window.scrollY;

    document.body.style.cssText = `
        position: fixed;
        overflow: hidden;
        top: ${window.scroll};
        left: 0;
        width: 100%;
        height: 100vh;
        padding-right: ${widthScroll}px;
    `;
}

const enableScroll = () => {
    document.body.style.cssText = '';
    window.scroll({
        top: document.body.scrollY
    })
}   

// Modal window

const subheaderCart = document.querySelector('.subheader__cart');
const cartOverlay   = document.querySelector('.cart-overlay');

const cardModalOpen = () => {
    cartOverlay.classList.add('cart-overlay-open');
    disableScroll();
}

const cardModalClose = () => {
    cartOverlay.classList.remove('cart-overlay-open');
    enableScroll();
}

subheaderCart.addEventListener('click', cardModalOpen); 
cartOverlay.addEventListener('click', (event) => {
    const target = event.target;

    if(target.classList.contains('cart__btn-close') || target.classList.contains('cart-overlay')) {
        cardModalClose();
    }
});