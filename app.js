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
            let elokuvanNimi = xml.getElementsByTagName('OriginalTitle')[i].childNodes[0].nodeValue;
            let tuotantoVuosi = xml.getElementsByTagName('ProductionYear')[i].childNodes[0].nodeValue;
            let ikäsuositus = xml.getElementsByTagName('Rating')[i].childNodes[0].nodeValue;
            let genret = xml.getElementsByTagName('Genres')[i].childNodes[0].nodeValue;
            let lyhytKuvaus = xml.getElementsByTagName('ShortSynopsis')[i].childNodes[0].nodeValue;
            console.log(elokuvanNimi);
            const elokuvaLista = document.getElementById('myUl');
            let elokuva = document.createElement('li');
            let br1 = document.createElement('br');
            let br2 = document.createElement('br');
            let br3 = document.createElement('br');
            let br4 = document.createElement('br');
            let br5 = document.createElement('br');

            elokuva.append(elokuvanNimi);
            elokuva.append(br1);
            elokuva.append(tuotantoVuosi);
            elokuva.append(br2);
            elokuva.append(ikäsuositus);
            elokuva.append(br3);
            elokuva.append(genret);
            elokuva.append(br4);
            elokuva.append(lyhytKuvaus);
            elokuva.append(br5);
            elokuvaLista.appendChild(elokuva);


        }
    });
        
})
