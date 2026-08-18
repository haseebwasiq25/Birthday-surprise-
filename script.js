const $ = id => document.getElementById(id);

function burst(n=25){
  for(let i=0;i<n;i++){
    const x=document.createElement("span");
    x.textContent=["♥","♡","✦","✨"][Math.floor(Math.random()*4)];
    x.style.position="fixed";
    x.style.left=(45+Math.random()*10)+"vw";
    x.style.top="55vh";
    x.style.zIndex=100;
    x.style.color=["#ff86b5","#d4b8ff","#fff"][Math.floor(Math.random()*3)];
    x.style.fontSize=(12+Math.random()*24)+"px";
    x.style.pointerEvents="none";
    document.body.appendChild(x);
    const dx=(Math.random()-.5)*600, dy=-180-Math.random()*600;
    x.animate(
      [{transform:"translate(0,0) scale(.4)",opacity:1},
       {transform:`translate(${dx}px,${dy}px) rotate(${Math.random()*700}deg)`,opacity:0}],
      {duration:1700+Math.random()*900,easing:"cubic-bezier(.2,.7,.2,1)"}
    ).onfinish=()=>x.remove();
  }
}

const opening=$("opening"), content=$("content");
$("open").addEventListener("click",()=>{
  opening.classList.add("hidden");
  content.classList.remove("hidden");
  window.scrollTo(0,0);
  burst(45);
});

document.querySelectorAll(".card").forEach(card=>{
  card.addEventListener("click",()=>{
    $("modalTitle").textContent=card.dataset.title;
    $("modalText").textContent=card.dataset.text;
    $("modal").classList.remove("hidden");
  });
});
$("close").addEventListener("click",()=>$("modal").classList.add("hidden"));
$("modal").addEventListener("click",e=>{
  if(e.target.id==="modal") $("modal").classList.add("hidden");
});

$("wish").addEventListener("click",()=>{
  $("wishText").classList.remove("hidden");
  $("wish").textContent="Wish made ✨";
  burst(60);
});
$("again").addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>revealObserver.observe(el));

const yesBtn=$("yesBtn"), noBtn=$("noBtn"), choiceArea=$("choiceArea"), choiceHint=$("choiceHint");
let yesMoves=0, noMoves=0, answered=false;

function floatButton(btn){
  btn.classList.add("floating");
  const pad=8;
  const maxX=Math.max(pad,choiceArea.clientWidth-btn.offsetWidth-pad);
  const maxY=Math.max(pad,choiceArea.clientHeight-btn.offsetHeight-pad);
  btn.style.left=(pad+Math.random()*Math.max(1,maxX-pad))+"px";
  btn.style.top=(pad+Math.random()*Math.max(1,maxY-pad))+"px";
  btn.style.right="auto";
  btn.style.transform=`rotate(${(Math.random()*10)-5}deg) scale(1.04)`;
}

function finishChoice(){
  answered=true;
  yesBtn.style.pointerEvents="none";
  noBtn.style.pointerEvents="none";
  yesBtn.classList.remove("floating");
  noBtn.classList.remove("floating");
  choiceHint.textContent="I knew it. ❤️ Come see what I saved for you…";
  choiceHint.classList.add("success");
  burst(55);
  setTimeout(()=>$("finalSurprise").scrollIntoView({behavior:"smooth"}),850);
}

yesBtn.addEventListener("click",()=>{
  if(answered) return;
  yesMoves++;
  const hints=[
    "Wait… not that easy 👀❤️",
    "Hehe, try YES again 😭❤️",
    "One more little try 🥹",
    "Almost there… ❤️"
  ];
  if(yesMoves<5){
    floatButton(yesBtn);
    choiceHint.textContent=hints[yesMoves-1];
    burst(10);
  }else{
    yesBtn.textContent="YES ❤️";
    finishChoice();
  }
});

noBtn.addEventListener("click",()=>{
  if(answered) return;
  noMoves++;
  const hints=[
    "Are you sure? 👀",
    "Think again… 🥹❤️",
    "That answer looks suspicious 😂",
    "Last little chance… ❤️"
  ];
  if(noMoves<5){
    floatButton(noBtn);
    choiceHint.textContent=hints[noMoves-1];
    burst(7);
  }else{
    noBtn.textContent="YES ❤️";
    noBtn.classList.remove("no-btn");
    noBtn.classList.add("yes-btn");
    choiceHint.textContent="Okay… I think we found your real answer 😭❤️";
    burst(18);
  }
});

noBtn.addEventListener("dblclick",()=>{
  if(!answered && noMoves>=5) finishChoice();
});

$("revealFinalBtn").addEventListener("click",()=>{
  $("lastMessage").classList.remove("hidden");
  $("revealFinalBtn").textContent="❤️ My message for you";
  burst(70);
});
