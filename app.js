//määritellään muuttuja joka haetaan html sivulta id'n perusteella
const valikko = document.getElementById('valikko');
//määritellään tapahtumakuuntelja sivun lataamiselle
window.addEventListener('load', ()=> {
//Haetaan ulkoisen xml tiedoston url 
    fetch('https://www.finnkino.fi/xml/TheatreAreas/')
//Kun haun tuloksena saadaan onnistuneesti tekstiä käyttöön
    .then(response=>response.text())
//Parsetaan xml tiedostosta haluttua dataa
    .then(data=>{
        let parser = new DOMParser();
        let xml = parser.parseFromString(data, "text/xml");
//Tarkistetaan Konsolista että dokumentti on haettu onnistuneesti
        console.log(xml);
//Haetaan xml tiedostosta kaikki tagit nimellä "TheatreArea" 
        let theatreArea = xml.getElementsByTagName('TheatreArea');
//käydään läpi "TheatreArea" tägit ja poimitaan sen sisällä olevat "Name" ja "ID" tagien sisällöt
        for (let i = 0; i < theatreArea.length; i++) {
            let alueet = xml.getElementsByTagName('Name')[i].childNodes[0].nodeValue;
            let areaId = xml.getElementsByTagName('ID')[i].childNodes[0].nodeValue;
//Tarkistetaan, että Konsolissa näkyy haetut alueet
            console.log(alueet);
//Luodaan html dokumenttissä olevaan valikkoon uusi optio kaikista haetuista alueista ja areaID'istä 
            let newOption = document.createElement('option');
            newOption.textContent = (areaId + ' ' + alueet);
            valikko.append(newOption);
        }
    });     
})
//Määritellään tapahtumakuuntelija, joka vaihtaa html sivun sisällön valikossa olevaa optiota painamalla
valikko.addEventListener('change', ()=> {
//Kun valikosta valitaan uusi optio, poistetaan kaikki edelliset 'li' elementit sivulta
    document.querySelectorAll('li').forEach(item => {
        item.remove();
        });
//haetaan html dokumentista valikon sisällä oleva arvo ja eritellään sieltä areaID
    const arvo = document.getElementById('valikko').value;
    const areaId = arvo.substring(0,4);
//haetaan ulkoiselta sivustolta urlilla xml tiedosto ja lisäämällä urlin loppuun areaId'n, saadaan alue/teatterikohtaista dataa siellä pyörivistä elokuvista
    fetch('https://www.finnkino.fi/xml/Events/?area=' + areaId)
//kun haku onnistuu ja saadaan dataa tekstimuodossa =>
    .then(response=>response.text())
//valitaan saatu data ja parsitaan sieltä tekstiä
    .then(data=>{
        let parser = new DOMParser();
        let xml = parser.parseFromString(data, "text/xml");
//tarkistetaan Konsolissa että haettu xml tiedosto näkyy
        console.log(xml);
//määritellään ja haetaan jokainen tagi xml tiedostosta nimellä "Event"
        let event = xml.getElementsByTagName('Event');
//For loopilla käydään läpi kaikki "Event" nimiset tagit ja poimitaan sieltä haluttuja tietoja tagilla
        for (let i = 0; i < event.length; i++) {
            let elokuvanKansi = xml.getElementsByTagName('EventLargeImagePortrait')[i].childNodes[0].nodeValue;
            let elokuvanNimi = xml.getElementsByTagName('OriginalTitle')[i].childNodes[0].nodeValue;
            let tuotantoVuosi = xml.getElementsByTagName('ProductionYear')[i].childNodes[0].nodeValue;
            let ikäsuositus = xml.getElementsByTagName('RatingImageUrl')[i].childNodes[0].nodeValue;
            let genret = xml.getElementsByTagName('Genres')[i].childNodes[0].nodeValue;
            let Kuvaus = xml.getElementsByTagName('Synopsis')[i].childNodes[0].nodeValue;
            //määritellään muuttuja ja haetaan html dokumentista id'n perusteella sille vastapari
            const elokuvaLista = document.getElementById('myUl');
            //määritellään ja luodaan uusia uusia elementtejä 
            let ratingLabel = document.createElement('img');
            let movieImg = document.createElement('img');
            let elokuva = document.createElement('li');
            let movieNameDiv = document.createElement('div');
            let movieYearDiv = document.createElement('div');
            let movieAgeLimitDiv = document.createElement('div');
            let movieGenreDiv = document.createElement('div');
            let movieDescriptionDiv = document.createElement('div');
            //määritellään attribuutteja luoduille elementeille
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
            // lisätään luotuja elementtäjä 'elokuva' nimisiin 'li' elementteihin, ja sen sisällä oleviin 'div' elementteihin
            elokuva.append(movieImg);
            movieNameDiv.append(elokuvanNimi);
            elokuva.append(movieNameDiv);
            movieYearDiv.append(tuotantoVuosi);
            movieNameDiv.append(movieYearDiv);
            //tarkistetaan tietoa xml tiedostosta haetusta urlista, jonka perusteella joko näytetään kuva tai ei
            var ikäsuosituksentarkistus = /rating_large_S\.png|rating_large_18\.png|rating_large_7\.png|rating_large_12\.png|rating_large_16\.png/.test(ikäsuositus);
                if (ikäsuosituksentarkistus === true) {
                movieAgeLimitDiv.append(ratingLabel);
                movieNameDiv.append(movieAgeLimitDiv);
            }
           // lisätään luotuja elementtäjä 'elokuva' nimisiin 'li' elementteihin, ja sen sisällä oleviin 'div' elementteihin 
            movieGenreDiv.append(genret);
            elokuva.append(movieGenreDiv);
            movieDescriptionDiv.append(Kuvaus);
            movieGenreDiv.append(movieDescriptionDiv);
            //lopuksi lisätään kaikki 'li' elementit (elokuva) 'ul' listaan(elokuvaLista)
            elokuvaLista.append(elokuva);
        }
    });
})
// määritellään muuttuja(nappi) johon tulee toimintoja
const backToTopBtn = document.getElementById('backToTopBtn');
window.onscroll = function() {scrollFunction()};
// tässä functiossa määritellään, että nappi tulee näkyviin kun selataan sivua hieman alemmas, muuten se on näkymätön.
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
}
// Kun nappia painetaan, pääsee takaisin sivun alkuun
backToTopBtn.addEventListener('click', ()=> {
    document.documentElement.scrollTop = 0; 
})
