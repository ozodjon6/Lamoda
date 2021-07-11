const headerCityButton = document.querySelector('.header__city-button');

let hash = location.hash.substring(1);

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
const cartOverlay = document.querySelector('.cart-overlay');

const cardModalOpen = () => {
    cartOverlay.classList.add('cart-overlay-open');
    disableScroll();
}

const cardModalClose = () => {
    cartOverlay.classList.remove('cart-overlay-open');
    enableScroll();
}

// Запрос базы данных

const getData = async () => {
    const data = await fetch('db.json');

    if (data.ok) {
        return data.json();
    } else {
        throw new Error(`Данные не была получен, ошибка ${data.status} ${data.statusText}`);
    }
}

const getGoods = (callback, value) => {
    getData()
        .then(data => {
            if(value) {
                callback(data.filter(item => item.category === value))
            } else { 
                callback(data);
            }
            
        })
        .catch(err => {
            console.err(err);
        })
};

// Modal window

subheaderCart.addEventListener('click', cardModalOpen);
cartOverlay.addEventListener('click', (event) => {
    const target = event.target;

    if (target.matches('.cart__btn-close') || target.matches('.cart-overlay')) {
        cardModalClose();
    }
}); 

// Запрос базы данных

try {

    const goodsList = document.querySelector('.goods__list');

    if(!goodsList) {
        throw('This is not a goods page');
    }

    const createCard = ({id, preview, cost, brand, name, sizes}) => {
        const li = document.createElement('li');
        li.classList.add('goods__item');

        li.innerHTML = `
            <li class="goods__item">
                <article class="good">
                    <a class="good__link-img" href="card-good.html#${id}">
                        <img class="good__img" src="goods-image/${preview}" alt="">
                    </a>
                    <div class="good__description">
                        <p class="good__price">${cost} ₽</p>
                        <h3 class="good__title">${brand} <span class="good__title__grey">/ ${name}</span></h3>
                        ${sizes ? `<p class="good__sizes">Размеры (RUS): <span class="good__sizes-list">${sizes.join(' ')}</span></p>` : ''}
                        <a class="good__link" href="card-good.html#${id}">Подробнее</a>
                    </div>
                </article>
            </li>
        `;

        return li;
    };

    const renderGoodsList = data => {
        goodsList.textContent = '';

        data.forEach(item => {
            const card = createCard(item);
            goodsList.appendChild(card);
        })
    }

    window.addEventListener('hashchange', () => {
        hash = location.hash.substring(1);
        getGoods(renderGoodsList, hash);

        /* Home-work */
        
        const goodsTitle = document.querySelector('.goods__title');
        const navigationItem = document.querySelectorAll('.navigation__item');

        navigationItem.forEach(item => {
            item.addEventListener('click', () => {
                if(item) {
                    goodsTitle.textContent = item.textContent;
                }
            })
        })
    })

    getGoods(renderGoodsList);
} 

catch (e) {
    console.error(e);
}