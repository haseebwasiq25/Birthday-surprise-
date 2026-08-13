const intro=document.getElementById("intro"),site=document.getElementById("site");
document.getElementById("enter").onclick=()=>{intro.classList.add("hidden");site.classList.remove("hidden");document.body.scrollTo({top:0,behavior:"instant"});burst();};

document.querySelectorAll(".heart-card").forEach(b=>b.onclick=()=>{
 document.getElementById("mTitle").textContent=b.dataset.title;
 document.getElementById("mText").textContent=b.dataset.text;
 document.getElementById("modal").classList.remove("hidden");
});
document.getElementById("close").onclick=()=>document.getElementById("modal").classList.add("hidden");
document.getElementById("modal").onclick=e=>{if(e.target.id==="modal")e.target.classList.add("hidden")};

document.getElementById("memoryReveal").onclick=()=>{
 document.getElementById("secret").classList.remove("hidden");
 document.getElementById("memoryReveal").textContent="You found it ❤️";
 burst(25);
};
document.getElementById("wish").onclick=()=>{
 document.getElementById("wishDone").classList.remove("hidden");
 document.getElementById("wish").textContent="Wish sent to the universe ✨";
 burst(60);
};
function burst(n=35){
 for(let i=0;i<n;i++){
  const x=document.createElement("div");x.textContent=["♥","✦","♡","✨"][Math.floor(Math.random()*4)];
  x.style.position="fixed";x.style.left=(45+Math.random()*10)+"vw";x.style.top="50vh";x.style.zIndex=100;
  x.style.color=["#ff86b5","#d2b1ff","#fff"][Math.floor(Math.random()*3)];
  x.style.fontSize=(12+Math.random()*22)+"px";x.style.pointerEvents="none";
  document.body.appendChild(x);
  const dx=(Math.random()-.5)*500,dy=-150-Math.random()*550;
  x.animate([{transform:"translate(0,0) scale(.4)",opacity:1},{transform:`translate(${dx}px,${dy}px) rotate(${Math.random()*600}deg)`,opacity:0}],{duration:1500+Math.random()*1000,easing:"cubic-bezier(.2,.7,.2,1)"}).onfinish=()=>x.remove();
 }
}