// Add the JS coder is here
//======================== Loading View Section ===============================//
window.addEventListener('load', () => {
  const loader = document.getElementById('preloader');
  document.body.classList.remove('no-scroll');
  loader.style.opacity = '0';
  setTimeout(() => {
    loader.style.display = 'none';
  }, 500);
});
//==============================================================================//

//======================== NavBar View Section ==================================//
let lastScrollY = 0;
const header = document.querySelector('.nav-container');

window.addEventListener('scroll', () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollY) {
    header.style.transform = 'translateY(-120%)';
    header.classList.add(".hide");
  } else {
    header.style.transform = 'translateY(0)';
    header.classList.remove(".hide");
  }
  lastScrollY = scrollTop;
});
//============================================================================//

//=========== section for name typing aniamtion =========//
document.addEventListener("DOMContentLoaded", function () {
  const logo = document.getElementById("typetxt");
  const text = 'BHARATH...';
  let index = 0;
  let typingSpeed = 180;
  let deletingSpeed = 180;
  let pauseAfterTyping = 1000;
  //txt typing aniamtion
  function typeText() {
    if (index < text.length) {
      const span = document.createElement("span");
      span.textContent = text.charAt(index);
      span.style.color = "#087bff";
      logo.appendChild(span);
      index++;
      setTimeout(typeText, typingSpeed);
    } else {
      setTimeout(deleteText, pauseAfterTyping);
    }
  }
  //txt delete aniamtion
  function deleteText() {
    if (index > 0) {
      const lastChar = logo.lastChild;
      logo.removeChild(lastChar);
      index--;
      setTimeout(deleteText, deletingSpeed);
    } else {
      setTimeout(typeText, 900);
    }
  }
  typeText();
});
//==========================================================\\

//=========== this section is navbar show & hidden ==========\\
// --- nav bar ---
const navBar = document.querySelector(".nav-container");
const menuBox = document.getElementById("label-check");
const myList = document.getElementById("myList");

document.addEventListener("DOMContentLoaded", function () {
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      // Scrolling down
      navBar.style.transform = "translateY(-120%)"; // hide
    } else {
      // Scrolling up
      // navBar.style.transform = "translateY(0)"; // show
    }

    lastScrollY = currentScrollY;
  });
});
// --- mylist box show & hidden code ---
// Hide/show menu on checkbox toggle
const listItems = document.querySelectorAll('#myList li');

menuBox.addEventListener('change', function (event) {
  myList.style.display = menuBox.checked ? "block" : "none";
  if (!menuBox.contains(event.target) && !myList.contains(event.target)) {
    myList.style.display = "none";
    menuBox.checked = false;
  }

  listItems.forEach((item, index) => {
    // Set animation delay dynamically
    item.style.animationDelay = `${index * 0.090}s`;
    // Set animation show
    if (menuBox.checked) {
      // Remove then re-add to restart animation
      item.classList.remove("show");
      void item.offsetWidth;
      setTimeout(() => {
        item.classList.add("show");
      });
    } else {
      item.classList.remove("show");
    }
    // Add hover effect
    item.addEventListener("mouseenter", () => {
      item.style.animation = "shutter 0.4s ease";
    });
    item.addEventListener("mouseleave", () => {
      item.style.animation = "shutter 0.4s ease forwards";
    });
  });
});
// Hide menu when clicking outside
document.addEventListener("click", function (event) {
  if (!menuBox.contains(event.target)) {
    myList.style.display = "none";
    menuBox.checked = false;
  }
});
// Hide menu when clicking any <a> inside the list
document.querySelectorAll("#myList a").forEach(link => {
  link.addEventListener("click", () => {
    myList.style.display = "none";
    menuBox.checked = false;
  });
});

