function Table() {
    this.person = [];

    this.addToEnd = document.getElementById('addToEnd');
    this.addToStart = document.getElementById('addToStart');
    this.addToPosition = document.getElementById('addByIndex');

    this.deleteToStart = document.getElementById('deleteToStart');
    this.deleteToEnd = document.getElementById('deleteToEnd');
    this.deleteToPosition = document.getElementById('deleteByIndex');

    this.saveOnClientToCSV = document.getElementById('saveOnClientToCSV');
    this.saveOnClientToYAML = document.getElementById('saveOnClientToYAML');
    this.saveOnClientToXML = document.getElementById('saveOnClientToXML');
    this.saveOnClientToJSON = document.getElementById('saveOnClientToJSON');

    this.saveOnServerToCSV = document.getElementById('saveOnServerToCSV');
    this.saveOnServerToYAML = document.getElementById('saveOnServerToYAML');
    this.saveOnServerToXML = document.getElementById('saveOnServerToXML');
    this.saveOnServerToJSON = document.getElementById('saveOnServerToJSON');

    const parseStringify = function (data) {
        let str = `[`;

        for (let i = 0; i < data.length; i++) {
            str += `{`;
            for (let key in data[i]) {
                str += `"${key}":`;
                if (typeof data[i][key] === 'string') {
                    str += `"`;
                    str += data[i][key];
                    str += `",`;

                } else {
                    str += data[i][key] + `,`;
                }
            }
            str = str.substr(0, str.length - 1);

            str += `}`;
            if (i !== data.length - 1) {
                str += `,`;
            }
        }
        str += `]`;

        return str;
    };

    const jsonParse = function (data) {
        let obj = [];
        let subObj = new Object();
        let str = data.substr(1, data.length-2);
        let properties = str.split('},{');

        for (let i = 0; i< properties.length; i++) {
            let str = properties[i].replace(/[{}]+/g, '');
            let arr = str.split(',');

            for (let i = 0; i < arr.length; i++) {
                let value = arr[i].replace(/['"]+/g, '');
                let tup = value.split(':');
                subObj[tup[0]] = tup[1];
            }
            obj.push(subObj);
        }

        return [...obj];
    };

    const getPositionAdd = () => {
        return document.getElementById('add-index').value;
    };

    const getPositionDelete = () => {
        return document.getElementById('delete-index').value;
    };

    const getPersonFirstName = () => {
        return document.getElementById('firstName').value;
    };

    const getPersonLastName = () => {
        return document.getElementById('lastName').value;
    };

    const getPersonAgeName = () => {
        return document.getElementById('age').value;
    };

    const reset = () => {
        document.getElementById("userFormAdd").reset();
        document.getElementById("userFormDelete").reset();
    };

    this.addToStart.addEventListener('click', event => {
        let id = new Date().getTime();
        let firstName = getPersonFirstName();
        let lastName = getPersonLastName();
        let age = getPersonAgeName();

        if (firstName && lastName && age) {
            let person = new Person(id, firstName, lastName, age);
            this.person.unshift(person);
            this.addToStartFunc(person);
        } else {
            alert('Заполните, пожалуйста, все поля!');
        }

        reset();
    });

    this.addToEnd.addEventListener('click', event => {
        let id = new Date().getTime();
        let firstName = getPersonFirstName();
        let lastName = getPersonLastName();
        let age = getPersonAgeName();

        if (firstName && lastName && age) {
            let person = new Person(id, firstName, lastName, age);
            this.person.push(person);
            this.addToEndFunc(person);
        } else {
            alert('Заполните, пожалуйста, все поля!');
        }

        reset();
    });

    this.addToPosition.addEventListener('click', event => {
        let position = getPositionAdd() - 1;
        let id = new Date().getTime();
        let firstName = getPersonFirstName();
        let lastName = getPersonLastName();
        let age = getPersonAgeName();

        if (firstName && lastName && age) {
            if (position > -1 && position < this.person.length) {
                let person = new Person(id, firstName, lastName, age);
                this.person.splice(position, 0, person);
                this.addToPositionFunc(position, person);
            } else {
                alert(`Укажите индекс больше нуля и меньше ${this.person.length}.`);
            }
        } else {
            alert('Заполните, пожалуйста, все поля!');
        }

        reset();
    });

    this.deleteToStart.addEventListener('click', event => {
        this.person.shift();
        this.deletePersonFunc(0);
        reset();
    });

    this.deleteToEnd.addEventListener('click', event => {
        this.person.pop();
        this.deletePersonFunc(-1);
        reset();
    });

    this.deleteToPosition.addEventListener('click', event => {
        let position = getPositionDelete() - 1;

        if (position > -1) {
            if (position > -1 && position < this.person.length) {
                this.person.splice(position, 1);
                this.deletePersonFunc(position);
            } else {
                alert(`Укажите индекс больше нуля и меньше ${this.person.length}.`);
            }
        } else {
            alert('Заполните, пожалуйста, поле index!');
        }

        reset();
    });

    this.saveOnServerToCSV.addEventListener('click', event => {
        if (this.person.length !== 0) {
            this.setCSV(data => {
                if(data === 'Успех!') {
                    alert('Файл успешно отправлен на сервер!');
                } else {
                    alert('Упс! Что-то пошло не так!');
                }
            });
        } else {
            alert('Нет данных для отправки на сервер!');
        }
    });

    this.saveOnServerToYAML.addEventListener('click', event => {
        if (this.person.length !== 0) {
            this.setYAML(data => {
                if(data === 'Успех!') {
                    alert('Файл успешно отправлен на сервер!');
                } else {
                    alert('Упс! Что-то пошло не так!');
                }
            });
        } else {
            alert('Нет данных для отправки на сервер!');
        }
    });

    this.saveOnServerToXML.addEventListener('click', event => {
        if (this.person.length !== 0) {
            this.setXML(data => {
                if(data === 'Успех!') {
                    alert('Файл успешно отправлен на сервер!');
                } else {
                    alert('Упс! Что-то пошло не так!');
                }
            });
        } else {
            alert('Нет данных для отправки на сервер!');
        }
    });

    this.saveOnServerToJSON.addEventListener('click', event => {
        if (this.person.length !== 0) {
            this.setJson(data => {
                if(data === 'Успех!') {
                    alert('Файл успешно отправлен на сервер!');
                } else {
                    alert('Упс! Что-то пошло не так!');
                }
            });
        } else {
            alert('Нет данных для отправки на сервер!');
        }
    });

    this.setJson = function (callback) {
        let xhr = new XMLHttpRequest();
        const body = parseStringify(this.person);

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback("Успех!");
            }
        };

        xhr.open('POST', '/json', true);
        xhr.setRequestHeader("Content-type", "application/json");

        xhr.send(body);
    };

    this.setXML = function (callback) {
        let xhr = new XMLHttpRequest();
        const body = parseStringify(this.person);

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback("Успех!");
            }
        };

        xhr.open('POST', '/xml', true);
        xhr.setRequestHeader("Content-type", "application/json");

        xhr.send(body);
    };

    this.setCSV = function (callback) {
        let xhr = new XMLHttpRequest();
        const body = parseStringify(this.person);

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback("Успех!");
            }
        };

        xhr.open('POST', '/csv', true);
        xhr.setRequestHeader("Content-type", "application/json");

        xhr.send(body);
    };

    this.setYAML = function (callback) {
        let xhr = new XMLHttpRequest();
        const body = parseStringify(this.person);

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback("Успех!");
            }
        };

        xhr.open('POST', '/yaml', true);
        xhr.setRequestHeader("Content-type", "application/json");

        xhr.send(body);
    };

    this.saveOnClientToCSV.addEventListener('click', event => {
        if (this.person.length !== 0) {
            let headers = {
                id: "id",
                firstName: "firstName",
                lastName: "lastName",
                age: "age"
            };

            let persons = [...this.person];

            this.exportCSVFile(headers, persons);
        } else {
            alert('Нет данных для записи в файл!');
        }
    });

    this.exportCSVFile = function (headers, persons) {
        if (headers) {
            persons.unshift(headers);
        }

        let csv = this.convertToCSV(persons);
        let exportedFilename = 'persons.csv';

        let blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'}); // TODO
        if (navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, exportedFilename);
        } else {
            let save = document.createElement("a");
            if (save.download !== undefined) {
                let url = URL.createObjectURL(blob);
                save.setAttribute("href", url);
                save.setAttribute("download", exportedFilename);
                document.body.appendChild(save);
                save.click();
                document.body.removeChild(save);
            }
        }
    };

    this.convertToCSV = function (persons) {
        const array = typeof persons != 'object' ? jsonParse(persons) : persons;
        let str = '';

        for (let i = 0; i < array.length; i++) {
            let line = '';
            for (let key in array[i]) {
                if (line !== '') line += ',';

                line += array[i][key];
            }

            str += line + '\r\n';
        }

        return str;
    };

    this.saveOnClientToYAML.addEventListener('click', event => {
        if (this.person.length !== 0) {
            let persons = [...this.person];
            let dataStr = "data:text/yaml;charset=utf-8," + encodeURIComponent(parseStringify(persons));
            let save = document.createElement('a');
            save.setAttribute("href", dataStr);
            save.setAttribute("download", "persons.yaml");
            document.body.appendChild(save);
            save.click();
            document.body.removeChild(save);
        } else {
            alert('Нет данных для записи в файл!');
        }
    });

    this.saveOnClientToXML.addEventListener('click', event => {
        if (this.person.length !== 0) {
            let persons = [...this.person];
            let xmlText = this.jsonToXML(persons);
            let save = document.createElement('a');

            let bb = new Blob([xmlText], {type: 'text/plain'});

            save.setAttribute('href', window.URL.createObjectURL(bb));
            save.setAttribute('download', "persons.xml");

            save.dataset.downloadurl = ['text/plain', save.download, save.href].join(':');
            save.draggable = true;
            save.classList.add('dragout');

            document.body.appendChild(save);
            save.click();
            document.body.removeChild(save);
        } else {
            alert('Нет данных для записи в файл!');
        }
    });

    this.jsonToXML = function (persons) {
        const array = typeof persons != 'object' ? jsonParse(persons) : persons;
        let str = '';

        for (let i = 0; i < array.length; i++) {
            str += `<${i}>\n\t`;
            str += `<id>${array[i].id}</id>\n\t`;
            str += `<firstName>${array[i].firstName}</firstName>\n\t`;
            str += `<lastName>${array[i].lastName}</lastName>\n\t`;
            str += `<age>${array[i].age}</age>\n`;
            str += `</${i}>\n`;
        }

        return str;
    };

    this.saveOnClientToJSON.addEventListener('click', event => {
        if (this.person.length !== 0) {
            let persons = [...this.person];
            let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(parseStringify(persons));
            let save = document.createElement('a');
            save.setAttribute("href",     dataStr);
            save.setAttribute("download", "persons.json");
            document.body.appendChild(save);
            save.click();
            document.body.removeChild(save);
        } else {
            alert('Нет данных для записи в файл!');
        }
    });
}


Table.prototype.addToEndFunc = function (person) {
    let tbody = document.getElementById("personForm").getElementsByTagName("TBODY")[0];
    const row = document.createElement("tr");
    row.innerHTML = `<td>${person.id}</td><td>${person.firstName}</td><td>${person.lastName}</td><td>${person.age}</td>`;
    tbody.appendChild(row);
};

Table.prototype.addToStartFunc = function (person) {
    let tbody = document.getElementById("personForm").getElementsByTagName("TBODY")[0];
    const row = tbody.insertRow(0);
    row.innerHTML = `<td>${person.id}</td><td>${person.firstName}</td><td>${person.lastName}</td><td>${person.age}</td>`;
};

Table.prototype.addToPositionFunc = function (position, person) {
    let tbody = document.getElementById("personForm").getElementsByTagName("TBODY")[0];
    const row = tbody.insertRow(position);
    row.innerHTML = `<td>${person.id}</td><td>${person.firstName}</td><td>${person.lastName}</td><td>${person.age}</td>`;
};

Table.prototype.deletePersonFunc = function (index) {
    let tbody = document.getElementById("personForm").getElementsByTagName("TBODY")[0];
    tbody.deleteRow(index);
};

const table = new Table();