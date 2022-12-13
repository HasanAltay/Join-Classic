setURL('https://gruppe-375.developerakademie.net/backend');

let contacts = [
  {
    letter: "A",
    names: ["Anna", "Alina"],
    lastNames: ["Dobai", "Numey"],
    phonenumbers: ["01599 12345678", "01599 12345679"],
    mail: ["anna_dobai@mail.de", "alina_numey@mail.de"],
  },
  {
    letter: "B",
    names: ["Bernd", "Berth"],
    lastNames: ["Dobai", "Numey"],
    phonenumbers: ["01599 12345678", "01599 12345679"],
    mail: ["bernd_dobai@mail.de", "berth_numey@mail.de"],
  },
  {
    letter: "C",
    names: ["Cora", "Connor"],
    lastNames: ["Dobai", "Numey"],
    phonenumbers: ["01599 12345678", "01599 12345679"],
    mail: ["cora_dobai@mail.de", "connor_numey@mail.de"],
  },
  {
    letter: "D",
    names: ["Daniel", "David"],
    lastNames: ["Dobai", "Numey"],
    phonenumbers: ["01599 12345678", "01599 12345679"],
    mail: ["daniel_dobai@mail.de", "david_numey@mail.de"],
  },
  {
    letter: "E",
    names: ["Emil", "Emily"],
    lastNames: ["Dobai", "Numey"],
    phonenumbers: ["01599 12345678", "01599 12345679"],
    mail: ["emil_dobai@mail.de", "emily_numey@mail.de"],
  },
  {
    letter: "F",
    names: ["Frank", "Fred"],
    lastNames: ["Dobai", "Numey"],
    phonenumbers: ["01599 12345678", "01599 12345679"],
    mail: ["frank_dobai@mail.de", "fred_numey@mail.de"],
  },
  {
    letter: "G",
    names: ["Georg", "Gustav"],
    lastNames: ["Dobai", "Numey"],
    phonenumbers: ["01599 12345678", "01599 12345679"],
    mail: ["georg_dobai@mail.de", "gustav_numey@mail.de"],
  },
  {
    letter: "H",
    names: ["Hans", "Houston"],
    lastNames: ["Dobai", "Numey"],
    phonenumbers: ["01599 12345678", "01599 12345679"],
    mail: ["hans_dobai@mail.de", "houston_numey@mail.de"],
  },
  {
    letter: "I",
    names: ["Ines", "Ingo"],
    lastNames: ["Dobai", "Numey"],
    phonenumbers: ["01599 12345678", "01599 12345679"],
    mail: ["ines_dobai@mail.de", "ingo_numey@mail.de"],
  },
  {
    letter: "J",
    names: ["Josef", "Johanna"],
    lastNames: ["Dobai", "Numey"],
    phonenumbers: ["01599 12345678", "01599 12345679"],
    mail: ["josef_dobai@mail.de", "johanna_numey@mail.de"],
  },
  {
    letter: "K",
    names: ["Kevin", "Klara"],
    lastNames: ["Dobai", "Numey"],
    phonenumbers: ["01599 12345678", "01599 12345679"],
    mail: ["kevin_dobai@mail.de", "klara_numey@mail.de"],
  },
  {
    letter: "L",
    names: ["Lars", "Laura"],
    lastNames: ["Dobai", "Numey"],
    phonenumbers: ["01599 12345678", "01599 12345679"],
    mail: ["lars_dobai@mail.de", "laura_numey@mail.de"],
  },
  {
    letter: "M",
    names: ["Max", "Mara"],
    lastNames: ["Dobai", "Numey"],
    phonenumbers: ["01599 12345678", "01599 12345679"],
    mail: ["max_dobai@mail.de", "mara_numey@mail.de"],
  },
  {
    letter: "N",
    names: ["Nala", "Norbert"],
    lastNames: ["Dobai", "Numey"],
    phonenumbers: ["01599 12345678", "01599 12345679"],
    mail: ["nala_dobai@mail.de", "norbert_numey@mail.de"],
  },
  {
    letter: "O",
    names: ["Olaf", "Oskar"],
    lastNames: ["Dobai", "Numey"],
    phonenumbers: ["01599 12345678", "01599 12345679"],
    mail: ["olaf_dobai@mail.de", "oskar_numey@mail.de"],
  },
  {
    letter: "P",
    names: ["Paul", "Philipp"],
    lastNames: ["Dobai", "Numey"],
    phonenumbers: ["01599 12345678", "01599 12345679"],
    mail: ["paul_dobai@mail.de", "philipp_numey@mail.de"],
  },
  {
    letter: "Q",
    names: ["Quatsch", "Qualle"],
    lastNames: ["Dobai", "Numey"],
    phonenumbers: ["01599 12345678", "01599 12345679"],
    mail: ["quatsch_dobai@mail.de", "qualle_numey@mail.de"],
  },
  {
    letter: "R",
    names: ["Richard", "Rebekka"],
    lastNames: ["Dobai", "Numey"],
    phonenumbers: ["01599 12345678", "01599 12345679"],
    mail: ["richard_dobai@mail.de", "rebekka_numey@mail.de"],
  },
  {
    letter: "S",
    names: ["Simon", "Susi"],
    lastNames: ["Dobai", "Numey"],
    phonenumbers: ["01599 12345678", "01599 12345679"],
    mail: ["simon_dobai@mail.de", "susi_numey@mail.de"],
  },
  {
    letter: "T",
    names: ["Theodor", "Thomas"],
    lastNames: ["Dobai", "Numey"],
    phonenumbers: ["01599 12345678", "01599 12345679"],
    mail: ["theodor_dobai@mail.de", "thomas_numey@mail.de"],
  },
  {
    letter: "U",
    names: ["Ulrich", "Ulla"],
    lastNames: ["Dobai", "Numey"],
    phonenumbers: ["01599 12345678", "01599 12345679"],
    mail: ["ulrich_dobai@mail.de", "ulla_numey@mail.de"],
  },
  {
    letter: "V",
    names: ["Victor", "Verena"],
    lastNames: ["Dobai", "Numey"],
    phonenumbers: ["01599 12345678", "01599 12345679"],
    mail: ["victor_dobai@mail.de", "verena_numey@mail.de"],
  },
  {
    letter: "W",
    names: ["Wolfgang", "Walther"],
    lastNames: ["Dobai", "Numey"],
    phonenumbers: ["01599 12345678", "01599 12345679"],
    mail: ["wolfgang_dobai@mail.de", "walther_numey@mail.de"],
  },
  {
    letter: "X",
    names: ["Xavier", "Xianthi"],
    lastNames: ["Dobai", "Numey"],
    phonenumbers: ["01599 12345678", "01599 12345679"],
    mail: ["xavier_dobai@mail.de", "xianthi_numey@mail.de"],
  },
  {
    letter: "Y",
    names: ["Yake", "Yuri"],
    lastNames: ["Dobai", "Numey"],
    phonenumbers: ["01599 12345678", "01599 12345679"],
    mail: ["yake_dobai@mail.de", "yuri_numey@mail.de"],
  },
  {
    letter: "Z",
    names: ["Zara", "Zehanja"],
    lastNames: ["Dobai", "Numey"],
    phonenumbers: ["01599 12345678", "01599 12345679"],
    mail: ["zara@mail.de", "zehanja@mail.de"],
  },
];

