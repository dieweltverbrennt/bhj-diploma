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
                options.url.searchParams.set(key, options.data[key]);
            }
            xhr.open("GET", options.url);
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
        options.callback(xhr.response.error, xhr.response);
    }
    catch(error) {
        console.error(error);
    }
    


};
