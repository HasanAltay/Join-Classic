let contacts;
let sortedContacts = {};

async function fetchContacts() {
  resetList();
  fetch('/json/contacts.json')
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
  for (let i = 0; i < contacts.length; i++) {
    let firstLetter = contacts[i].name[0].toUpperCase();
    if (!sortedContacts[firstLetter]) {
      sortedContacts[firstLetter] = [];
    }
    sortedContacts[firstLetter].push(contacts[i]);
  }
  for (let letter in sortedContacts) {
    let letter_box = document.getElementById('letter_box');
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
      const color = getColor(letters);
      console.log(color);
      letter_box.innerHTML += /*html*/`
        <div class="contacts_files" id="files" 
          onclick="initDetails('${letters}','${name}','${surname}','${mail}','${phone}','${color}');showDetails()">
          <div class="contacts_initials" id="initials" style="background-color:${color}">${letters}</div>
          <div class="contacts_name_email" id="name_email">
            <div>${name} ${surname}</div>
            <div>${mail}</div>
          </div>
        </div>
      `;
    }
  }
}


function initDetails(letters, name, surname, mail, phone, color) {
  console.log(letters, name, mail, phone);
  let contacts_details = document.getElementById('contacts_details');
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
    <div class="contact_new" id="contact_new">
      <div class="contact_new_top">
        <img src="/img/logo_topbar.png">
        <span>Add contact</span>
        <a>Tasks are better with a team!</a>
      </div>
      <div class="contact_new_bottom">
        <input type="text" placeholder="Name" name="name" maxlength="36">
        <input type="text" placeholder="Surname" name="surname" maxlength="36">
        <input type="text" placeholder="Email" name="mail" maxlength="36">
        <input type="text" placeholder="Phone" name="phone" maxlength="36">
        <div class="contact_new_btns">
          <button class="button_bright" onclick="closeAddContact()">Cancel</button>
          <button class="button_dark">Add</button>
        </div>
      </div>
    </div>
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