var contactToEditLetter;
var contactToEditIndex;
var labelColors;
var currentLabelColor;
var last_id;
var selectedContact;

// variables to get the currend width of an element
let navigation_left;
let navigation_left_width;
let navTopBar;

let contactsListContainer;
let contactListContainerWidth;
let navTopBarHeight;

let contactsPage;


function initGlobalVariables() {
  labelColors = [
    BG_COLOR_SUPERNOVA,
    BG_COLOR_TABASCO,
    BG_COLOR_WEBORANGE,
    BG_COLOR_BLAZEORANGE,
    BG_COLOR_MALACHITE,
    BG_COLOR_APPLE,
    BG_COLOR_CYAN_AQUA,
    BG_COLOR_CERULEAN,
    BG_COLOR_BLUE_RIBBON,
    BG_COLOR_JAVA,
    BG_COLOR_PURPLE_PIZZAZZ,
    BG_COLOR_HELIOTROPE,
    BG_COLOR_ELECTRIC_VIOLET,
  ];

  currentLabelColor = 0;

  last_id = "XX";
}

function initContacts() {
  console.log("initContacts()");
  initGlobalVariables();

  navigation_left = document.getElementById('navigation-bar-left');
  navigation_left_width = navigation_left.offsetWidth;

  contactsListContainer = document.getElementById('contacts-list-container');
  contactListContainerWidth = contactsListContainer.offsetWidth;

  contactsPage = document.getElementById('contacts-id');

  // document.getElementById("contact-list").innerHTML = /*html*/`
  // <button class="con_mobileViewAddContactButton hoverButton hoverEffect" onclick="newContact();">
  //               <span style="font-size: 21px; color: white;">New contact</span>
  //               <img src="./img/add_contact.png">
  // </button>
  // `;

  // trying to fix bug after adding new contact
  document.getElementById("contact-list").innerHTML = '';



  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    insertContactToContactList(i, contact);
  }
  console.log('Contacts to add:')
  console.log(contacts);

  // save contactsToDatabase
  saveContactsToDataBase();

  // render contactInformation container according to width of nav_left and contactListContainer
  let contactInformation = document.getElementById('contact-information');
  contactInformation.style = `width: calc(100vw - ${navigation_left_width}px - ${contactListContainerWidth}px`;
  
  // render contact list height according to height of nav top bar
  navTopBar = document.getElementById('nav-top-bar');
  navTopBarHeight = navTopBar.offsetHeight;
}