// --- scroll aniamtion ---
function scrollToPosition(event, targetY) {
  event.preventDefault();

  const startY = window.scrollY;
  const distance = targetY - startY;
  const duration = 800; //scroll speed
  const startTime = performance.now();

  function stepScroll(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeInOut = 0.5 * (1 - Math.cos(Math.PI * progress));

    const newY = startY + distance * easeInOut;
    window.scrollTo(0, newY);

    if (progress < 1) {
      requestAnimationFrame(stepScroll);
    }
  }
  requestAnimationFrame(stepScroll);
}

// --- toggle btn in ligth || Drak modes ---
const toggleSwitch = document.querySelector(".input");
const menuBar = document.querySelectorAll(".hamburger-label div");
const skillsId = document.getElementById("skills");
const skillHeader = document.getElementById("skill-header");
const certificateHeader = document.getElementById("certificate-header");
const skillsCard = document.querySelectorAll(".skills");
const homeImg = document.querySelectorAll(".home-img");
const contact = document.getElementById("contact");
const percentageBar = document.querySelectorAll(".percentage-line")
const socialLink = document.querySelectorAll(".social-link");
const mylistLi = document.querySelectorAll('#myList li');
const mylistA = document.querySelectorAll("#myList a");
const aboutSvg = document.querySelectorAll(".about-svg");

toggleSwitch.addEventListener("change", () => {
  homeImg.forEach(img => {
    img.classList.toggle("active", toggleSwitch.checked);
  });
  socialLink.forEach(link => {
    link.classList.toggle("active", toggleSwitch.checked);
  });
  aboutSvg.forEach(svg => {
    svg.style.fill = toggleSwitch.checked ? "rgb(10, 10, 10)" : "#0a0a0a";
  });
  if (toggleSwitch.checked) {
    //backgroundColor`black` for dark mode
    document.body.style.backgroundColor = "rgb(10, 10, 10)"; 
    navBar.classList.add('darknavbar');
    mylistLi.forEach(li => {li.style.backgroundColor = "rgba(10, 10, 10)";});
    mylistA.forEach(a => {a.style.color = "#ffffff";});
    const sections = [home, aboutEdu, aboutMe,education, skills, skillsId, project, resume, contact];
    sections.forEach(section => {
      section.style.backgroundColor = "rgb(10, 10, 10)";
    });
    skillsCard.forEach(card => {
      card.classList.add("darkcard");
    });
    percentageBar.forEach(bar=>{
      bar.style.backgroundColor = "#42414179";
    })
    //lines for text color is white
    document.body.style.color = "#ffffff";
    skillHeader.style.color = "#d6d6d649"
    certificateHeader.style.color = "#d6d6d649"
    document.querySelectorAll(".contact-container input, .contact-container textarea").forEach(el => {
      el.style.color = "#fff";     
    });
    document.querySelectorAll(".home-link button, .home-link a, .resume-btn button, .resume-btn a").forEach(el => {
      el.style.color = "#ffffff";
    });
    document.querySelector("footer").style.color = "#fff";

  } else {
    //backgroundColor`white` for ligth mode
    document.body.style.backgroundColor = "#ffffff"; 
    navBar.classList.remove('darknavbar');
    mylistLi.forEach(li => {li.style.backgroundColor = "#ffffff";});
    mylistA.forEach(a => {a.style.color = "#000000";});

    const sections = [home, skills, resume, contact];
    sections.forEach(section => {
      section.style.backgroundColor = "#ffffff";
    });
    skillsCard.forEach(card => {
      card.classList.remove("darkcard");
    });
    percentageBar.forEach(bar=>{
      bar.style.backgroundColor = "#d4d3d3";
    })
    //lines for text color is `Black`
    document.body.style.color = "#000000"; 
    skillHeader.style.color = "#000000";
    certificateHeader.style.color = "#000000";
    document.querySelectorAll(".contact-container input, .contact-container textarea").forEach(el => {
      el.style.color = "#000000";     
    });
    document.querySelectorAll(".home-link button, .home-link a, .resume-btn button, .resume-btn a").forEach(el => {
      el.style.color = "#000000";
    });
    document.querySelector("footer").style.color = "#000000";
  }
});
//============================================================//

