// const API_KEY = ''

// async function getMessage() {
//   showScreen();
//   showLoading();
//   console.log('clicked');
//   const prompt_message = document.getElementById('prompt').value;
//   const output = document.getElementById('output');

//   const options = {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${API_KEY}`,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       model: "gpt-3.5-turbo",
//       messages: [{role: "user", content: prompt_message}],
//       max_tokens: 400
//     })
//   };

//   output.innerHTML += `
//   <i>
//     <a style="color: blue">You</a>:&nbsp;
//     <div style="font-weight:bold; color:grey; margin:5px 0px 5px 0px">
//       ${prompt_message}
//     </div>
//   </i>
//   `;

//   try {
//     const response = await fetch('https://api.openai.com/v1/chat/completions', options);
//     const data = await response.json();
//     console.log(data);
//     output.innerHTML += data.choices[0].message.content

//   } catch (error) {
//     console.log(error);

//   } finally {
//     hideLoading();
//     document.getElementById("prompt").value = "";
//   }
// }

// function showLoading() {
//   const loading_gif = document.getElementById('loading_gif');
//   loading_gif.style.visibility = 'visible';
// }

// function hideLoading() {
//   const loading_gif = document.getElementById('loading_gif');
//   loading_gif.style.visibility = 'hidden';
// }

// function showScreen() {
//   let chat_gpt_answer = document.getElementById("chat_gpt_answer");
//   chat_gpt_answer.style.visibility = "visible";
// }

// function hideScreen() {
//   let chat_gpt_answer = document.getElementById("chat_gpt_answer");
//   chat_gpt_answer.style.visibility = "hidden";
// }