function saveContactsToDataBase() {
  console.log('saveContactsToDataBase()');
  for (let index = 0; index < contacts.length; index++) {
    const element = contacts[index];
    localStorage.setItem(`contacts_${contacts[index]['letter']}_firstNames`, contacts[index]['names']);
    localStorage.setItem(`contacts_${contacts[index]['letter']}_lastNames`, contacts[index]['lastNames']);
    localStorage.setItem(`contacts_${contacts[index]['letter']}_phonenumbers`, contacts[index]['phonenumbers']);
    localStorage.setItem(`contacts_${contacts[index]['letter']}_mailaddresses`, contacts[index]['mail']);
  }


  backend.setItem('contactsBook', contacts);
  console.log('Alright. Successfully saved contacts to backend.');
    // backend.setItem(`contacts_${contacts[index]['letter']}_firstNames`, JSON.stringify(contacts[index]['names']));
    // backend.setItem(`contacts_${contacts[index]['letter']}_lastNames`, JSON.stringify(contacts[index]['lastNames']));
    // backend.setItem(`contacts_${contacts[index]['letter']}_phonenumbers`, JSON.stringify(contacts[index]['phonenumbers']));
    // backend.setItem(`contacts_${contacts[index]['letter']}_mailaddresses`, JSON.stringify(contacts[index]['mail']));
  // }
}

