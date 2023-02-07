window.Helper = {
    /**
     * Create bew DOMElement in Native JavaScript
     *
     * @param tagName String - is for
     * @param content Array|DOMElement|string
     * @param attributes object {attributeName: attributeValue}
     * @param events object {eventName: callback}
     * @returns DOMElement
     */
    createElement(tagName, content = undefined, attributes = {}, events = {}) {
        let el = document.createElement(tagName);
        if (content !== undefined) {
            if (Array.isArray(content)) {
                for (const key in content) {
                    el.append(content[key]);
                }
            } else if (typeof content === "object") {
                el.append(content);
            } else {
                el.innerText = content;
            }
        }
        for (const key in attributes) {
            if (Array.isArray(attributes[key])) {
                el.setAttribute(key, attributes[key].join(" "));
            } else {
                el.setAttribute(key, attributes[key]);
            }
        }
        for (const key in events) {
            if (Array.isArray(events[key])) {
                let listeners = events[key];
                for (const index in listeners) {
                    el.addEventListener(key, listeners[index]);
                }
            } else {
                el.addEventListener(key, events[key]);
            }
        }
        return el;
    },
    /**
     * Mapping array
     *
     * @param array
     * @param property1
     * @param property2
     * @returns {*[]}
     */
    map(array, property1, property2) {
        let result = [];
        for (let i = 0; i < array.length; i++) {
            let item = array[i];
            if (item.hasOwnProperty(property1)) {
                result[item[property1]] = item[property2];
            }
        }
        return result;
    },
    /**
     * Create AJAX Request
     *
     * @param url
     * @param data
     * @param options
     * @returns {any}
     */
    ajax(url, data = {}, options = {method: "GET"}) {
        let xhr = new XMLHttpRequest();
        switch (options.method.toUpperCase()) {
            case "GET":
                url += '?' + (new URLSearchParams(data)).toString();
                data = null;
                break;
            case "POST":
                data = JSON.stringify(data);
                break;
        }
        xhr.open(options.method, url, false);
        for (const key in options.headers) {
            xhr.setRequestHeader(key, options.headers[key]);
        }
        try {
            xhr.send(data);
            if (xhr.status !== 200) {
                alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
            } else {
                return JSON.parse(xhr.response);
            }
        } catch (err) {
            alert("Запрос не удался");
        }
    }
}