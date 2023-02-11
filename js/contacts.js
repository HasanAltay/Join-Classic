// hands over the contacts from json file to 'data' variable
fetch('/json/contacts.json')
  .then(data => data.json())
  .then(data => {
      console.log(data);
      listContacts(data);
  });

function listContacts(data) {

  if (data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      const name = data[i].name.slice(0, 1);
      const surname = data[i].surname.slice(0, 1);
      console.log(name+surname);
      
    }

  }

  // let letter_box = document.getElementById('letter_box');
  // letter_box.innerHTML = /*html*/`
  //   <div></div>
  // `;
  
}

  
