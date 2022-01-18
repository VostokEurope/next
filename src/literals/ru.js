export default {
    search: {
        result: (ctx) => `Search: '${ctx.named('search')}' shown ${ctx.named('results')} results`,
    },
    watch: {
        size: 'Size:',
        mechanism: 'Mechanism:',
        case: 'Case:',
        coating: 'Coating:',
        glass: 'Glass:',
        buy: 'КУПИТЬ СО СКИДКОЙ',
        calibres: 'Calibres: ',
        features: {
            time:'Time:',
            others:'Others:',
            luminosity:'Luminosity:',
            features: 'Additional Features'
        },
        property: {
            hours: 'hours',
            minutes: 'minutes',
            seconds: 'seconds',
            date: 'date',
            dayOfWeek: 'dayOfWeek',
            month: 'month',
            year: 'year',
            chronograph: 'chronograph',
            tacimeter: 'tacimeter',
            "12/24": '12/14',
            alarm: 'alarm',
            worldTimer: 'worldTimer',
            superlimonova: 'superlimonova',
            powerReserveIndicator: 'powerReserveIndicator',
            openBalance: 'openBalance',
            perpetualCalendar: 'perpetualCalendar',
            transparent: 'transparent',
            rotatingBezel: 'rotatingBezel',
            powerReserveCapacity: 'powerReserveCapacity',
            screwCrown: 'screwCrown',
            heliumValve: 'heliumValve',
            screwInCaseBack: 'screwInCaseBack',
            serialNumber: 'serialNumber',
            tritium: 'tritium'
        }
    },
    slider: {
        link: 'Discover'
    },
    commons: {
        business: {
            watch: "Часы",
            watches: "Часы"
        },
        logged: (ctx) => `Already logged as ${ctx.named('name')}`,
        name: "Name",
        login: "Login",
        register: "Register",
        showall: "Показать все",
        noAccount: "Don't have an account?",
        haveAccount: "Do you have an account?",
        email: "Email",
        phone: "Phone: +7 (000) 000 00 00",
        password: {
            field: "Password",
            forget: "Do you forgot Password?",
            confirm: "Repeat Password"
        },
        search: "Найти",
        save: "Сохранить",
        savepublish: "Сохранить & publish"
    },
    home: {
        news: "Новости",
        highlighted: "Избранное",
        offers: "Специальные предложения"
    },

    errors: {
        form: {
            email: '- format: sample(at)sample(dot)ru',
            required: 'Required field',
            min: (ctx) => `- ${ctx.named('length')} characters or more`
        }
    },
    collections: {
        page: {
            title: "Коллекции часов Восток-Европа (Vostok Europe)",
            description: "Мужские и женские часы Vostok Europe — это часы, изготовленные в европейском стиле и обладающие надежным швейцарским качеством.  Производство каждой модели этих часов связано с каким-нибудь научным достижением в области советского авиа-ракето-судостроения или автопрома и приурочено к созданию определенного летательного аппарата, автомобиля, корабля или подводной лодки. Ознакомьтесь с коллекциями часов «Восток-Европа» и выберите из широкого ассортимента моделей ту, которая подойдет именно вам!"
        },
    },
    legal: {
        title: 'Enlaces a las políticas de:',
        cookies: 'Cookies',
        privacy: 'Privacidad'
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

