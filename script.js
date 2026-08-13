const start = document.getElementById("start");
const main = document.getElementById("main");
document.getElementById("openBtn").addEventListener("click", () => {
  start.classList.add("hidden");
  main.classList.remove("hidden");
  launchConfetti();
});

const modal = document.getElementById("modal");
document.querySelectorAll(".memoryBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.getElementById("modalTitle").textContent = btn.dataset.title;
    document.getElementById("modalText").textContent = btn.dataset.text;
    modal.classList.remove("hidden");
  });
});
document.getElementById("close").onclick = () => modal.classList.add("hidden");
modal.addEventListener("click", e => { if(e.target === modal) modal.classList.add("hidden"); });

document.getElementById("wishBtn").addEventListener("click", () => {
  document.getElementById("wishBtn").textContent = "✨ Wish made!";
  document.getElementById("wishResult").classList.remove("hidden");
  launchConfetti(80);
});

function launchConfetti(count=45){
  const box=document.getElementById("confetti");
  for(let i=0;i<count;i++){
    const s=document.createElement("span");
    s.textContent=["✨","💖","🎉","⭐","💕"][Math.floor(Math.random()*5)];
    s.style.position="fixed";
    s.style.left=Math.random()*100+"vw";
    s.style.top="-30px";
    s.style.fontSize=(12+Math.random()*20)+"px";
    s.style.zIndex=20;
    s.style.transition=`transform ${2+Math.random()*2}s linear, opacity 3s`;
    box.appendChild(s);
    requestAnimationFrame(()=> {
      s.style.transform=`translateY(${110+Math.random()*90}vh) rotate(${Math.random()*720-360}deg)`;
      s.style.opacity="0";
    });
    setTimeout(()=>s.remove(),4200);
  }
}
