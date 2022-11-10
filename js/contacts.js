let contacts = {
    "John" :
    {"name": "John",
     "phone" : "+49123456789",
     "mail" : "abcd@mail.de"    
},

"A" :
    {"name": "Anna",
     "phone" : "+49123456789",
     "mail" : "abcd@mail.de"    
},

"M" :
    {"name": "Max",
     "phone" : "+49123456789",
     "mail" : "abcd@mail.de"    
},

"S" :
    {"name": "Susan",
     "phone" : "+49123456789",
     "mail" : "abcd@mail.de"    
}

};


function initContacts() {
    document.getElementById('contacts-id').innerHTML += drawContactHTML();
    console.log(contacts['John']);

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[index];
        insertContactToContactList(contact);        
    }
}


function drawContactHTML() {
    return /*html*/ `
    <div id="contacts-list" class="con_contactsList"></div>
    <div id="contact-information" class="con_contactInformation">
        <div id="contact-information-header" class="con_contactInformationHeader"></div>
        <div class="con_contactInformationName"></div>
        <div class="con_contactInformationDetails"></div>
    </div>
    `;
}


function insertContactToContactList(contact) {
    document.getElementById('contacts-list').innerHTML += /*html*/ `
    <span>$ {contact['name']}</span>
    `;
}