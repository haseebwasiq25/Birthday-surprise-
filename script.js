const opening=document.getElementById("opening"),content=document.getElementById("content");
document.getElementById("open").onclick=()=>{opening.classList.add("hidden");content.classList.remove("hidden");window.scrollTo(0,0);burst(45)};
document.querySelectorAll(".card").forEach(c=>c.onclick=()=>{document.getElementById("modalTitle").textContent=c.dataset.title;document.getElementById("modalText").textContent=c.dataset.text;document.getElementById("modal").classList.remove("hidden")});
document.getElementById("close").onclick=()=>document.getElementById("modal").classList.add("hidden");
document.getElementById("modal").onclick=e=>{if(e.target.id==="modal")e.target.classList.add("hidden")};
document.getElementById("wish").onclick=()=>{document.getElementById("wishText").classList.remove("hidden");document.getElementById("wish").textContent="Wish made ✨";burst(60)};
document.getElementById("again").onclick=()=>{window.scrollTo({top:0,behavior:"smooth"})};
function burst(n){for(let i=0;i<n;i++){let x=document.createElement("span");x.textContent=["♥","♡","✦","✨"][Math.floor(Math.random()*4)];x.style.position="fixed";x.style.left=(45+Math.random()*10)+"vw";x.style.top="55vh";x.style.zIndex=100;x.style.color=["#ff86b5","#d4b8ff","#fff"][Math.floor(Math.random()*3)];x.style.fontSize=(12+Math.random()*24)+"px";x.style.pointerEvents="none";document.body.appendChild(x);let dx=(Math.random()-.5)*600,dy=-180-Math.random()*600;x.animate([{transform:"translate(0,0) scale(.4)",opacity:1},{transform:`translate(${dx}px,${dy}px) rotate(${Math.random()*700}deg)`,opacity:0}],{duration:1700+Math.random()*900,easing:"cubic-bezier(.2,.7,.2,1)"}).onfinish=()=>x.remove()}}

const revealItems=document.querySelectorAll(".reveal");
const revealObserver=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");revealObserver.unobserve(entry.target);}})},{threshold:.16});
revealItems.forEach(el=>revealObserver.observe(el));
const caseBtn=document.getElementById("caseBtn");
if(caseBtn){caseBtn.onclick=()=>{document.getElementById("caseResult").classList.remove("hidden");caseBtn.textContent="Investigation complete 😂";burst(28);};}

// V4 extra interactions
document.querySelectorAll(".choice").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const result=document.getElementById("choiceResult");
    result.classList.remove("hidden");
    result.textContent = btn.dataset.choice==="A"
      ? "Correct answer accepted. 😌❤️ But honestly, you are both adorable."
      : "Very confident answer. 😂❤️ Approved by the birthday committee.";
    burst(22);
  });
});

const calc=document.getElementById("calculate");
if(calc){
  calc.addEventListener("click",()=>{
    calc.disabled=true;
    const bar=document.getElementById("progressBar");
    const text=document.getElementById("loadingText");
    const steps=[
      "Counting smiles...",
      "Measuring happiness...",
      "Searching the universe for a number big enough...",
      "Calculation getting suspiciously complicated...",
      "Almost there..."
    ];
    let i=0,p=0;
    const timer=setInterval(()=>{
      p+=4;
      bar.style.width=p+"%";
      if(p%20===0 && i<steps.length) text.textContent=steps[i++];
      if(p>=100){
        clearInterval(timer);
        document.getElementById("calculationResult").classList.remove("hidden");
        text.textContent="Calculation complete.";
        burst(35);
      }
    },70);
  });
}
const secretBtn=document.getElementById("secretBtn");
if(secretBtn){
  secretBtn.addEventListener("click",()=>{
    document.getElementById("secretReveal").classList.remove("hidden");
    secretBtn.textContent="Secret unlocked 🔓❤️";
    burst(45);
  });
}


/* V7 romantic floating YES/NO interaction */
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const choiceArea = document.getElementById("choiceArea");
const choiceHint = document.getElementById("choiceHint");
let yesMoves = 0;
let noMoves = 0;
let answered = false;

function floatButton(btn, count){
  if(!btn || !choiceArea) return;
  btn.classList.add("floating");
  const pad = 8;
  const maxX = Math.max(pad, choiceArea.clientWidth - btn.offsetWidth - pad);
  const maxY = Math.max(pad, choiceArea.clientHeight - btn.offsetHeight - pad);
  const x = pad + Math.random() * Math.max(1, maxX - pad);
  const y = pad + Math.random() * Math.max(1, maxY - pad);
  btn.style.left = x + "px";
  btn.style.right = "auto";
  btn.style.top = y + "px";
  btn.style.transform = "rotate(" + ((Math.random()*10)-5) + "deg) scale(1.04)";
}

if(yesBtn){
  yesBtn.addEventListener("click", ()=>{
    if(answered) return;
    yesMoves++;
    const yesHints = [
      "Wait… I wasn't ready for that answer 😭❤️",
      "Hehe, try the YES button again 👀",
      "One more little try, baby 🥹",
      "Almost there… ❤️",
      "Okay… now you got me. ✨"
    ];
    if(yesMoves < 5){
      floatButton(yesBtn, yesMoves);
      choiceHint.textContent = yesHints[yesMoves-1];
      burst(12);
    } else {
      answered = true;
      yesBtn.classList.remove("floating");
      yesBtn.style.position = "relative";
      yesBtn.style.left = "auto";
      yesBtn.style.top = "auto";
      yesBtn.style.right = "auto";
      yesBtn.style.transform = "scale(1.08)";
      noBtn.style.opacity = ".25";
      noBtn.style.pointerEvents = "none";
      choiceHint.textContent = "I knew it. ❤️ Come see what I saved for you…";
      choiceHint.classList.add("success");
      burst(55);
      setTimeout(()=>{
        document.getElementById("finalSurprise")?.scrollIntoView({behavior:"smooth"});
      }, 850);
    }
  });
}

if(noBtn){
  noBtn.addEventListener("click", ()=>{
    if(answered) return;
    noMoves++;
    const noHints = [
      "Are you sure, baby? 👀",
      "Think again… 🥹❤️",
      "That answer doesn't look right 😂",
      "Last few chances… ❤️",
      "Okay, I'm keeping the YES for you 😭❤️"
    ];
    if(noMoves < 5){
      floatButton(noBtn, noMoves);
      choiceHint.textContent = noHints[noMoves-1];
      burst(8);
    } else {
      noBtn.textContent = "YES ❤️";
      noBtn.classList.add("floating");
      noBtn.style.opacity = "1";
      noBtn.style.background = "linear-gradient(135deg,#e66a9c,#9b6ce0)";
      noBtn.style.color = "#fff";
      noBtn.style.border = "0";
      choiceHint.textContent = "Okay baby… I think we found your real answer. 😭❤️";
      burst(18);
      noBtn.onclick = ()=>{
        answered = true;
        noBtn.classList.remove("floating");
        noBtn.style.position = "relative";
        noBtn.style.left = "auto";
        noBtn.style.top = "auto";
        noBtn.style.right = "auto";
        yesBtn.style.opacity = ".25";
        yesBtn.style.pointerEvents = "none";
        choiceHint.textContent = "I knew it. ❤️ Now for your final surprise…";
        choiceHint.classList.add("success");
        burst(60);
        setTimeout(()=>{
          document.getElementById("finalSurprise")?.scrollIntoView({behavior:"smooth"});
        }, 850);
      };
    }
  });
}
