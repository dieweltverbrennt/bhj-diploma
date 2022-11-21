/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const sidebarToggleButton = document.querySelector(".sidebar-toggle");
    sidebarToggleButton.addEventListener("click", () => {
      document.querySelector("body").classList.toggle("sidebar-open");
      document.querySelector("body").classList.toggle("sidebar-collapse");
    })
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const registerModal = App.getModal("register");
    const registerButton = document.querySelector(".menu-item_register a");
    registerButton.addEventListener("click", e => {
      e.preventDefault();
      registerModal.open();
    });

    const loginModal = App.getModal("login");
    const loginButton = document.querySelector(".menu-item_login a");
    loginButton.addEventListener("click", e => {
      e.preventDefault();
      loginModal.open();
    });

    const logoutButton = document.querySelector(".menu-item_logout a")
    logoutButton.addEventListener("click", e => {
      e.preventDefault();
      User.logout((err, response) => {
        if(err) {
          console.log(err);
          return;
        }
        if(response && response.success) {
          App.setState("init");
        }
      });

    })

    

  }
}