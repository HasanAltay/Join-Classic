let contacts = [];
let sortedContacts = {};
let contactsListTasks = [];
let pickedContact;

function saveNewContact() {
    const add_name = document.getElementById("add_name").value;
    const add_surname = document.getElementById("add_surname").value;
    const add_mail = document.getElementById("add_mail").value;
    const add_phone = document.getElementById("add_phone").value;
    const new_contact = {
        name: add_name,
        surname: add_surname,
        phone: add_phone,
        mail: add_mail,
    };
    contacts.push(new_contact);
    backend.saveContacts("contacts", JSON.stringify(contacts));
    console.log("Server:", jsonContactsFromServer.contacts);
    // downloadFromServer();
    // initLettersFromContacts();
}

function editExistingContact() {
    const edit_name = document.getElementById("edit_name").value;
    const edit_surname = document.getElementById("edit_surname").value;
    const edit_mail = document.getElementById("edit_mail").value;
    const edit_phone = document.getElementById("edit_phone").value;
    const edited_contact = {
        name: edit_name,
        surname: edit_surname,
        phone: edit_phone,
        mail: edit_mail,
    };
    contacts[pickedContact] = edited_contact;
    backend.saveContacts("contacts", JSON.stringify(contacts));
}

async function initLettersFromContacts() {
    // console.log(typeof contacts);
    if (contacts.length > 0) {
        contacts.sort(function (a, b) {
            let nameA = (a.name || "").charAt(0).toLowerCase();
            let nameB = (b.name || "").charAt(0).toLowerCase();
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
}

function initList(contacts) {
    contactsListTasks = [];
    let letter_box = document.getElementById("letter_box");
    for (let i = 0; i < contacts.length; i++) {
        const firstLetter = contacts[i].name[0].toUpperCase();
        if (!sortedContacts[firstLetter]) {
            sortedContacts[firstLetter] = [];
        }
        sortedContacts[firstLetter].push(contacts[i]);
    }
    for (let letter in sortedContacts) {
        letter_box.innerHTML += `
          <a class="contacts_letters">${letter}</a>
        `;
        for (let i = 0; i < sortedContacts[letter].length; i++) {
            let name_letter = sortedContacts[letter][i].name.slice(0, 1);
            let surname_letter = sortedContacts[letter][i].surname.slice(0, 1);
            let letters = (name_letter + surname_letter).toUpperCase();
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
      <span class="details_name">${name} ${surname}<br>
        <a><img src="./img/plus_blue.png">Add Task</a>
      </span>
    </div>
    <div>
      <span class="contacts_h2">Contact Information<a onclick="showEditContact()">
        <img src="./img/pen_blue.png">Edit Contact</a><br><br>
      </span>
    </div>
    <div>
      <b>Email<br><br></b>
      <a href="mailto:${mail}">${mail}<br><br></a>
    </div>
    <div>
      <b>Phone<br><br></b>
      <a href="tel:${phone}">${phone}</a>
    </div>
    <button class="button_dark new_contact_pos" onclick="showAddContact()">Add contact
      <img src="./img/add_contact.png">
    </button>
    <img class="mobile_arrow" src="./img/left_arrow.png" onclick="closeDetails()">
  `;
    addContact();
    editContact(name, surname, mail, phone);
    // console.log(contacts);
}

// adds new contact to the list
function addContact() {
    let msg = "New Contact added!";
    let contact_new = document.getElementById("contact_new");
    contact_new.innerHTML = `
    <div class="contact_new_top">
      <img class="contact_new_edit_close_btn" src="./img/close.png" onclick="closeAddContact()"> 
      <img class="contacts_logo" src="./img/logo_topbar.png"> 
      <span>Add contact</span> 
      <a>Tasks are better with a team!</a> 
    </div> 
    <form class="contact_new_bottom" id="add_contact" onsubmit="onFormSubmit();"> 
      <input type="text" placeholder="Name" name="name" maxlength="36" id="add_name"> 
      <input type="text" placeholder="Surname" name="surname" maxlength="36" id="add_surname"> 
      <input type="email" placeholder="Email" name="mail" maxlength="36" id="add_mail"> 
      <input type="tel" placeholder="Phone" name="phone" id="add_phone" 
        pattern="[0-9]{10,16}" title="Please enter a valid phone number (between 10 and 16 digits)"> 
      <div class="contact_new_btns"> 
        <button class="button_bright" onclick="closeAddContact()">Cancel</button> 
        <button type="submit" class="button_dark" 
          onclick="saveNewContact();
            showConfirmationContact(true,'${msg}');">Add
        </button> 
      </div> 
    </form>
  `;
}

// edit existing contact from the list
function editContact(name, surname, mail, phone) {
    // finds the position of the picked contact for editing
    const firstLetter = name.charAt(0).toUpperCase();
    const contactsStartingWithLetter = sortedContacts[firstLetter];
    for (let i = 0; i < contactsStartingWithLetter.length; i++) {
        const contact = contactsStartingWithLetter[i];
        if (contact.name === name && contact.surname === surname) {
            pickedContact = contacts.indexOf(contact);
        }
    }
    let msg = "Your change is saved!";
    let contact_edit = document.getElementById("contact_edit");
    contact_edit.innerHTML = `
  <div class="contact_new_top">
    <img class="contact_new_edit_close_btn" src="./img/close.png" onclick="closeEditContact()">
    <img class="contacts_logo" src="./img/logo_topbar.png">    
    <span>Edit contact</span>  
  </div> 
  <form class="contact_new_bottom" id="edit_contact" onsubmit="onFormSubmit();"> 
    <input type="text" placeholder="Name" name="name" maxlength="36" id="edit_name" value="${name}"> 
    <input type="text" placeholder="Surname" name="surname" maxlength="36" id="edit_surname" value="${surname}"> 
    <input type="email" placeholder="Email" name="mail" maxlength="36" id="edit_mail" value="${mail}"> 
    <input type="tel" placeholder="Phone" name="phone" id="edit_phone" pattern="[0-9]{10,16}" 
      title="Please enter a valid phone number (between 10 and 16 digits)" value="${phone}"> 
    <div class="contact_new_btns">
      <button type="submit" class="button_dark" 
        onclick="editExistingContact();
          showConfirmationContact(true,'${msg}');">Save
      </button> 
    </div> 
  </form>
`;
}

function showConfirmationContact(a, msg) {
    console.log(msg);
    let confirm_msg = document.getElementById('confirm_msg');
    confirm_msg.innerHTML = msg;
    let contact_confirmation = document.getElementById(
        "contact_confirmation"
    );
    if (a) {
        contact_confirmation.style.visibility = "visible";
    }
    if (!a) {
        contact_confirmation.style.visibility = "hidden";
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

function showEditContact() {
    let contact_edit = document.getElementById("contact_edit");
    contact_edit.style.display = "block";
}

function closeEditContact() {
    let contact_edit = document.getElementById("contact_edit");
    contact_edit.style.display = "none";
}
