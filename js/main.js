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

  modal.querySelector('.modal__dialog').addEventListener('click', e => {
    if (e.target === e.currentTarget) handlerCloseModal()
  });
  modal.querySelector('.btn_close').addEventListener('click', () => handlerCloseModal());
  document.querySelectorAll('.callback_init')
    .forEach(button => button.addEventListener('click', e => handlerOpenCallback(e.currentTarget)));
  document.form_callback.addEventListener('submit', async e => {
    e.preventDefault();

    const form = document.getElementById('form_callback');
    const messageContainer = modal.querySelector('.modal__status');
    const data = new FormData(form)

    try {
      await postData(POST_FORM_URL, data)
        .then((res) => {
          if (res.ok) {
            messageContainer.textContent = SUCCESS_MESSAGE;
          } else {
            messageContainer.textContent = ERROR_MESSAGE;
          }
        })
    } catch (err) {
      messageContainer.textContent = ERROR_MESSAGE;
      console.error(err);
    }
  })

  function handlerOpenCallback(eTarget) {
    modal.style.display = 'block';
    setTimeout(() => modal.classList.add('open'), 50);

    modal.querySelector('.btn_submit').textContent = eTarget.textContent;
    modal.querySelector('.modal__title').textContent = eTarget.dataset.title;
    document.form_callback.elements.modalName.value = eTarget.textContent;

    document.addEventListener(
      'keydown',
      e => {
        if (e.key === "Escape") handlerCloseModal()
      },
      {once: true}
    )
  }

  function handlerCloseModal() {
    modal.classList.remove('open');
    modal.querySelector('.modal__status').textContent = '';
    setTimeout(() => modal.style.display = 'none', 600);
  }

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
   *
   */
  document.getElementById('burgerButton')?.addEventListener('click', e => {
    e.preventDefault();
    e.currentTarget.classList.toggle('active');
    document.querySelector('.nav_header')?.classList.toggle('active');
  })

  document.querySelectorAll('.nav_header .header__link')
    .forEach(link => link.addEventListener('click', () => {
        document.querySelector('.nav_header').classList.remove('active');
        document.getElementById('burgerButton').classList.remove('active');
      }
    ))

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
      640: {
        autoplay: false,
        grid: {
          rows: 4
        },
        allowTouchMove: false,
      },
    }
  })

  /**
   * Parallax
   */
  const parallaxInstance1 = new Parallax(document.getElementById('scene'));

  /**
   * Scroll progress-bar
   */
  const scrollProgress = document.getElementById('scroll-progress');
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

  window.addEventListener('scroll', () => {
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    scrollProgress.style.width = `${(scrollTop / height) * 100}%`;
  });
})
