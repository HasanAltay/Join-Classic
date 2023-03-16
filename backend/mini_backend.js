// let jsonFromServer = {};
// let jsonContactsFromServer = {};
let jsonFromServer;
let jsonContactsFromServer;
let BASE_SERVER_URL;

const backend = {
    setItem: function (key, item) {
        jsonFromServer[key] = item;
        return saveJSONToServer();
    },
    getItem: function (key) {
        if (!jsonFromServer[key]) {
            return null;
        }
        return jsonFromServer[key];
    },
    saveContacts: function (key, item) {
        jsonContactsFromServer[key] = item;
        return saveContactsToServer();
    },
    getContacts: function (key) {
        if (!jsonContactsFromServer[key]) {
            return null;
        }
        return jsonContactsFromServer[key];
    },
    deleteItem: function (key) {
        delete jsonFromServer[key];
        return saveJSONToServer();
    },
    deleteContact: function (key) {
        delete jsonContactsFromServer[key];
        return saveContactsToServer();
    },
};
window.onload = async function () {
    downloadFromServer();
};

async function downloadFromServer() {
    try {
        let result = await loadJSONFromServer();
        jsonFromServer = JSON.parse(result);
        tasksToServer = [];
        tasksToServer = JSON.parse(jsonFromServer.tasks);
        // console.log(loadJSONFromServer())

        let contacts_result = await loadCONTACTSFromServer();
        jsonContactsFromServer = JSON.parse(contacts_result);
        contacts = [];
        contacts = JSON.parse(jsonContactsFromServer.contacts);

    } catch (error) {
        console.error("Error parsing JSON:", error);
    }
}

function setURL(url) {
    BASE_SERVER_URL = url;
}

// Loads a JSON or JSON Array to the Server
// payload {JSON | Array} - The payload you want to store
async function loadJSONFromServer() {
    let response = await fetch(
        BASE_SERVER_URL +
            "/nocors.php?json=database&noache=" +
            new Date().getTime()
    );
    // console.log(response);
    return await response.text();
}

async function loadCONTACTSFromServer() {
    let response = await fetch(
        BASE_SERVER_URL +
            "/nocors.php?json=contacts&noache=" +
            new Date().getTime()
    );
    return await response.text();
}

// Saves a JSON or JSON Array to the Server
function saveJSONToServer() {
    return new Promise(function (resolve, reject) {
        let xhttp = new XMLHttpRequest();
        let proxy = determineProxySettings();
        let serverURL = proxy + BASE_SERVER_URL + "/save_json.php";
        xhttp.open("POST", serverURL);

        xhttp.onreadystatechange = function (oEvent) {
            if (xhttp.readyState === 4) {
                if (xhttp.status >= 200 && xhttp.status <= 399) {
                    resolve(xhttp.responseText);
                } else {
                    reject(xhttp.statusText);
                }
            }
        };

        xhttp.setRequestHeader(
            "Content-Type",
            "application/json;charset=UTF-8"
        );
        xhttp.send(JSON.stringify(jsonFromServer));
    });
}

function saveContactsToServer() {
    return new Promise(function (resolve, reject) {
        let xhttp = new XMLHttpRequest();
        let proxy = determineProxySettings();
        let serverURL = proxy + BASE_SERVER_URL + "/save_contacts.php";
        xhttp.open("POST", serverURL);

        xhttp.onreadystatechange = function (oEvent) {
            if (xhttp.readyState === 4) {
                if (xhttp.status >= 200 && xhttp.status <= 399) {
                    resolve(xhttp.responseText);
                } else {
                    reject(xhttp.statusText);
                }
            }
        };

        xhttp.setRequestHeader(
            "Content-Type",
            "application/json;charset=UTF-8"
        );
        xhttp.send(JSON.stringify(jsonContactsFromServer));
    });
}

function determineProxySettings() {
    return "";

    if (window.location.href.indexOf(".developerakademie.com") > -1) {
        return "";
    } else {
        return "https://cors-anywhere.herokuapp.com/";
    }
}

// function loadJSONFromServerOld() {
//     return new Promise(function (resolve, reject) {
//         let xhttp = new XMLHttpRequest();
//         let proxy = determineProxySettings();
//         let serverURL =
//             proxy +
//             BASE_SERVER_URL +
//             "/nocors.php?json=database&noache=" +
//             new Date().getTime();

//         xhttp.open("GET", serverURL);

//         xhttp.onreadystatechange = function (oEvent) {
//             if (xhttp.readyState === 4) {
//                 if (xhttp.status >= 200 && xhttp.status <= 399) {
//                     resolve(xhttp.responseText);
//                 } else {
//                     reject(xhttp.statusText);
//                 }
//             }
//         };

//         xhttp.setRequestHeader(
//             "Content-Type",
//             "application/json;charset=UTF-8"
//         );
//         xhttp.send();
//     });
// }
