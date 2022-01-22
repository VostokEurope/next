export default {
    search: {
        result: (ctx) => `Поиск: '${ctx.named('search')}' показал ${ctx.named('results')} результатов`,
    },
    page: {
        collection: {
            title: (ctx) =>`${ctx.named('item')}' kollektsiya`
        },
        collections: {
            title: "Коллекции часов Восток-Европа (Vostok Europe)",
            description: "Мужские и женские часы Vostok Europe — это часы, изготовленные в европейском стиле и обладающие надежным швейцарским качеством.  Производство каждой модели этих часов связано с каким-нибудь научным достижением в области советского авиа-ракето-судостроения или автопрома и приурочено к созданию определенного летательного аппарата, автомобиля, корабля или подводной лодки. Ознакомьтесь с коллекциями часов «Восток-Европа» и выберите из широкого ассортимента моделей ту, которая подойдет именно вам!"
        },
        watch: {
            title: (ctx) => `Восток Европа  - Часы ${ctx.named('name')}`
        }
    },
    cart: {
        delete: 'Удалить',
        empty: 'Ваша корзина пуста',
        buy: 'Перейти в корзину'
    },
    watch: {
        size: 'Размер:',
        mechanism: 'Механизм:',
        case: 'Корпус:',
        coating: 'Покрытие:',
        glass: 'Стекло:',
        buy: 'КУПИТЬ СО СКИДКОЙ',
        calibres: 'Калибр:',
        bracelets: 'Bracelets:',
        dialColor: 'Цвет циферблата:',
        gender: {
            value: 'gender:',
            male: 'male',
            female: 'female',
            unisex: 'unisex'
        },
        features: {
            time:'Функции:',
            others:'Дополнительно:',
            luminosity:'Подсветка:',
            features: 'Аксессуары'
        },
        resistance: {
            value: 'Resistance:',
            unity: 'ATM'
        },
        property: {
            hours: 'часы',
            minutes: 'минуты',
            seconds: 'секунды',
            date: 'дата',
            dayOfWeek: 'день недели',
            month: 'месяц',
            year: 'год',
            chronograph: 'хронограф',
            tacimeter: 'тахиметр',
            "12/24": '12/24-часовой формат',
            alarm: 'будильник',
            worldTimer: 'мировое время',
            superlimonova: 'покрытие Super-LumiNova',
            powerReserveIndicator: 'ретроградный индикатор запаса хода',
            openBalance: 'открытый баланс',
            perpetualCalendar: 'вечный календарь',
            transparent: 'прозрачная задняя крышка',
            rotatingBezel: 'вращающийся безель',
            powerReserveCapacity: 'запас хода',
            screwCrown: 'завинчивающаяся заводная головка',
            heliumValve: 'автоматический гелиевый декомпрессионный клапан',
            screwInCaseBack: 'завинчивающаяся задняя крышка',
            serialNumber: 'с гравировкой серийного номера',
            tritium: 'тритиевые трубки (GTLS «Trigalight»)',
            braceletSet: 'комплект ремней',
            screwDriver: 'отвертка для смены ремней / VE Multitool',
            dryBox: 'противоударный водонепроницаемый чемоданчик'
        }
    },
    slider: {
        link: 'Посмотреть коллекцию'
    },
    commons: {
        business: {
            watch: "Часы",
            watches: "Часы"
        },
        logged: (ctx) => `Already logged as ${ctx.named('name')}`,
        name: "Имя",
        login: "Войти",
        register: "Зарегистрироваться",
        showall: "Показать все",
        noAccount: "Еще не зарегистрированы?",
        haveAccount: "Вы зарегистрированы?",
        email: "Email",
        phone: "Телефон: +7 (000) 000 00 00",
        password: {
            field: "Пароль",
            forget: "Забыли пароль?",
            confirm: "Повторите пароль"
        },
        search: "Найти",
        save: "Сохранить",
        savepublish: "Сохранить & опубликовать"
    },
    home: {
        news: "Новости",
        highlighted: "Избранное",
        offers: "Специальные предложения"
    },

    errors: {
        form: {
            email: '- формат: sample(at)sample(dot)ru',
            required: 'Обязательно для заполнения',
            min: (ctx) => `- ${ctx.named('length')} characters or more`
        }
    },
    legal: {
        title: '',
        cookies: 'Политика Cookies',
        privacy: 'Политика конфиденциальности'
    },
    router: {
        home: "Главная",
        collections: "Коллекции",
        offers: "Специальные предложения",
        admin: "Администрация",
        contact: "Контакты",
        delivery: "Оплата и доставка",
        guaranty: "Гарантия и сервис"
    }
}