function insertContactToContactList(i, contact) {
  console.log("insertContactToContactList");
  
  document.getElementById("contact-list").innerHTML += `
  <div id="${contact["letter"]}">
    <span id="label-${contact["letter"]} " class="con_alphabeticHints">${contact["letter"]}</span>
  </div>`;

  for (let i = 0; i < contact["names"].length; i++) {
    const element = contact["names"][i];
    const element2 = contact["lastNames"][i];
    const element3 = contact["mail"][i];
    const fName = element.charAt(0);
    const lName = element2.charAt(0);

    if (currentLabelColor >= labelColors.length) {
      currentLabelColor = 0;
    }

    const bgColor = labelColors[currentLabelColor];
    currentLabelColor++;
    let given_id = `${contact["letter"]}-${i}`;

    document.getElementById(
      `${contact["letter"]}`
    ).innerHTML += `<div id="${contact["letter"]}-${i}" class="con_contactListElement hoverEffect" onclick="contactClicked(id)">
      <span id="label-${contact["letter"]}-${i}" class="con_contactListElementLabel">${fName}${lName}</span>  
      <div>
        <span>${element} ${element2}</span>
        <span class="con_contactListElementEmail">${element3}</span>
      </div>
      
    </div>`;
    document.getElementById(
      `label-${contact["letter"]}-${i}`
    ).style.backgroundColor = bgColor;
  }
}


function newContact() {
  // alert("You wanna add new contact?!");
  document.getElementById('new-popup').classList.remove('d-none');
  document.getElementById('new-popup').style.visibility = 'visible';
  document.getElementById('new-popup').style.display = "flex";
  document.getElementById('new-popup-form').classList.remove('d-none');
}


function cancelAddNewContact() {
  document.getElementById('new-popup').classList.add('d-none');
  document.getElementById('new-popup').style.visibility = 'invisible';
  document.getElementById('new-popup').style.display = "none";
  document.getElementById('new-popup-form').classList.add('d-none');
}


function cancelEditContact() {
  console.log('cancelEditContact()');
  document.getElementById("edit-or-new-popup").classList.add("d-none");
  document.getElementById('edit-form').classList.add('d-none');
}


function addNewContact() {
  let firstName = document.getElementById("con-new-name").value.split(' ')[0];
  let lastName = document.getElementById("con-new-name").value.split(' ')[1];
  let phone = document.getElementById("con-new-phone").value;
  let mail = document.getElementById("con-new-mail").value;

  if(!firstName || !lastName || !phone || !mail) {
    alert('PLease fill in all information');
    return;
  }

  let firstCharOfName = firstName.charAt(0);
  console.log(`firstCharOfName: ${firstCharOfName}`);

  let element = [];
  for (let index = 0; index < contacts.length; index++) {
    element.push(contacts[index]["letter"]);
  }

  let contactListIndex = element.indexOf(firstCharOfName, 0);
  console.log(`contactListIndex: ${contactListIndex}`);

  document.getElementById('new-popup').style.visibility = 'hidden';
  document.getElementById('new-popup').classList.add('d-none');
  document.getElementById('new-popup-form').classList.add('d-none');

  console.log(`New contact, first name: ${firstName}`);
  console.log(`New contact, last name: ${lastName}`);
  console.log(`New contact, phone: ${phone}`);
  console.log(`New contact, mail: ${mail}`);

  // reset the input fields values
  document.getElementById("con-new-name").value = '';
  document.getElementById("con-new-phone").value = '';
  document.getElementById("con-new-mail").value = '';

  contacts[contactListIndex]['names'].push(firstName);
  contacts[contactListIndex]['lastNames'].push(lastName);
  contacts[contactListIndex]['phonenumbers'].push(phone);
  contacts[contactListIndex]['mail'].push(mail);

  console.log(`Contacts after adding of ${firstName} ${lastName}`);
  console.log(contacts);

  // sort contacts after adding new contact
  sortContacts(contactListIndex);
  initContacts();
}


