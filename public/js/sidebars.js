let arrow = document.querySelectorAll(".arrow");
for (var i = 0; i < arrow.length; i++) {
  arrow[i].addEventListener("click", (e) => {
    let arrowParent = e.target.parentElement.parentElement; //selecting main parent of arrow
    arrowParent.classList.toggle("showMenu");
  });
}
let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".bx-menu");
console.log(sidebarBtn);
sidebarBtn.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

function trocaTitle() {
  var trocaNome = document.getElementById("PageTile");
  var urlAtual = window.location.href;
  var urlpartes = urlAtual.split("/");
  var urlfinal = urlpartes.pop();
  trocaNome.textContent = urlfinal
  if(urlfinal == null || urlfinal <= 0){
    urlfinal = "PAINEL"
    trocaNome.textContent = urlfinal
  }if (urlfinal === "notes"){
    urlfinal = "Adicionando Comunicação Interna"
    trocaNome.textContent = urlfinal

  }else {
    trocaNome.textContent = urlfinal
  }
  
}


