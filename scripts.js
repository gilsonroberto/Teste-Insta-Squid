document.addEventListener("DOMContentLoaded", function() {
  // Código que será executado quando o navegador carregar
  const API_URL = "https://vision.squidit.com.br/v1/feed/test?count=100";
  const load = document.querySelector("#load");
  const container = document.querySelector(".container");
  
  function setDownload(donwload = true) {
    if (donwload === true) {
      let donwloadEl = document.createElement("h3");
  
      donwloadEl.setAttribute("id", "donwload");
      container.appendChild(donwloadEl);
    } else {
      document.getElementById("donwload").remove();
    }
  }

  search(API_URL).then(showInform);

  function search(val) {
    return fetch(val)
      .then(setDownload())
      .then(data => data.json().then(setDownload(false)));
  }

  function upDownload(url) {
    search(API_URL + "&nextUrl=" + encodeURIComponent(url))
      .then(setDownload())
      .then(showInform)
      .then(setDownload(false));
  }

  function showInform({ medias, pagination }) {

    medias.map(item => {
      const { usuario,  imagens,  comentarios, upvotes, criadoEm, link } = item;

      const wrap = document.createElement("div");
      wrap.classList.add("post-wrapper");

      const wrapHref = document.createElement("a");
      wrapHref.classList.add("post-href");
      wrapHref.setAttribute("href", link); 
      wrapHref.setAttribute("target", "_blank"); 

      const wrapImage = document.createElement("img");
      wrapImage.classList.add("post-img");
      wrapImage.setAttribute("src", imagens.resolucaoPadrao.url);    
      
      const wrapSection = document.createElement("section");
      wrapSection.classList.add("posts-section");

      const wrapInfo = document.createElement("div");
      wrapInfo.classList.add("post-info");

      function date(params) {
        let setDate = new Date(params);
        let day  = ("0"+(setDate.getDate())).slice(-2);
        let month  = ("0" + (setDate.getMonth()+1)).slice(-2);
        let year = setDate.getFullYear();
        let hour = ("0"+(setDate.getHours())).slice(-2); 
        let min  = ("0"+(setDate.getMinutes())).slice(-2);
  
        let data = day+'/'+month+'/'+year +" "+ hour+':'+min
  
        return data;
  
      }

      
      const { username } = usuario;

      let user = "@"+" "+username;
      let vote = '&#10084;'+" "+upvotes;
      let coments = '💬'+" "+comentarios;
      let day = '🗓'+" "+date(criadoEm);

      const description = [user, vote, coments, day];

      description.map(item => {
        const wrapItem = document.createElement("p");
        wrapItem.classList.add("item");
        wrapItem.innerHTML = item;

        wrapInfo.appendChild(wrapItem);
      });
            
      wrap.appendChild(wrapHref);
      wrapHref.appendChild(wrapInfo);
      wrap.appendChild(wrapImage);

      container.appendChild(wrap);
    });

    
    $(window).scroll(function() {
      if ($(document).height() - $(this).height() == $(this).scrollTop()) {
        upDownload(pagination.next_url);
      }
    });

  }

});