//========== this is section aniamtions codes ===============//
const home = document.getElementById("home");
const sections = document.querySelectorAll(".section");
const aboutEdu = document.getElementById("about_edu_skill");
const aboutMe = document.getElementById("aboutMe");
const education = document.getElementById("education");
const skills = document.getElementById("skills");
const project = document.getElementById("project");
const resume = document.getElementById("resume");

window.addEventListener("scroll", () => {
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;
    // Animate About Education
    toggleAnimation(scrollY + windowHeight * 0.10 > home.offsetTop, aboutEdu);
    // Animate Project and hide Education
    const projectVisible = scrollY + windowHeight * 0.7 > project.offsetTop;
    toggleAnimation(projectVisible, project);
    // Animate Resume
    toggleAnimation(scrollY + windowHeight * 0.4 > resume.offsetTop, resume);
    aboutMe, skills
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const shouldAnimate = scrollY + windowHeight * 0.70 > sectionTop;
        toggleAnimation(shouldAnimate, section);
    });
});

//  add/remove .animate class
function toggleAnimation(condition, element) {
    if (condition) {
        element.classList.add("animate");
    } else {
        element.classList.remove("animate");
    }
}

// the all section in inner elemnt in visible aniamtion section
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

    } else {
      //remove animation class when scrolled out
      // entry.target.classList.remove('visible');
    }
    
  });
}, { threshold: 0.5 });//scroll point

// --- headers Elements --
const headers = document.querySelectorAll(".header-container");
headers.forEach(header => observer.observe(header));


// --- Education Elements ---
const eduElements = document.querySelectorAll('.edu-h1, .edu-h2, .edu-h3, .edu-p');
eduElements.forEach(el => observer.observe(el));

// --- About Section ---
const aboutElements = [
  document.querySelector('.about-content h1'),
  document.querySelector('#about-paragaraph_1'),
  document.querySelector('#about-paragaraph_2')
  // ...document.querySelectorAll('.edu1 h1, .edu1 h2, .edu1 h3, .edu1 p'),
  // ...document.querySelectorAll('.edu2 h1, .edu2 h2, .edu2 h3, .edu2 p')
];
aboutElements.forEach(el => {
  if (el) observer.observe(el);
});

// --- Skills Section ---
const skillsElements = [
  ...document.querySelectorAll('.skills'),
  ...document.querySelectorAll('.percentage'),
  ...document.querySelectorAll('.percentage-line'),
  ...document.querySelectorAll('.skills span'),
  ...document.querySelectorAll('.skills img')
];
skillsElements.forEach(el => {
  if (el) observer.observe(el);
});
//animation delay to each`.skills` element
document.querySelectorAll('.skills').forEach((el, index) => {
  el.style.animationDelay = `${index * 0.3}s`;
  // Add hover effect via JS
  el.addEventListener("mouseenter", () => {
    el.style.transform = "scale(1.08) translateY(-7px)";
    el.style.animation = `bounceIn 0.4s ease`;
  });//remove
  el.addEventListener("mouseleave", () => {
    el.style.transform = "scale(1) translateY(0)";
    el.style.animation = `bounceIn 0.4s ease forwards`;
  });
});

// --- Projects Section ---
const projectSection = document.getElementById('pro');
const cards = document.querySelectorAll('.project');
//project sections animation
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      cards[0].classList.add('visible');
    }
  });
}, { threshold: 0.5 });
//project cards aniamtion
const cardObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.3 });
sectionObserver.observe(projectSection);
cards.forEach(card => cardObserver.observe(card));

// --- Resume, Contact & Footer ---
const resumeContactSelectors = [
  '.card',
  '.resume-container h1',
  '.resume-btn button',
  '.social-link:nth-child(1)',
  '.social-link:nth-child(2)',
  '.social-link:nth-child(3)',
  '.social-link:nth-child(4)',
  '.contact',
  '.contact .input-file:nth-child(1)',
  '.contact .input-file:nth-child(2)',
  '.contact .input-file:nth-child(3)',
  '.contact .input-file:nth-child(4)',
  '.contact h1'
];

