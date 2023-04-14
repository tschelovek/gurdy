document.addEventListener('DOMContentLoaded', () => {
    /**
     *
     * МОДАЛЬНОЕ ОКНО
     * buttons {NodeListOf<Element>} - собираем все кнопки с классом .callback_init
     * чтоб повесить хэндлер открытия модального окна
     */
    const modal = document.getElementById('modal');

    modal.querySelector('.btn_close').addEventListener('click', () => handlerCloseCallback());
    document.querySelectorAll('.callback_init')
        .forEach(button => button.addEventListener('click', e => handlerOpenCallback(e.currentTarget)));


    function handlerOpenCallback(eTarget) {
        modal.style.display = 'block';
        setTimeout(() => modal.classList.add('open'), 50);

        modal.querySelector('.btn_submit').textContent = eTarget.textContent;
        modal.querySelector('.modal__title').textContent = eTarget.dataset.title;
    }

    function handlerCloseCallback() {
        modal.classList.remove('open');
        setTimeout(() => modal.style.display = 'none', 600);
    }

    /**
     *
     * Бургер меню
     */
    document.getElementById('burgerButton')?.addEventListener('click', e => {
        e.preventDefault();
        e.currentTarget.classList.toggle('active');
        document.querySelector('.nav_header')?.classList.toggle('active');
    })

    /**
     *
     * @type {Swiper} Инициализация слайдера
     */
    const swiper = new Swiper('#slider_advantages', {
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        loop: true,
        autoplay: {
            delay: 3000,
        },
        speed: 1000,

        })

    /**
     * Parallax
     */
    const parallaxInstance1 = new Parallax(document.getElementById('scene'));

})