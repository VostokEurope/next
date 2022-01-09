export default {
    header: {
        account: 'account',
        contact: 'email',
        claim: {
            2: 'phone',
            3: 'wats'
        }
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
        or: "or",
        email: "Email",
        required: "Required field",
        acceptTerms: "Accept <a href=\"/legal/terminos-y-condiciones\">terms & conditions</a> Vostok Europe.",
        user: "User",
        password: {
            field: "Password",
            forget: "Do you forgot Password?",
            confirm: "Repeat Password"
        },
        footer: {
            terms: "Правила пользования сайтом",
            privacy: "Политика конфиденциальности",
            contact: "Контакты",
            payment: "Оплата и доставка"
        },
        search: "Найти",
        save: "Сохранить"
    },
    navigation: {
        home: "Главная",
        collections: "Коллекции",
        offers: "Специальные предложения",
        admin: "Администрация"
    },
    product: {
        size: "Size",
        mechanism: "Mechanism",
        calibre: "Calibre/s",
        gender: "Gender",
        case: "Case",
        glass: "Glass",
        resistance: "Resistance",
        time: "Time Properties",
        feature: "Features",
        luminosity: "Luminosity",
        properties: "Other properties",
        buy: "Buy",
        stock: {
            empty: "Without stock"
        }
    },
    home: {
        news: "Новости",
        highlighted: "Избранное",
        offers: "Специальные предложения"
    },
    admin: {
        title: "Администрация",
        watches: "Часы",
        bracelets: "Ремни и браслеты",
        properties: "Характеристики",
        cases: "Корпус",
        coatings: "Покрытие",
        collections: "Коллекции",
        glasses: "Стекло",
        calibres: "Calibres",
        mechanisms: "Механизм",
        origins: "Страна производства",
        promos: "Промоакции",
        resistances: "Водонепроницаемость",
        users: "Пользователи",
        propertyTypes: "Типы характеристик",
        new: "Новинка",
        deleteMessage: "Удалить из базы данных",
        field: {
            code: "Код",
            text: "Текст",
            optional: "(Дополнительно)",
            type: "Тип",
            unity: "Единицы измерения",
            name: "Name",
            surname: "Surname",
            email: "Email",
            role: "Role",
            newPassword: "New Password",
            basic: "Basic Fields",
            numeric: "Numeric Fields",
            slug: "Slug",
            model: "Model",
            price: "Price (₽)",
            stock: "Stock",
            discount: "Discount",
            width: "Width (cm)",
            height: "Height (cm)",
            thickness: "Thickness (cm)",
            description: "description",
            size: "Size Fields"
        }
    },
    errors: {
        contact: "Если проблема сохранится, <a href=\"mailto:info@vostokeurope.shop\">свяжитесь с нами</a>.",
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
        heading: "Sus relojes"
    },
    validations: {
        required: "Required field",
        cap: "Debe contener una letra mayúscula.",
        lower: "Debe contener una letra minúscula.",
        number: "Debe contener un número.",
        special: "Debe contener un carácter especial: #?!@$%^&*-."
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
        admin: "Администрация"
    }
}

