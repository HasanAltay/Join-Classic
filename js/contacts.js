let contacts = {
    "John" :
    {"name": "John",
     "phone" : "+49123456789",
     "mail" : "abcd@mail.de"    
},

"Anna" :
    {"name": "Anna",
     "phone" : "+49123456789",
     "mail" : "abcd@mail.de"    
},

"Max" :
    {"name": "Max",
     "phone" : "+49123456789",
     "mail" : "abcd@mail.de"    
},

"Susan" :
    {"name": "Susan",
     "phone" : "+49123456789",
     "mail" : "abcd@mail.de"    
}

};


function initContacts() {
    document.getElementById('contacts-id').innerHTML = drawContactHTML();
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