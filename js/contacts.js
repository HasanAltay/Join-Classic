let contacts;
let sortedContacts = {};
let contactsListTasks = [];

async function fetchContacts() {
    resetList();
    fetch("/json/contacts.json")
        .then(data => data.json())
        .then(data => {
            // sorts the json array by the first letter of the first entry.
            data.sort(function (a, b) {
                let nameA = a.name.charAt(0).toLowerCase();
                let nameB = b.name.charAt(0).toLowerCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });
            contacts = data;
            initList();
        });
}

function initList() {
    contactsListTasks = [];
    for (let i = 0; i < contacts.length; i++) {
        let firstLetter = contacts[i].name[0].toUpperCase();
        if (!sortedContacts[firstLetter]) {
            sortedContacts[firstLetter] = [];
        }
        sortedContacts[firstLetter].push(contacts[i]);
    }
    for (let letter in sortedContacts) {
        let letter_box = document.getElementById("letter_box");
        letter_box.innerHTML += `
      <a class="contacts_letters">${letter}</a>
    `;
        for (let i = 0; i < sortedContacts[letter].length; i++) {
            let name_letter = sortedContacts[letter][i].name.slice(0, 1);
            let surname_letter = sortedContacts[letter][i].surname.slice(0, 1);
            let letters = name_letter + surname_letter;
            let name = sortedContacts[letter][i].name;
            let surname = sortedContacts[letter][i].surname;
            let mail = sortedContacts[letter][i].mail;
            let phone = sortedContacts[letter][i].phone;
            let color = getColor(letters);
            letter_box.innerHTML += /*html*/ `
            <button class="contacts_files" id="files" 
              onclick="initDetails('${letters}','${name}','${surname}','${mail}','${phone}','${color}');showDetails()">
              <div class="contacts_initials" id="initials" style="background-color:${color}">${letters}</div>
              <div class="contacts_name_email" id="name_email">
                <span>${name} ${surname}</span>
                <a>${mail}</a>
              </div>
            </button>
      `;
        contactsListTasks.push([letters,name,surname,color]);
        }
    }
}

function initDetails(letters, name, surname, mail, phone, color) {
    // console.log(letters, name, mail, phone);
    let contacts_details = document.getElementById("contacts_details");
    contacts_details.innerHTML = `
    <div class="details_header">
      <div class="details_initials" style="background-color:${color}">${letters}</div>
      <span class="details_name">${name} ${surname}</span>
    </div>
    <div>
      <span class="contacts_h2">Contact Information<br><br></span>
    </div>
    <div>
      <a>Email<br><br></a>
      <div>${mail}<br><br></div>
    </div>
    <div>
      <a>Mobil<br><br></a>
      <div>${phone}</div>
    </div>
    <button class="button_dark new_contact_pos" onclick="showAddContact()">Add contact</button>
    <img class="mobile_arrow" src="/img/left_arrow_blue.png" onclick="closeDetails()">
    <div class="contact_new" id="contact_new"></div>
  `;
    addContact();
}

function addContact() {
    let contact_new = document.getElementById("contact_new");
    contact_new.innerHTML = `
      <div class="contact_new_top">
        <img src="/img/logo_topbar.png">
        <span>Add contact</span>
        <a>Tasks are better with a team!</a>
      </div>
      <form class="contact_new_bottom" id="myForm" onsubmit="onFormSubmit();">

        <input type="text" placeholder="Name" name="name" maxlength="36" id="name">
        <input type="text" placeholder="Surname" name="surname" maxlength="36" id="surname">
        <input type="email" placeholder="Email" name="mail" maxlength="36" id="mail">
        <input type="number" placeholder="Phone" name="phone" maxlength="16" id="phone">

        <div class="contact_new_btns">
          <button class="button_bright" onclick="closeAddContact()">Cancel</button>
          <input type="submit" class="button_dark" onclick="submitContact()" value="Add">
        </div>
      </form>
  `;
}

function resetList() {
    contacts = [];
    sortedContacts = [];
}

function showDetails() {
    let details = document.getElementById("contacts_details");
    details.style.display = "flex";
}

function closeDetails() {
    let details = document.getElementById("contacts_details");
    details.style.display = "none";
}

function showAddContact() {
    let contact_new = document.getElementById("contact_new");
    contact_new.style.display = "block";
}

function closeAddContact() {
    let contact_new = document.getElementById("contact_new");
    contact_new.style.display = "none";
}

// function submitContact() {
//     let myForm = document.getElementById("myForm");
//     myForm.addEventListener("submit", function (event) {
//         event.preventDefault();

//         let name = document.getElementById("name").value;
//         let surname = document.getElementById("surname").value;
//         let mail = document.getElementById("mail").value;
//         let phone = document.getElementById("phone").value;

//         // create an object with the new data
//         let newData = {
//             name: name,
//             surname: surname,
//             mail: mail,
//             phone: phone,
//         };

//         // send a POST request to the server to update the JSON file
//         fetch("/json/contacts.json", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(newData),
//         })
//             .then(response => response.json())
//             .then(data => console.log(data))
//             .catch(error => console.error(error));
//     });

//     // const http = require("http");
//     // const fs = require("fs");

//     http.createServer((req, res) => {
//         if (req.method === "POST" && req.url === "/json/contacts.json") {
//             let body = "";

//             req.on("data", chunk => {
//                 body += chunk;
//             });

//             req.on("end", () => {
//                 let newData = JSON.parse(body);

//                 // read the existing data from the JSON file
//                 fs.readFile("/json/contacts.json", (err, data) => {
//                     if (err) {
//                         res.statusCode = 500;
//                         res.end("Error reading data file");
//                         return;
//                     }

//                     let jsonData = JSON.parse(data);

//                     // add the new data to the existing data
//                     jsonData.push(newData);

//                     // write the updated data back to the JSON file
//                     fs.writeFile("/json/contacts.json", JSON.stringify(jsonData), err => {
//                         if (err) {
//                             res.statusCode = 500;
//                             res.end("Error writing data file");
//                             return;
//                         }

//                         res.setHeader("Content-Type", "application/json");
//                         res.end(JSON.stringify(jsonData));
//                     });
//                 });
//             });
//         }
//     }).listen(3000, () => {
//         console.log("Server running on port 3000");
//     });
// }
