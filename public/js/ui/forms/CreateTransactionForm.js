/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const userData = User.current();
    if(userData) {
      Account.list(userData, (err,response) => {
        if(err) {
          console.error(err);
        }
        if(response.data) {
          const selectAccountForm = this.element.account_id;

          const accountList = response.data.reduce((optionList, option) => {
            optionList += `<option value="${option.id}">${option.name}</option>`;
            return optionList;
          }, "");

          selectAccountForm.innerHTML = accountList;

        }})
      }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
  Transaction.create(data, (err, response) => {
    if(err) {
      console.error(err);
    }
    if(response && response.success) {
      this.element.reset();
      if(App.getModal("newIncome")) {
        App.getModal("newIncome").close();
      }
      if(App.getModal("newExpense")) {
        App.getModal("newExpense").close();
      }
      App.update();
    }
  });
  }
}