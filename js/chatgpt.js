// async function getChatGPTResponse() {
//   show_chat_gpt_answer();

//   const prompt = document.getElementById('prompt').value;
//   const apiKey = "";
//   const data = {
//     prompt: prompt,
//     temperature: 0.5,
//     max_tokens: 1024,
//     top_p: 1,
//     frequency_penalty: 0,
//     presence_penalty: 0
//   };
//   const headers = {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${apiKey}`
//   };

//   // Show loading screen
//   const loading_gif = document.getElementById('loading_gif');
//   loading_gif.style.visibility = 'visible';
  
//   document.getElementById('output').innerHTML += prompt;
//   document.getElementById("prompt").value = "";

//   try {
//     const response = await fetch('https://api.openai.com/v1/engines/ada/completion', {
//       method: 'POST',
//       headers: headers,
//       body: JSON.stringify(data)
//     });

//     const responseJson = await response.json();
//     console.log(responseJson);

//     if (responseJson.choices && responseJson.choices.length > 0) {
//       const chatGPTResponse = responseJson.choices[0].text.trim();
//       console.log(chatGPTResponse);
//       document.getElementById('output').value += chatGPTResponse;
//       return chatGPTResponse;
//     } else {
//       console.log("Error: responseJson.choices is undefined or empty");
//       return "Error: responseJson.choices is undefined or empty";
//     }
//   } catch (error) {
//     console.log("Error: " + error);
//     return "Error: " + error;
//   } finally {
//     // Hide loading screen
//     loading_gif.style.visibility = 'hidden';
//   }
// }

// function show_chat_gpt_answer() {
//   let chat_gpt_answer = document.getElementById("chat_gpt_answer");
//   chat_gpt_answer.style.visibility = "visible";
// }

// function hide_chat_gpt_answer() {
//   let chat_gpt_answer = document.getElementById("chat_gpt_answer");
//   chat_gpt_answer.style.visibility = "hidden";
// }