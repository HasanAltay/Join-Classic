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
          onclick="initDetails('${letters}','${name}','${surname}','${mail}','${phone}','${color}')">
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
      <h1 class="details_name">${name} ${surname}</h1>
    </div>
    <div>
      <h2><b>Contact Information</b></h2>
    </div>
    <div>
      <b>Email<br><br></b>
      <div>${mail}<br><br></div>
    </div>
    <div>
      <b>Mobil<br><br></b>
      <div>${phone}</div>
    </div>
  `;
}


function resetList() {
  contacts = [];
  sortedContacts = [];
}