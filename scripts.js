document.addEventListener("DOMContentLoaded", function() {
  // Código que será executado quando o navegador carregar
  const API_URL = "https://vision.squidit.com.br/v1/feed/test?count=50";
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

  }

});


