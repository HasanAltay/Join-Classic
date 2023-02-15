let tasks = [];

function SetPriority(num, set) {
  console.log(num);
  console.log(set);

  let urgent = document.getElementById("urgent");
  let medium = document.getElementById("medium");
  let low = document.getElementById("low");

  let urgent_img = document.getElementById("urgent_img");
  let medium_img = document.getElementById("medium_img");
  let low_img = document.getElementById("low_img");

  if (num == 1) {
    urgent.style.backgroundColor = "#FF3D00";
    medium.style.backgroundColor = "#FFFFFF";
    low.style.backgroundColor = "#FFFFFF";

    urgent.style.color = "#FFFFFF";
    medium.style.color = "#000000";
    low.style.color = "#000000";

    urgent_img.style.filter = "brightness(0) invert(1)";
    medium_img.style.filter = "unset";
    low_img.style.filter = "unset";
  }
  else if (num == 2) { 
    urgent.style.backgroundColor = "#FFFFFF";
    medium.style.backgroundColor = "#FFA800";
    low.style.backgroundColor = "#FFFFFF";
    
    urgent.style.color = "#000000";
    medium.style.color = "#FFFFFF";
    low.style.color = "#000000";

    urgent_img.style.filter = "unset";
    medium_img.style.filter = "brightness(0) invert(1)";
    low_img.style.filter = "unset";
  }
  else if (num == 3) { 
    urgent.style.backgroundColor = "#FFFFFF";
    medium.style.backgroundColor = "#FFFFFF";
    low.style.backgroundColor = "#7AE229";

    urgent.style.color = "#000000";
    medium.style.color = "#000000";
    low.style.color = "#FFFFFF";

    urgent_img.style.filter = "unset";
    medium_img.style.filter = "unset";
    low_img.style.filter = "brightness(0) invert(1)";
  }
}


function addTask() {
	event.preventDefault();

  let title = document.getElementById('title').value;
  let textarea = document.getElementById('textarea').value;
  let date = document.getElementById('date').value;

  console.log(title, textarea, date);
  tasks.push({
    "Titel" : title, 
    "Textarea" : textarea, 
    "Date" : date
  });
  console.log(tasks);
}


function onFormSubmit() {
	event.preventDefault();
	// your Javascript code here
}


function clearForm(formId) {
  const form = document.getElementById(formId);
  form.reset();
}