function sortContacts(contactListIndex) {
  console.log('sortContacts()');
  let tmp = [];
  let namesArray = [];
  let lastNamesArray = [];
  let lastNamesArrayNew = [];
  let namesArrayNew = [];
  let phonesArray = [];
  let phonesArrayNew = [];
  let mailArray = [];
  let mailArrayNew = [];

  // get the contacts' information into arrays
  namesArray = contacts[contactListIndex]['names'];
  lastNamesArray = contacts[contactListIndex]['lastNames'];
  phonesArray = contacts[contactListIndex]['phonenumbers'];
  mailArray = contacts[contactListIndex]['mail'];
  
  // copy the elements of namesArray to tmp
  for (let index = 0; index < namesArray.length; index++) {
    const element = namesArray[index];
    tmp.push(element);
  }

  console.log('Before sorting...');
  console.log(namesArray);
  console.log(lastNamesArray);
  console.log(phonesArray);
  console.log(mailArray);

  let oldIndices = [];
  let newIndices = [];
 
  // sort the array tmp and copy it
  namesArrayNew = tmp.sort();
  console.log('The sorting does...');
  console.log('namesArray:');
  console.log(namesArray);
  console.log('namesArrayNew:');
  console.log(namesArrayNew);
  console.log('tmp:');
  console.log(tmp);
  
  for(let i = 0; i < namesArray.length; i++) {
    let searchTag = namesArrayNew[i];
    console.log(`searchTag: ${searchTag}`);
    oldIndices.push(namesArray.indexOf(searchTag, 0));

  }

  for(let i = 0; i < namesArray.length; i++) {
    let searchTag = namesArrayNew[i];
    console.log(`searchTag: ${searchTag}`);
    newIndices.push(namesArrayNew.indexOf(searchTag, 0));
  }

  console.log(`oldIndices: ${oldIndices}`);
  console.log(`newIndices: ${newIndices}`);

  // fill arrays with dummy value
  for (let index = 0; index < namesArray.length; index++) {
    lastNamesArrayNew.push('dummy');
    phonesArrayNew.push('dummy');
    mailArrayNew.push('dummy');
  }

  for (let i = 0; i < namesArray.length; i++) {
    lastNamesArrayNew[i] = lastNamesArray[oldIndices[i]];
    phonesArrayNew[i] = phonesArray[oldIndices[i]];
    mailArrayNew[i] = mailArray[oldIndices[i]];
  }

  console.log('the new sorted contacts are:');
  console.log(namesArrayNew);
  console.log(lastNamesArrayNew);
  console.log(phonesArrayNew);
  console.log(mailArrayNew);

  contacts[contactListIndex]['names'] = namesArrayNew;
  contacts[contactListIndex]['lastNames'] = lastNamesArrayNew;
  contacts[contactListIndex]['phonenumbers'] = phonesArrayNew;
  contacts[contactListIndex]['mail'] = mailArrayNew;

}


function contactClicked(given_id) {
  console.log("contactClicked()");
  console.log(`last_id: ${last_id}`);
  console.log(`given_id: ${given_id}`);

  if (given_id != last_id) {
    document.getElementById(given_id).style.backgroundColor = "#2A3647";
    document.getElementById(given_id).style.color = "#FFFFFF";
    if (last_id != "XX") {
      document.getElementById(last_id).style.backgroundColor = "#FFFFFF";
      document.getElementById(last_id).style.color = "#000000";
    }
    last_id = given_id;
    showContactInformation(given_id);
  } else if (given_id == last_id) {
    document.getElementById(given_id).style.backgroundColor = "#FFFFFF";
    document.getElementById(given_id).style.color = "#000000";
    last_id = "XX";
    hideContactDetails();

    // trying to fix bug of missing hover effect after contact clicked
    document.getElementById(given_id).style.backgroundColor = "";
  }
}

