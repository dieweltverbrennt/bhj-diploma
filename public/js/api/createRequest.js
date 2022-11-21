/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    try {
        if(options.method === "GET") {
            for(let key in options.data) {
                const url = options.url.searchParams.set(key, options.data[key]);
            }
            xhr.open("GET", url);
            xhr.send();
        }
        else {
            xhr.open(options.method, options.url);
            const formData = new FormData();
            for(let key in options.data) {
                formData.append(key, options.data[key]);
            }
            xhr.send(formData);
        }
        xhr.addEventListener("load", () => options.callback(xhr.response.error, xhr.response));
    }
    catch(error) {
        console.log(error);
    }
};
