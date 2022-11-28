/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    const url = new URL(options.url, location.origin);
    const formData = new FormData();
    if(options.method === "GET") {
        for(let key in options.data) {
            url.searchParams.set(key, options.data[key]);
        }
    }
    if(options.method != "GET") {
        for(let key in options.data) {
            formData.append(key, options.data[key]);
        }
    }

    try {
        xhr.open(options.method, url);
        xhr.send(formData);
    }
    catch(error) {
        console.error(error)
    }

    xhr.addEventListener("load", () => options.callback(xhr.response.error, xhr.response));
};
