let contacts = [];
let sortedContacts = {};
let contactsListTasks = [];

function saveNewContact() {
    const add_name = document.getElementById("name").value;
    const add_surname = document.getElementById("surname").value;
    const add_mail = document.getElementById("mail").value;
    const add_phone = document.getElementById("phone").value;
    const new_contact = {
        name: add_name,
        surname: add_surname,
        phone: add_phone,
        mail: add_mail,
    };
    contacts.push(new_contact);
    backend.saveContacts("contacts", JSON.stringify(contacts));
}

async function initLettersFromContacts() {
    contacts.sort(function (a, b) {
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
    sortedContacts = {}; // clear sortedContacts object
    letter_box.innerHTML = ""; // clear letter_box element
    initList(contacts);
}

function initList(contacts) {
    contactsListTasks = [];
    
    let letter_box = document.getElementById("letter_box");
    for (let i = 0; i < contacts.length; i++) {
        // console.log(contacts);
        const firstLetter = contacts[i].name[0].toUpperCase();
        if (!sortedContacts[firstLetter]) {
            sortedContacts[firstLetter] = [];
        }
        sortedContacts[firstLetter].push(contacts[i]);
        // console.log(sortedContacts);
    }
    for (let letter in sortedContacts) {
        letter_box.innerHTML += `
          <a class="contacts_letters">${letter}</a>
        `;
        for (let i = 0; i < sortedContacts[letter].length; i++) {
            let name_letter = sortedContacts[letter][i].name.slice(0, 1);
            let surname_letter = sortedContacts[letter][i].surname.slice(0, 1);
            let letters = (name_letter+surname_letter).toUpperCase();
            let name = sortedContacts[letter][i].name;
            let surname = sortedContacts[letter][i].surname;
            let mail = sortedContacts[letter][i].mail;
            let phone = sortedContacts[letter][i].phone;
            let color = getColor(letters);

            contactsListTasks.push([letters, name, surname, color]);
            letter_box.innerHTML += /*html*/ `
              <button class="contacts_files" id="files" 
                onclick="initDetails('${letters}','${name}','${surname}',
                '${mail}','${phone}','${color}');showDetails()">
                <div class="contacts_initials" id="initials" 
                  style="background-color:${color}">${letters}</div>
                <div class="contacts_name_email" id="name_email">
                  <span>${name} ${surname}</span>
                  <a>${mail}</a>
                </div>
              </button>
            `;
        }
    }
}

// show detailed contact list informations on right side
function initDetails(letters, name, surname, mail, phone, color) {
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
      <b>Email<br><br></b>
      <a href="mailto:${mail}">${mail}<br><br></a>
    </div>
    <div>
      <b>Phone<br><br></b>
      <a href="tel:${phone}">${phone}</a>
    </div>
    <button class="button_dark new_contact_pos" onclick="showAddContact()">Add contact<img src="./img/add_contact.png"></button>
    <img class="mobile_arrow" src="./img/left_arrow.png" onclick="closeDetails()">
    <div class="contact_new" id="contact_new"></div>
  `;
    addContact();
}

// adds new contact to the list
function addContact() {
    let contact_new = document.getElementById("contact_new");
    contact_new.innerHTML = `
    <div class="contact_new_top"> 
      <img src="./img/logo_topbar.png"> 
      <span>Add contact</span> 
      <a>Tasks are better with a team!</a> 
    </div> 
    <form class="contact_new_bottom" id="myForm" onsubmit="onFormSubmit();"> 
      <input type="text" placeholder="Name" name="name" maxlength="36" id="name"> 
      <input type="text" placeholder="Surname" name="surname" maxlength="36" id="surname"> 
      <input type="email" placeholder="Email" name="mail" maxlength="36" id="mail"> 
      <input type="tel" placeholder="Phone" name="phone" id="phone" pattern="[0-9]{10,16}" title="Please enter a valid phone number (between 10 and 16 digits)"> 
      <div class="contact_new_btns"> 
        <button class="button_bright" onclick="closeAddContact()">Cancel</button> 
        <button type="submit" class="button_dark" onclick="saveNewContact();showConfirmationAddContact(a=true);" value="Add">Add</button> 
      </div> 
    </form>
  `;
}

function showConfirmationAddContact(a) {
    let contact_added_confirmation = document.getElementById(
        "contact_added_confirmation"
    );
    if (a) {
        contact_added_confirmation.style.visibility = "visible";
    }
    if (!a) {
        contact_added_confirmation.style.visibility = "hidden";
    }
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
