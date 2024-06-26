import LocalizedStrings from "react-localization";

const strings = {
  en: {
    common: {
      authExit: "Exit",
      authEntrance: "Authorization",
      headerBooks: "Books",
      headerAutor: "Autors",
      headerCreatBook: "Add book",
    },
    authModal: {
      authEntrance: "Authorization",
      authRegistr: "Registration",
      authPassword: "Enter the password",
      authEmail: "Enter email",
    },
    bookModal: {
      bookModalStok: "In stock",
      bookModalTitle: "Title",
      bookModalDescr: "Description",
      bookModalPrice: "Price",
      bookModalGenres: "Genres",
      bookModalAuthor: "Author",
      bookModalRelease: "Release date",
      bookModalWriting: "Writing date",
      bookModalCreat: "Creat",
    },
    cartPage: {
      cartPageStock: "Stok",
      cartPageTitle: " Shopping Cart",
      cartPageProduct: "Product",
      cartPagePrice: " Grand Total  ",
      cartPageImage: "Image",
      cartPageRemove: "Remove",
      cartPageQuantity: "Quantity",
      cartPageCheckout: "Checkout",
    },
    makeOrderModal: {
      makeOrderModalDetail: "Shipping Details",
      makeOrderModalCity: "CITY",
      makeOrderModalAdress: "ADDRESS",
      makeOrderModalZicope: "ZIPCODE",
      makeOrderModalMaking: "MAKING AN ORDER",
    },
    bookPage: {
      search: "Search",
      title: "Title",
      price: "Price",
    },
    bookCard: {
      price: "Price:",
      purchase: "Purchase",
    },
    error: {
      autorDelet: "This is Autor Cart Delit an error",
      makeOrder: "This is success make order",
      makeOrderError: "This is makeOrder an error",
      cartPatchError: "This is add cart an error",
      paginationError: "This is makeOrder an error",
      filterBooksError: "This is filter books an error",
      BookError: "This is book list an error",
    },
  },

  ru: {
    common: {
      authExit: "Выйти",
      authEntrance: "Авторизация",
      headerBooks: "Книги",
      headerAutor: "Авторы",
      headerCreatBook: "Добавить книгу",
    },
    authModal: {
      authEntrance: "Авторизация",
      authRegistr: "Регистрация",
      authPassword: "Введите пароль",
      authEmail: "Введите почту",
    },
    bookModal: {
      bookModalStok: "В наличии",
      bookModalTitle: "Заглавие",
      bookModalDescr: "Описание",
      bookModalPrice: "Цена",
      bookModalGenres: "Жанры",
      bookModalAuthor: "Авторы",
      bookModalRelease: "Дата релиза",
      bookModalWriting: "Конец релиза",
      bookModalCreat: "Создать",
    },
    cartPage: {
      cartPageStock: "Наличие",
      cartPageTitle: "Корзина покупок",
      cartPageProduct: "Продукт",
      cartPagePrice: "Общая сумма",
      cartPageImage: "Картинка",
      cartPageRemove: "Удалить",
      cartPageQuantity: "Количество",
      cartPageCheckout: "Заказать",
    },
    makeOrderModal: {
      makeOrderModalDetail: "Детали заказа",
      makeOrderModalCity: "ГОРОД",
      makeOrderModalAdress: "АДРЕС",
      makeOrderModalZicope: "ИНДЕКС",
      makeOrderModalMaking: "ОФОРМЛЕНИЕ ЗАКАЗА",
    },
    bookPage: {
      search: "Поиск",
      title: "Заголовок",
      price: "Цена",
    },
    bookCard: {
      price: "Цена:",
      purchase: "Приобрести",
    },
    error: {
      autorDelet: "Ошибка при удалении карзины",
      makeOrder: "Вы успешно оформили заказ",
      makeOrderError: "Ошибка при оформили заказ",
      cartPatchError: "Ошобка при добавлении в карзину",
      paginationError: "Ошибка при переключении страницы",
      filterBooksError: "Ошибка при фильтрации книг",
      BookError: "Ошибка при получении книг",
    },
  },
} as const;

export const l10n = new LocalizedStrings(strings);