// Observe all resumeContactSelectors
resumeContactSelectors.forEach(selector => {
  document.querySelectorAll(selector).forEach(el => observer.observe(el));
});

// --- Footer Paragraph ---
const footerParagraph = document.querySelector('footer p');
if (footerParagraph) {
  observer.observe(footerParagraph);
}
//===========================================================================//

//======================== PDF View Section ==================================//
document.addEventListener('DOMContentLoaded', () => {
  const pdfContainer = document.querySelector('.pdf-container');
  const resumeBtn = document.getElementById('resume-btn');
  const pdfTitle = document.getElementById('pdf-title');
  const loadingStatus = document.getElementById('pdf-status');
  const pdfViewer = document.getElementById('pdf-viewer');
  const printBtn = document.getElementById('print-btn');
  const downloadBtn = document.getElementById('download-btn');
  const pdfFrame = document.getElementById('pdfFrame');
  
  resumeBtn.addEventListener('click', (e) => {
    pdfContainer.style.display = 'block';
    e.preventDefault();
  })

  document.addEventListener('click', (e) => {
    if(!pdfContainer.contains(e.target) && e.target !== resumeBtn){
      pdfContainer.style.display = 'none';
    }
  });

  const pdfURL = './bharath Resume.pdf'; 

  // Configure PDF.js
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

  // Load and render PDF
  const loadingTask = pdfjsLib.getDocument(pdfURL);
  loadingStatus.textContent = "Loading...";

  loadingTask.promise.then(pdf => {
    pdf.getPage(1).then(page => {
      const scale = 1;
      const viewport = page.getViewport({ scale });

      const canvas = pdfViewer;
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      const renderTask = page.render(renderContext);
      renderTask.promise.then(() => {
        loadingStatus.textContent = "Ready";
        pdfTitle.textContent = `PDF Viewer : ${pdf.numPages}`;
      });
    });
  }).catch(error => {
    loadingStatus.textContent = "Failed to load PDF.";
    console.error('Error loading PDF:', error);
  });

  // Download button
  downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = pdfURL;
    link.download = 'bharath Resume.pdf';
    link.click();
  });

  // Print button
  printBtn.addEventListener('click', () => {
    // Remove any previous load handler to avoid double printing
    pdfFrame.onload = null;

    // If the PDF is already loaded in iframe
    if (pdfFrame.contentDocument?.readyState === 'complete') {
      pdfFrame.contentWindow.focus();
      pdfFrame.contentWindow.print();
    } else {
      // Wait for it to load then print
      pdfFrame.onload = () => {
        pdfFrame.contentWindow.focus();
        pdfFrame.contentWindow.print();
      };
    }
  });
});
// =======================================================================//

//===================== About Me in trangle Aniamtion ==================//
function restartAnimation(className, delay) {
  const element = document.querySelector('.' + className); // Select by class
  element.classList.remove('fade-in1', 'fade-in2', 'fade-in3');

  // Force reflow
  void element.offsetWidth;

  setTimeout(() => {
    element.classList.add(className); // Use class name, not ID
  }, delay);
}

// Loop every 6s (animation duration + delay)
setInterval(() => {
  restartAnimation('fade-in1', 100);
  restartAnimation('fade-in2', 300);
  restartAnimation('fade-in3', 500);
}, 3000);
//==========================================================//

//============ Projcet chatbot aniamtion ====================//
document.addEventListener("DOMContentLoaded", function () {
  const chatbox = document.getElementById("chatbox");
  //messages lines
  const messages = [
    { type: "chat", text: "hi" },
    { type: "replay", text: "hi" },
    { type: "chat", text: "What is your name" },
    { type: "replay", text: "I'm chatbot" }
  ];
  // text show aniamtion
  function playChatSequence() {
    chatbox.innerHTML = "";
    let delay = 0;
    //text show the delay
    messages.forEach((msg) => {
      setTimeout(() => {
        const span = document.createElement("div");
        span.classList.add("message", msg.type);
        span.textContent = msg.text;
        chatbox.appendChild(span);
        chatbox.scrollTop = chatbox.scrollHeight;
      }, delay);
      delay += 1000;
    });
  }
  playChatSequence();
  setInterval(playChatSequence, messages.length * 1000 + 1000);
});
//======================================================================//

