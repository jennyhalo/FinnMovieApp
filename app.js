const valikko = document.getElementById('valikko');

window.addEventListener('load', ()=> {
    fetch('https://www.finnkino.fi/xml/TheatreAreas/')
    .then(response=>response.text())
    .then(data=>{
        let parser = new DOMParser();
        let xml = parser.parseFromString(data, "text/xml");
        console.log(xml);
        let theatreArea = xml.getElementsByTagName('TheatreArea');
        for (let i = 0; i < theatreArea.length; i++) {
            let alueet = xml.getElementsByTagName('Name')[i].childNodes[0].nodeValue;
            let areaId = xml.getElementsByTagName('ID')[i].childNodes[0].nodeValue;
            console.log(alueet);
            let newOption = document.createElement('option');
            newOption.textContent = (areaId + ' ' + alueet);
            valikko.append(newOption);
        }
    });
        
})

valikko.addEventListener('change', ()=> {
    document.querySelectorAll('li').forEach(item => {
        item.remove();
        });
    const arvo = document.getElementById('valikko').value;
    const areaId = arvo.substring(0,4);
    console.log(areaId);
    fetch('https://www.finnkino.fi/xml/Events/?area=' + areaId)
    .then(response=>response.text())
    .then(data=>{
        let parser = new DOMParser();
        let xml = parser.parseFromString(data, "text/xml");
        console.log(xml);
        let event = xml.getElementsByTagName('Event');
        for (let i = 0; i < event.length; i++) {
            let elokuvanKansi = xml.getElementsByTagName('EventLargeImagePortrait')[i].childNodes[0].nodeValue;
            let elokuvanNimi = xml.getElementsByTagName('OriginalTitle')[i].childNodes[0].nodeValue;
            let tuotantoVuosi = xml.getElementsByTagName('ProductionYear')[i].childNodes[0].nodeValue;
            let ikäsuositus = xml.getElementsByTagName('RatingImageUrl')[i].childNodes[0].nodeValue;
            let genret = xml.getElementsByTagName('Genres')[i].childNodes[0].nodeValue;
            let Kuvaus = xml.getElementsByTagName('Synopsis')[i].childNodes[0].nodeValue;
            console.log(elokuvanKansi);
            console.log(elokuvanNimi);
            const elokuvaLista = document.getElementById('myUl');
            let ratingLabel = document.createElement('img');
            let movieImg = document.createElement('img');
            let elokuva = document.createElement('li');
            let br1 = document.createElement('br');
            let br2 = document.createElement('br');
            let br3 = document.createElement('br');
            let br4 = document.createElement('br');
            let br5 = document.createElement('br');
            let movieNameDiv = document.createElement('div');
            let movieYearDiv = document.createElement('div');
            let movieAgeLimitDiv = document.createElement('div');
            let movieGenreDiv = document.createElement('div');
            let movieDescriptionDiv = document.createElement('div');

            elokuva.setAttribute('class', 'container d-flex mt-5 bg-dark');
            elokuva.setAttribute('id', 'elokuvanmuotoilu');
            ratingLabel.setAttribute('src', ikäsuositus);
            movieImg.setAttribute('src', elokuvanKansi);
            movieImg.setAttribute('class', 'movieImg');
            movieImg.setAttribute('width', '200px');
            movieImg.setAttribute('height', '296px');
            movieNameDiv.setAttribute('class', 'movieNameDiv');
            movieYearDiv.setAttribute('class', 'movieYearDiv');
            movieAgeLimitDiv.setAttribute('class', 'movieAgeLimitDiv');
            movieGenreDiv.setAttribute('class', 'movieGenreDiv');
            movieDescriptionDiv.setAttribute('class', 'movieDescriptionDiv');

            elokuva.append(movieImg);
            movieNameDiv.append(elokuvanNimi);
            elokuva.append(movieNameDiv);
            elokuva.append(br1);
            movieYearDiv.append(tuotantoVuosi);
            movieNameDiv.append(movieYearDiv);
            elokuva.append(br2);
            
            var ikäsuosituksentarkistus = /rating_large_S\.png|rating_large_18\.png|rating_large_7\.png|rating_large_12\.png|rating_large_16\.png/.test(ikäsuositus);
            if (ikäsuosituksentarkistus === true) {
            movieAgeLimitDiv.append(ratingLabel);
            movieNameDiv.append(movieAgeLimitDiv);
            }
            
            
            
            elokuva.append(br3);
            movieGenreDiv.append(genret);
            elokuva.append(movieGenreDiv);
            elokuva.append(br4);
            movieDescriptionDiv.append(Kuvaus);
            movieGenreDiv.append(movieDescriptionDiv);
            elokuva.append(br5);
            elokuvaLista.appendChild(elokuva);


        }
    });
        
})

const myBtn = document.getElementById('myBtn');
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    myBtn.style.display = "block";
  } else {
    myBtn.style.display = "none";
  }
}
myBtn.addEventListener('click', ()=> {
    document.documentElement.scrollTop = 0; 
})
