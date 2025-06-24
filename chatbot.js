
const chatBtn = document.getElementById('chat-open');
const chatBox = document.querySelector('.chatbot-container');
const chatBody = document.querySelector(".personalchat-body");
const txtInput = document.querySelector("#txtInput");
const send = document.querySelector(".send");
const link = document.getElementById('showBotLink');
const box = document.getElementById('botMsgBox');
const msgBox = document.querySelector(".notified-txt");

document.addEventListener("DOMContentLoaded", () => {
  chatBtn.addEventListener('click', function (e) {
    chatBox.style.display = "flex";
    e.stopPropagation();
  });

  document.addEventListener('click', function (e) {
    if (!chatBtn.contains(e.target) && !chatBox.contains(e.target)) {
      chatBox.style.display = "none";
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  chatBtn.addEventListener("mouseenter", () => {
    msgBox.style.opacity = "1";
  });
  
  chatBtn.addEventListener("mouseleave", () => {
    msgBox.style.opacity = "0";
  });

  link.addEventListener('click', function (e) {
    e.preventDefault();
    box.classList.remove('hidden');
    box.classList.add('visible');

    setTimeout(() => {
      box.classList.remove('visible');
      box.classList.add('hidden');
    }, 4000);
  });
});


send.addEventListener("click", () => userMessage());

txtInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    userMessage();
  }
});

const userMessage = () => {
  const userInput = txtInput.value.trim(); // Trim spaces

  if (userInput === "") {
    userMessageEle("Please type something!", "chatbot");
    txtInput.focus();
    return;
  }


  userMessageEle(userInput, "user");
  txtInput.value = "";

  setTimeout(() => {
    chatbotResponse(userInput);
    setScrollPosition();
  }, 500);
};

const chatbotResponse = (userInput) => {
  let response;

  if (/^[0-9+\-*/\s]+$/.test(userInput)) {
    try {
      response = ` ${eval(userInput)}`;
    } catch (e) {
      response = "Please enter a valid math expression (e.g., 5+3)";
    }
    // userMessageEle(response, "chatbot");
  } else {
    response = getBotResponse(userInput);
  }

  
};

const userMessageEle = (txt, type) => {
  let className = "user-message";
  if (type !== "user") {
    className = "chatbot-message";
  }
  const messageEle = document.createElement("div");
  const txtNode = document.createTextNode(txt);
  messageEle.classList.add(className);
  messageEle.append(txtNode);
  chatBody.append(messageEle);
};


// Main response logic
function getBotResponse(userInput) {
  const userData = userInput.toLowerCase().trim();
  let matchedReply = null;

  for (let pair of keywordMap) {
    for (let keyword of pair.keywords) {
      if (userData.includes(keyword)) {
        matchedReply = pair;
        break;
      }
    }
    if (matchedReply) break;
  }

  if (matchedReply) {
    showBotResponse(matchedReply.reply, matchedReply.showDownloadButton);
    return;
  }

  const fallback = "I'm not sure I understand that. Try asking about my skills, education, or contact info!";
  showBotResponse(fallback);
}

// Trigger on button click
send.addEventListener("click", () => {
  const input = txtInput.value;
  if (input.trim() !== "") {
    getBotResponse(input);
    txtInput.value = ""; // Clear input
  }
});



const setScrollPosition = () => {
  if (chatBody.scrollHeight > 0) {
    chatBody.scrollTop = chatBody.scrollHeight;
  }
};

