const pages = document.querySelectorAll('.page');
let current = 0;
function nextPage() {
  pages[current].classList.remove('active');
  pages[current].classList.add('hidden');
  current++;
  if (current < pages.length) {
    pages[current].classList.remove('hidden');
    pages[current].classList.add('active');
  }
}

// 🎵 Background Music
const music = document.getElementById('bgMusic');
document.getElementById('startBtn').addEventListener('click', () => {
  music.play();
  nextPage();
});

// Page 2 — Check age with playful prompts
let wrongTries = 0;
document.getElementById('ageNext').addEventListener('click', () => {
  const age = document.getElementById('ageInput').value.trim();
  if (age === "20") {
    alert("Yiee! That’s right 💙");
    nextPage();
  } else {
    wrongTries++;
    if (wrongTries === 1) {
      alert("Eme kaa 😜");
    } else {
      alert("Answer it correctly, hmp 😤");
    }
  }
});


// Page 3 — Automatically save wish to Firebase
document.getElementById('wishNext').addEventListener('click', async () => {
  const wishInput = document.getElementById('wishInput');
  const wish = wishInput.value.trim();
  const hearts = document.getElementById('hearts');

  if (wish === "") {
    alert("Don’t forget to make a wish first 💫");
    return;
  }

  // 💾 Automatically save the wish silently
  try {
    await db.collection("wishes").add({
      wish: wish,
      timestamp: new Date().toISOString()
    });
    console.log("✅ Wish saved to Firestore:", wish);
  } catch (error) {
    console.error("❌ Error saving wish:", error);
  }

  // Floating hearts animation
  for (let i = 0; i < 10; i++) {
    const span = document.createElement('span');
    span.innerHTML = '💛';
    span.style.left = `${Math.random() * 80 + 10}%`;
    span.style.top = '70%';
    hearts.appendChild(span);
    setTimeout(() => span.remove(), 3000);
  }

  // 🕒 Show friendly message before going to next page
  const msg = document.createElement('p');
  msg.textContent = "May your wish come true 💙";
  msg.style.marginTop = "10px";
  msg.style.fontWeight = "600";
  msg.style.color = "#ffd700";
  document.getElementById('page3').appendChild(msg);

  let seconds = 3;
  const countdown = document.createElement('p');
  countdown.id = "countdownTimer";
  countdown.style.color = "#007BFF";
  countdown.textContent = `Next in ${seconds}...`;
  document.getElementById('page3').appendChild(countdown);

  const timer = setInterval(() => {
    seconds--;
    countdown.textContent = `Next in ${seconds}...`;
    if (seconds === 0) {
      clearInterval(timer);
      msg.remove();
      countdown.remove();
      nextPage();
    }
  }, 1000);
});




// Page 4 balloon game
const balloonArea = document.getElementById('balloonArea');
let popped = 0;
for (let i = 0; i < 5; i++) {
  const balloon = document.createElement('div');
  balloon.classList.add('balloon');
  balloon.addEventListener('click', () => {
    balloon.remove();
    popped++;
    if (popped >= 5) nextPage();
  });
  balloonArea.appendChild(balloon);
}

// Page 5 slideshow
const slideImage = document.getElementById('slideImage');
const totalPhotos = 20;
let index = 1;
function startSlideshow() {
  index = 1;
  slideImage.src = `images/photo${index}.jpeg`;
  const slideshow = setInterval(() => {
    index++;
    if (index > totalPhotos) {
      clearInterval(slideshow);
      setTimeout(nextPage, 1500);
      setTimeout(showFinalMessage, 2000);
    } else {
      slideImage.src = `images/photo${index}.jpeg`;
    }
  }, 2000);
}

const page5 = document.getElementById('page5');
const observer = new MutationObserver(() => {
  if (page5.classList.contains('active')) {
    startSlideshow();
  }
});
observer.observe(page5, { attributes: true, attributeFilter: ['class'] });

// Page 6 final message with animation
const finalText = document.getElementById('finalText');
const message = "No matter how many birthdays come,\nI’ll always be here.\n\nLMS 💛";

function typeText(text, element, i = 0) {
  if (i < text.length) {
    element.textContent += text.charAt(i);
    setTimeout(() => typeText(text, element, i + 1), 70);
  }
}

function showFinalMessage() {
  typeText(message, finalText);
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement('span');
    heart.classList.add('floating-heart');
    heart.innerHTML = '💙';
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDelay = `${Math.random() * 2}s`;
    document.getElementById('floatingHearts').appendChild(heart);
  }
}

// Letter Reveal Feature
document.addEventListener("DOMContentLoaded", () => {
  const envelope = document.getElementById("envelope");
  const letter = document.getElementById("letter");

  if (envelope && letter) {
    envelope.addEventListener("click", () => {
      envelope.classList.add("hidden");
      document.querySelector(".tapText").classList.add("hidden");
      letter.classList.remove("hidden");
    });
  }
});

// Letter Reveal Feature with Done Reading button
document.addEventListener("DOMContentLoaded", () => {
  const envelope = document.getElementById("envelope");
  const letter = document.getElementById("letter");
  const futurePromise = document.getElementById("futurePromise");
  const doneReadingBtn = document.getElementById("doneReadingBtn");

  if (envelope && letter) {
    envelope.addEventListener("click", () => {
      envelope.classList.add("hidden");
      document.querySelector(".tapText").classList.add("hidden");
      letter.classList.remove("hidden");
    });
  }

  // Done Reading button → reveal final part
  if (doneReadingBtn && futurePromise) {
    doneReadingBtn.addEventListener("click", () => {
      letter.classList.add("hidden");
      futurePromise.classList.remove("hidden");
    });
  }

  // Replay button
  const replayBtn = document.getElementById("replayBtn");
  if (replayBtn) {
    replayBtn.addEventListener("click", () => {
      window.scrollTo(0, 0);
      location.reload();
    });
  }

  // Exit button
  const exitBtn = document.getElementById("exitBtn");
  if (exitBtn) {
    exitBtn.addEventListener("click", () => {
      document.body.innerHTML += `
        <div id="exitMessage">
          <p>Thank you for reading, mahang ko💛<br>
          Don’t forget, I’ll always be here.</p>
        </div>
      `;
      const msg = document.getElementById('exitMessage');
      msg.style.display = "block";
      setTimeout(() => {
        msg.innerHTML = "<p>Hope you like it po</p>";
      }, 4000);
      setTimeout(() => {
        msg.style.opacity = "0";
      }, 7000);
    });
  }
});

