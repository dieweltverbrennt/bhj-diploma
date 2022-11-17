/**
 * Класс Transaction наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/transaction'
 * */
class Transaction extends Entity {
  static URL = "/transaction";
    static get(id = '', callback){
        createRequest({
          url: this.URL,
          data: data,
          method: "GET",
          callback: callback
        })
      }
}

