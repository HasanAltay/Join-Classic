let contacts = [];
let sortedContacts = {};
let contactsListTasks = [];
let pickedContact;

function saveNewContact() {
    event.preventDefault();
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
    showConfirmationContact(true,"New Contact added!");
}

function editExistingContact() {
    event.preventDefault();
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
    showConfirmationContact(true,"Your change is saved!");
}

async function initLettersFromContacts() {
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
                '${mail}','${phone}','${color}','${i}');showDetails()">
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
function initDetails(letters, name, surname, mail, phone, color, i) {
    let contacts_details = document.getElementById("contacts_details");
    contacts_details.innerHTML = `
    <div class="details_header">
      <div class="details_initials" style="background-color:${color}">${letters}</div>
      <span class="details_name">${name} ${surname}<br>
        <a onclick="addTaskWithContact('${letters}','${color}','${name}','${surname}','${i}')">
        <img src="./img/plus_blue.png" alt="Plus Icon">Add Task</a>
      </span>
    </div>
    <div>
      <span class="contacts_h2">Contact Information<a onclick="showEditContact('${name}','${surname}','${mail}','${phone}')">
        <img src="./img/pen_blue.png" alt="Pen Icon">Edit Contact</a>
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
      <img src="./img/add_contact.png" alt="Hook Icon">
    </button>
    <img class="mobile_arrow" src="./img/left_arrow.png" onclick="closeDetails()" alt="Arrow">
  `;
}

// adds a new contact to the contacts-list
function addContact() {
    let contact_new = document.getElementById("contact_new");
    contact_new.innerHTML = `
    <div class="contact_new_top">
      <img class="contact_new_edit_close_btn" src="./img/close.png" onclick="closeAddContact()" alt="Close"> 
      <img class="contacts_logo" src="./img/logo_topbar.png" alt="Join Logo"> 
      <span>Add contact</span> 
      <a>Tasks are better with a team!</a>
      <div class="contact_profile_container"></div>   
    </div> 

    <form class="contact_new_bottom" id="add_contact" onsubmit="saveNewContact()">

      <input type="text" placeholder="First name (*)" maxlength="12" id="add_name" name="firstname" required> 
      <input type="text" placeholder="Last name" maxlength="12" id="add_surname"> 
      <input type="email" placeholder="Email (*)" maxlength="28" id="add_mail" name="email" required> 
      <input type="tel" placeholder="Phone" maxlength="21" id="add_phone" 
        title="Please enter a valid phone number (between 10 and 16 digits)">

      <div class="contact_new_btns"> 
        <button class="button_bright" onclick="closeAddContact()">Cancel</button> 
        <button type="submit" class="button_dark">Add<img src="./img/check.png" alt="Check Icon" />
        </button> 
      </div>

    </form>
  `;
}

// edit existing contact from the contacts-list
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
  let contact_edit = document.getElementById("contact_edit");
  contact_edit.innerHTML = `
  <div class="contact_new_top">
    <img class="contact_new_edit_close_btn" src="./img/close.png" onclick="closeEditContact()" alt="Close">
    <img class="contacts_logo" src="./img/logo_topbar.png" alt="Join Logo">    
    <span>Edit contact</span>
    <a>Tasks are better with a team!</a>
    <div class="contact_profile_container"></div>   
  </div>

  <form class="contact_new_bottom" id="edit_contact" onsubmit="editExistingContact()">

    <input type="text" placeholder="First name (*)" maxlength="12" id="edit_name" value="${name}" required> 
    <input type="text" placeholder="Last name" maxlength="12" id="edit_surname" value="${surname}"> 
    <input type="email" placeholder="Email (*)" maxlength="28" id="edit_mail" value="${mail}" required> 
    <input type="tel" placeholder="Phone" maxlength="21" id="edit_phone"
    title="Please enter a valid phone number (between 10 and 16 digits)" value="${phone}">

    <div class="contact_new_btns">

      <button class="button_delete" type="button"
        onclick="showConfirmationDeleteContact(true);">
        <img class="contacts_trash_icon" src="./img/trash.png" alt="Trash Icon">
      </button> 

      <button type="submit" class="button_dark">Save
        <img src="./img/check.png" alt="Check Icon">
      </button> 
    </div> 
    
  </form>
`;
}

function removeSpaces(input) {
  // Replace any spaces in the input value with an empty string
  input.value = input.value.replace(/\s/g, '');
}

function deleteContact() {
    contacts.splice(pickedContact, 1);
    backend.saveContacts("contacts", JSON.stringify(contacts));
}

function showConfirmationContact(a, msg) {
    let confirm_msg = document.getElementById("confirm_msg");
    confirm_msg.innerHTML = msg;
    let contact_confirmation = document.getElementById("contact_confirmation");
    if (a) {
        contact_confirmation.style.visibility = "visible";
    }
    if (!a) {
        contact_confirmation.style.visibility = "hidden";
    }
}

function showConfirmationDeleteContact(a) {
    let confirm_msg_delete = document.getElementById("confirm_msg_delete");
    confirm_msg_delete.innerHTML = "Do you really want to delete this contact?";
    let contact_delete = document.getElementById("contact_delete");
    if (a) {
        contact_delete.style.visibility = "visible";
    }
    if (!a) {
        contact_delete.style.visibility = "hidden";
    }
}

async function addTaskWithContact(letters, color, name, surname, i) {
    NavClick(3);
    await NavRenderAddTask();
    let event = false;
    pickedContacts = [];
    tasks = [];
    setContacts(letters, color, i, name, surname, event);
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
    addContact();
    let contact_new = document.getElementById("contact_new");
    contact_new.style.display = "block";
    document.getElementById("add_name").focus();
}

function closeAddContact() {
    let contact_new = document.getElementById("contact_new");
    contact_new.style.display = "none";
}

function showEditContact(name, surname, mail, phone) {
    editContact(name, surname, mail, phone);
    let contact_edit = document.getElementById("contact_edit");
    contact_edit.style.display = "block";
    document.getElementById("edit_name").focus();
}

function closeEditContact() {
    let contact_edit = document.getElementById("contact_edit");
    contact_edit.style.display = "none";
}
