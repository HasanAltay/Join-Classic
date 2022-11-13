let contacts = [
    
    {"name": "John",
     "phone" : "+49123456789",
     "mail" : "abcd@mail.de"    
},

    {"name": "Anna",
     "phone" : "+49123456789",
     "mail" : "abcd@mail.de"    
},

    {"name": "Max",
     "phone" : "+49123456789",
     "mail" : "abcd@mail.de"    
},


    {"name": "Susan",
     "phone" : "+49123456789",
     "mail" : "abcd@mail.de"    
}

];


async function initContacts() {
    console.log('initContacts()');
    document.getElementById('contacts-id').innerHTML += drawContactHTML();
    console.log(contacts['John']);
    console.log(`contacts.length: ${contacts.length}`);

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        insertContactToContactList(i, contact);        
    }
}


function drawContactHTML() {
    console.log('drawContactHTML()');
    return /*html*/`
    <div id="contacts-list-container" class="con_contactsListContainer">
        <div id="contact-list" class="con_contactList"></div>
    </div>
    <div id="contact-information" class="con_contactInformation">
        <div id="contact-information-header" class="con_contactInformationHeader">
            <span class="con_contactInformationStartHeader">Contacts</span>
            <div class="con_vector5"></div>
            <span class="con_contactInformationStartHeaderTwo">Better with a team</span>
        </div>
        <div class="con_contactInformationName"></div>
        <div class="con_contactInformationDetails"></div>
    </div>
    `;
}


function insertContactToContactList(i, contact) {
    console.log('insertContactToContactList');
    document.getElementById('contact-list').innerHTML += `<span>${contact['name']}</span>`;
}