function showContactInformation(given_id) {
  // display contact details
  selectedContact = given_id;
  document.getElementById('contacts-details').classList.remove('d-none'); // testing !!!
  document.getElementById('contact-information').style = "display: flex !important;";
  document.getElementById('contact-information').classList.remove('d-none');
  document.getElementById('label-big-and-name').classList.remove('d-none');
  document.getElementById('edit-container').classList.remove('d-none');
  document.getElementById('mail-and-phone-container').classList.remove('d-none');
  

  let currentContact = Number(given_id.split("-")[1]);
  let searchLetter = given_id.split("-")[0];

  let element = [];
  for (let index = 0; index < contacts.length; index++) {
    element.push(contacts[index]["letter"]);
  }

  let alphabetIndex = element.indexOf(searchLetter, 0);

  let chosenContactsName = contacts[alphabetIndex]["names"][currentContact];
  let chosenContactsLastName =
    contacts[alphabetIndex]["lastNames"][currentContact];
  let firstLetterFirstName = chosenContactsName.charAt(0);
  let firstLetterLastName = chosenContactsLastName.charAt(0);

  let phoneNumber = contacts[alphabetIndex]["phonenumbers"][currentContact];
  let mailAddress = contacts[alphabetIndex]["mail"][currentContact];

  // console.log(`letterIndex: ${letterIndex}`);
  console.log(`contacts.length: ${contacts.length}`);
  console.log(`alphabetIndex: ${alphabetIndex}`);
  console.log(`currentContact: ${currentContact}`);
  console.log(
    `You selected contact ${chosenContactsName} ${chosenContactsLastName}`
  );

  document.getElementById("label-big-and-name").innerHTML = /*html*/ `
  <span id="big-label" class="con_bigLabel">${firstLetterFirstName}${firstLetterLastName}</span>
  <div id="first-name-last-name" class="con_firstNameLastName">
    <span>${chosenContactsName} ${chosenContactsLastName}</span>
    <div style="display: flex; margin-top: 16px;">
      <img src="./img/plus-8-32.png" style="height: 24px; width: 24px; object-fit: cover;">
      <span class="hoverEffect" style="color: #29ABE2; font-size: 24px">Add Task</span>
    </div>
  </div>`;

  // Get background color of label inside contact list
  let label_Id = `label-${firstLetterFirstName}-${currentContact}`;
  let bgColorLabel = document.getElementById(label_Id).style.backgroundColor;

  document.getElementById("big-label").style.backgroundColor = bgColorLabel;
  document.getElementById("edit-container").innerHTML = /*html*/ `
  <span class="con_contactInformationSpan">Contact Information</span>
  <div class="hoverEffect" style="display: flex; align-items: center;" onclick="editContact(${alphabetIndex}, ${currentContact})">
    <img src="./img/edit-2-32.png" style="margin-right: 6px;">
    <span>Edit Contact</span>
  </div>
  `;
  document.getElementById("mail-and-phone-container").innerHTML = /*html*/ `
  <h3>Email:</h3>
  <span>${mailAddress}</span>
  <h3>Phone:</h3>
  <span>${phoneNumber}</span>`;

  // render contactInformation container according to width of nav_left and contactListContainer
  let contactInformation = document.getElementById('contact-information');
  contactInformation.style = `width: calc(100vw - ${navigation_left_width}px - ${contactListContainerWidth}px`;
}


function hideContactDetails() {
  console.log('hideContactDetails()');
  document.getElementById('label-big-and-name').classList.add('d-none');
  document.getElementById('edit-container').classList.add('d-none');
  document.getElementById('mail-and-phone-container').classList.add('d-none');

}


function editContact(alphabetIndex, currentContact) {
  console.log(
    `You want to edit contact number ${currentContact} of alphabetic index ${alphabetIndex}`
  );
  document.getElementById('edit-or-new-popup').classList.remove('d-none');
  document.getElementById('edit-form').classList.remove('d-none');
  document.getElementById('edit-or-new-popup').style.visibility = 'visible';
  document.getElementById('edit-or-new-popup').style.display = "flex";
  contactToEditLetter = alphabetIndex;
  contactToEditIndex = currentContact;
}

