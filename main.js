class rating {

    constructor(dom_el) {

        /* Элемент в DOM */
        this.dom_el = dom_el;

        /* Общая ширина элемента в DOM */
        this.total_width = this.dom_el.clientWidth;

        /* Начальное значение рейтинга */
        this.base_value = this.total_width / 5;

        /* Начальная заполненность рейтинга в px */
        this.base_width = this.dom_el.querySelector('.rating__bg').style.width.replace(/[^+\d]/g, '');

        /* Количество */
        this._sektor = this.total_width / 5;


        if (this.dom_el.dataset.ratingLocked == 'true') {
            this.locked = true;
        } else {
            this.locked = false;
        }

        if (!this.locked) {
            /* Навели на рейтинг */
            this.dom_el.addEventListener('mousemove', (evt) => {
                let width = evt.offsetX;
                let rating = Math.ceil(width / this._sektor);

                this._set_width_by_rating(rating);
            });

            /* Убрали курсор с рейтинга */
            this.dom_el.addEventListener('mouseleave', (evt) => {
                this._set_width_by_percent(this.base_width);
            });

            /* Фиксируем рейтинг */
            this.dom_el.addEventListener('click', (evt) => {
                let width = evt.offsetX;
                let rating = Math.ceil(width / this._sektor);

                this.base_width = this._formated_rating(rating) * 20;
                // this.rating = this._formated_rating(Math.ceil(width / this._sektor));

                /* fetch */
            })
        }
    }

    /* Устанавливаем ширину по пятибальной шкале */
    _set_width_by_rating(rating) {
        this._set_width_by_percent(this._formated_rating(rating) * 20);
    }

    /* Устанавливаем ширину в процентах */
    _set_width_by_percent(percent) {
        this.dom_el.querySelector('.rating__bg').style.width = percent + '%';
    }

    _formated_rating(rating) {
        if (rating < 1) {
            rating = 1;
        } else {
            if (rating > 5) {
                rating = 5;
            }
        }
        return rating;
    }


}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.rating').forEach(item => {
        new rating(item);
    })
});