//========== like button in aniamtions || like count code ==============//
// like show the animation
function handleLike(buttonId) {
  const checkbox = document.getElementById("heart" + buttonId);
  const likeCountSpan = document.getElementById("likeCount" + buttonId);

  let likeCount = parseInt(localStorage.getItem("likeCount" + buttonId)) || 0;
  let liked = localStorage.getItem("liked" + buttonId) === "true";

  if (!liked) {
    likeCount++;
    localStorage.setItem("likeCount" + buttonId, likeCount);
    localStorage.setItem("liked" + buttonId, "true");
    likeCountSpan.innerText = likeCount;
    checkbox.checked = true;
    checkbox.disabled = true;
  }
}

//likes count sections
function initializeLikes(buttonId) {
  const checkbox = document.getElementById("heart" + buttonId);
  const likeCountSpan = document.getElementById("likeCount" + buttonId);

  let storedCount = localStorage.getItem("likeCount" + buttonId);
  let likeCount = storedCount !== null ? parseInt(storedCount) : 26; // default is 26
  let liked = localStorage.getItem("liked" + buttonId) === "true";

  likeCountSpan.innerText = likeCount;

  if (storedCount === null) {
    localStorage.setItem("likeCount" + buttonId, likeCount); // store default if new
  }
  if (liked) {
    checkbox.checked = true;
    checkbox.disabled = true;
  }
}

// this for all like buttons
function initializeAllLikes() {
  for (let i = 1; i <= 5; i++) {
    initializeLikes(i);
  }
}
document.addEventListener("DOMContentLoaded", function () {
  initializeAllLikes();
});

// Call for all likes reset section
localStorage.setItem("likeCount" + i, 26);
function resetAllLikes() {
  for (let i = 1; i <= 5; i++) {
    localStorage.removeItem("liked" + i);

    const checkbox = document.getElementById("heart" + i);
    const likeCountSpan = document.getElementById("likeCount" + i);

    if (checkbox && likeCountSpan) {
      likeCountSpan.innerText = 26;
      localStorage.setItem("likeCount" + i, 26);
      checkbox.checked = false;
      checkbox.disabled = false;
    }
  }
}
// ===================================================================== //
//==================== Contact msg send the funtions ====================//
function sendemail(e) {
  e.preventDefault(); 

  const form = e.target;

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const params = {
    name: name,
    email: email,
    message: message,
  };

  // Show loading indicator
  Swal.fire({
    title: 'Sending...',
    text: 'Please wait while we send your message.',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  emailjs.send("service_ok5dryv", "template_r4o8i6d", params)
    .then(function(response) {
      Swal.fire({
        title: "Success!",
        text: "Message sent successfully!",
        icon: "success",
        confirmButtonText: "Great!",
        customClass: {
          title: 'my-swal-title',
          htmlContainer: 'my-swal-text',
          confirmButton: 'my-success-button'
        }
      });
      form.reset();
      console.log("SUCCESS", response.status, response.text);
    }, function(error) {
      Swal.fire({
        title: "Oops!",
        text: "Failed to send message. Please try again.",
        icon: "error",
        confirmButtonText: "Retry",
        customClass: {
          title: 'my-swal-title',
          htmlContainer: 'my-swal-text',
          confirmButton: 'my-error-button'
        }
      });
      console.log("FAILED", error);
    });
}






window.addEventListener("resize", () => {
  info.innerHTML = `
    <strong>Screen Info:</strong><br>
    Width: ${window.innerWidth}px <br>
    Height: ${window.innerHeight}px <br>
    Device Pixel Ratio: ${window.devicePixelRatio}
  `;
});