function submitEdit(contactToEditLetter, contactToEditIndex) {
  document.getElementById("edit-or-new-popup").classList.add("d-none");
  document.getElementById('edit-form').classList.add('d-none');
  let firstNameNew = document.getElementById("con-edit-name").value.split(' ')[0];
  let lastNameNew = document.getElementById("con-edit-name").value.split(' ')[1];
  let phoneNew = document.getElementById("con-edit-phone").value;
  let mailNew = document.getElementById("con-edit-mail").value;
  console.log(`New contact details of contact: \nFirst name:${firstNameNew}\n
  Last name:${lastNameNew}\nPhone number:${phoneNew}\nE-Mail:${mailNew}\n`);
  changeContact(contactToEditLetter, contactToEditIndex, firstNameNew, lastNameNew, phoneNew, mailNew);

  // changeContact(contactToEditLetter, contactToEditIndex);
}


function changeContact(contactToEditLetter, contactToEditIndex, firstNameNew, lastNameNew, phoneNew, mailNew) {
  console.log('changeContact()');
  console.log(`contactToEditLetter: ${contactToEditLetter}`);
  console.log(`contactToEditIndex: ${contactToEditIndex}`);
  const element = firstNameNew;
  const element2 = lastNameNew;
  const element3 = mailNew;
  const fName = firstNameNew.charAt(0);
  const lName = lastNameNew.charAt(0);
  console.log(`element: ${element}`);
  console.log(`element2: ${element2}`);
  console.log(`element3: ${element3}`);
  console.log(`fName: ${fName}`);
  let editID = `label-${contacts[contactToEditLetter]["letter"]}-${contactToEditIndex}`;
  let bgColorLabel = document.getElementById(editID).style.backgroundColor;


  document.getElementById(`${contacts[contactToEditLetter]["letter"]}-${contactToEditIndex}`).innerHTML = /*html*/`
  <span id="label-${contacts[contactToEditLetter]["letter"]}-${contactToEditIndex}" class="con_contactListElementLabel">${fName}${lName}</span>  
      <div>
        <span>${element} ${element2}</span>
        <span class="con_contactListElementEmail">${element3}</span>
      </div>
  `;
  document.getElementById(editID).style.backgroundColor = bgColorLabel;
  document.getElementById('edit-or-new-popup').style.visibility = 'hidden';
  document.getElementById('edit-or-new-popup').classList.add('d-none');
  document.getElementById('con-edit-name').classList.add('d-none');

  // reset input fields
  document.getElementById('con-edit-name').value = '';
  document.getElementById('con-edit-phone').value = '';
  document.getElementById('con-edit-mail').value = '';

  // push new contact information to JSON
  contacts[contactToEditLetter]['names'][contactToEditIndex] = firstNameNew;
  contacts[contactToEditLetter]['lastNames'][contactToEditIndex] = lastNameNew;
  contacts[contactToEditLetter]['mail'][contactToEditIndex] = mailNew;
  contacts[contactToEditLetter]['phonenumbers'][contactToEditIndex] = phoneNew;
  console.log(contacts);

  let new_given_id = `${fName}-${contactToEditIndex}`;

  showContactInformation(new_given_id);
}


function closeContactInformationContainer() {
  console.log(`You decided to close contact details of ${selectedContact}`);
  document.getElementById('contact-information').classList.add('d-none');
  document.getElementById('contact-information').style = "display: none !important;";
  

  if (selectedContact != last_id) {
    document.getElementById(selectedContact).style.backgroundColor = "#2A3647";
    document.getElementById(selectedContact).style.color = "#FFFFFF";
    if (last_id != "XX") {
      document.getElementById(last_id).style.backgroundColor = "#FFFFFF";
      document.getElementById(last_id).style.color = "#000000";
    }
    last_id = selectedContact;
    showContactInformation(selectedContact);
  } else if (selectedContact == last_id) {
    document.getElementById(selectedContact).style.backgroundColor = "#FFFFFF";
    document.getElementById(selectedContact).style.color = "#000000";
    last_id = "XX";
  }


  // document.getElementById(selectedContact).style.backgroundColor = "#FFFFFF";
  // document.getElementById(selectedContact).style.color = "#000000";
  // trying to fix bug of missing hover effect after contact clicked
  document.getElementById(selectedContact).style.backgroundColor = "";
}