const keywordMap = [
  //general impermations
  {keywords:["hi","hii","hello","hey","hey there","hey buddy"],reply:"hii! What,s Up"},
  {keywords:["today","day"],reply:new Date().toDateString()},
  {keywords:["time","time now"],reply:new Date().toLocaleTimeString()},
  {keywords:["nothing"],reply:"Can we talk for a while?"},
  {keywords:["mm"],reply:"Say something!"},
  {keywords:["ok"],reply:"any some of qustions.. !"},
  {keywords:["bye","thank you","thanks","thank","see you later","see you"],reply:"thanks for the chat..!"},

  //indutactions
  {
    keywords: ["name","bharath", "What is your name", "what your name", "what you name", "your name please", "Your name","who are you"],
    reply: "I am STARK, a chatbot assistant for BHARATH."
  },
  {
    keywords: ["how are you", "how do you do", "how's it going", "are you fine"],
    reply: "I'm doing great! Visiting with a thank you!"
  },
  {
    keywords: ["what can you do", "how can you help", "what help", "what can you help with"],
    reply: "You can ask me about my education, skills, projects, or how to contact me."
  },
  {
    keywords: ["are you real", "are you a real person", "are you fake", "are you actual"],
    reply: "I'm a chatbot built by Bharath to guide you through his portfolio."
  },
  {
    keywords: ["are you human", "are you a bot", "are you a chatbot", "are you ai"],
    reply: "Nope, I'm a friendly chatbot here to help you learn more about Bharath."
  },

  {
    keywords: [ "may i know your name", "introduce yourself", "bharath","tell me about you","character"],
    reply: "I'm Bharath, a B.Tech student in AI & Data Science with a passion for data analytics and Full Stack developer,passionate about data and solving real-world problems."
  },
  // education sections
  {
    keywords:["education","your education", "edu"],
    reply:"I'm currently pursuing a B.Tech in Artificial Intelligence & Data Science.Before my B.Tech, I completed a diploma in Mechanical Engineering"
  },
  {
    keywords: ["what are you studying", "current education","current", "present course", "what course are you doing"],
    reply: "I'm currently pursuing a B.Tech in Artificial Intelligence & Data Science."
  },
  {
    keywords: ["what did you study before", "previous education", "your diploma", "before b.tech"],
    reply: "Before my B.Tech, I completed a diploma in Mechanical Engineering."
  },
  {
    keywords: ["education background", "your qualification", "academic history"],
    reply: "I have a diploma in Mechanical Engineering and I'm now doing B.Tech in AI & Data Science."
  },
  {
    keywords:["academic percentage","percentage","marks","percentages","mark"],
    reply:"I am currently ALL CLEAR my percentage 80%"
  },
  {
    keywords:["diploma","mechanical"],
    reply: "I am Diploma in Mechanical Engineering, my percentage 73%"
  },
  
  //skills
  {
    keywords: ["skill","skills","your skills", "what skills do you have", "technical skills", "expertise"],
    reply: "I'm skilled in fullstack development & data analysis, Python, Excel, and I've also practiced building frontend components using HTML, CSS and JS."
  },
  {
    keywords: ["what are you learning", "currently learning", "learning now", "new skills"],
    reply: "I'm learning data science techniques with a focus on analytics using Python, Excel, and visualization tools."
  },
  {
    keywords: ["programming","do you know programming", "programming knowledge", "coding skills"],
    reply: "Yes, I have programming knowledge in Python and JavaScript, and I use it mainly for data analysis and web development."
  },
  
  //career|goals  
  {
    keywords: ["what is your goal", "career goal", "future plans", "what do you want to become"],
    reply: "My goal is to become a skilled data analyst and eventually grow into a full-time data scientist role."
  },
  {
    keywords: ["what kind of job are you looking for", "job preferences", "career opportunities"],
    reply: "I'm looking for data analytics or entry-level data science roles to kickstart my career in the data domain."
  },
  {
    keywords: ["career plan", "your roadmap", "job path"],
    reply: "My career plan is to build a strong foundation in data analytics and gradually take on full data science challenges."
  },

  //projects
  {
    keywords: ["do you have experience", "any experience", "professional experience"],
    reply: "I don’t have work experience yet, but I’m building projects to apply what I’m learning in real-world contexts."
  },
  {
    keywords: ["done any projects", "what projects", "personal projects", "academic projects"],
    reply: "Yes, I’ve completed academic and personal projects involving data analysis, visualization, and web development."
  },
  {
    keywords: ["portfolio projects", "sample work", "show me your work"],
    reply: "You can check out my portfolio website where I showcase projects related to data analysis and UI development."
  },
//contact
{
  keywords: ["how can i contact you", "contact info", "reach you"],
  reply: "You can use the contact form on my portfolio or reach out to me via email for any inquiries."
},
{
  keywords: ["social media", "linkedin", "github", "online profiles"],
  reply: "Yes, my LinkedIn and GitHub profiles are linked in the footer of my portfolio website."
},
{
  keywords: ["your resume", "download resume", "get your cv", "resume"],
  reply:"Go to the home page. It shows the 'Resume' button (or) click below to download it directly.",
  showDownloadButton: true
}

];


function showBotResponse(message, showButton = false) {
  const botMessage = document.createElement("div");
  botMessage.className = "chatbot-message"; // Make sure you style this in CSS

  // First line: message text
  const messageText = document.createElement("div");
  messageText.innerText = message;
  botMessage.appendChild(messageText);

  // Second line: optional button
  if (showButton) {
    const buttonWrapper = document.createElement("div"); // Makes button appear on new line
    buttonWrapper.style.marginTop = "10px";

    const button = document.createElement("button");
    button.innerText = "Download Resume";
    button.style.padding = "8px 16px";

    button.addEventListener("click", () => {
      const link = document.createElement("a");
      link.href = "./bharath Resume.pdf"; // Make sure file path is correct
      link.download = "bharath Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });

    buttonWrapper.appendChild(button);
    botMessage.appendChild(buttonWrapper);
  }

  chatBody.appendChild(botMessage); // your existing .personalchat-body
  setScrollPosition();
}

