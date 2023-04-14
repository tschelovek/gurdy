document.addEventListener('DOMContentLoaded', () => {
    /**
     *
     * МОДАЛЬНОЕ ОКНО
     * buttons {NodeListOf<Element>} - собираем все кнопки с классом .callback_init
     * чтоб повесить хэндлер открытия модального окна
     *
     */
    const POST_FORM_URL = '/telegram-bot/';
    const SUCCESS_MESSAGE = 'Ваша заявка успешно отправлена';
    const ERROR_MESSAGE = 'При отправке произошли проблемы! Повторите попытку позже или свяжитесь с нами иными способами!';
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
        modal.querySelector('.modal__status').textContent = '';
        setTimeout(() => modal.style.display = 'none', 600);
    }

    modal.addEventListener('submit', async e => {
        e.preventDefault();

        const form = document.getElementById('form_callback');
        const messageContainer = modal.querySelector('.modal__status');
        const data = new FormData(form)

        try {
            await postData(POST_FORM_URL, data)
                .then(() => {
                    messageContainer.textContent = SUCCESS_MESSAGE;
                })
        } catch (err) {
            messageContainer.textContent = ERROR_MESSAGE;
            console.error(err)
        }
    })

    async function postData(url = '', data = {}) {
        await fetch(url, {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'form/multipart'
            },
            body: data
        })
            .catch(() => {
                throw Error
            })
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
        // navigation: {
        //     nextEl: '.swiper-button-next',
        //     prevEl: '.swiper-button-prev',
        // },
        loop: true,
        autoplay: {
            delay: 3000,
        },
        speed: 1000,
        breakpoints: {
            320: {
                autoHeight: true,
            },
            640: {
                grid: {
                    rows: 4
                }
            },
            autoHeight: false,
        }
    })

    /**
     * Parallax
     */
    const parallaxInstance1 = new Parallax(document.getElementById('scene'));

})