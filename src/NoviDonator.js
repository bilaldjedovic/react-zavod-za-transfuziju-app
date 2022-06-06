import React, { useEffect, useState } from 'react'
import './NoviDonator.css'
import { useNavigate } from 'react-router-dom';




const NoviDonator = () => {


  const navigate = useNavigate();
  const [opcine, setOpcine] = useState([]);
  const [krvneGrupe, setKrvneGrupe] = useState([]);
  const [faktori, setFaktore] = useState([]);

  var noviDonatorZaUpis = {
    jmbg: "",
    ime: "",
    prezime: "",
    brojKnjizice: "",
    adresa: "",
    opcinaId: 0,
    krvnaGrupaId: 0,
    faktorId: 0,
    telefon: "",
    email: "",
    napomena: ""
  }

  const fetchOpcine = async () => {
    try {
      const response = await fetch('https://localhost:44343/api/Opcina/prikaziSveOpcine');
      if (!response.ok) throw Error('Did not recived expected data');
      const data = await response.json();
      console.log(data);
      setOpcine(data);
    } catch (error) {
      console.log(error.message)
    }
  }


  const fetchKrvneGrupe = async () => {
    try {
      const response = await fetch('https://localhost:44343/api/KrvnaGrupa/prikaziSveKrvneGrupe');
      if (!response.ok) throw Error('Did not recived expected data');
      const data = await response.json();
      console.log(data);
      setKrvneGrupe(data);
    } catch (error) {
      console.log(error.message)
    }
  }

  const fetchFaktore = async () => {
    try {
      const response = await fetch('https://localhost:44343/api/RhFaktor/prikaziSveRhFaktore');
      if (!response.ok) throw Error('Did not recived expected data');
      const data = await response.json();
      console.log(data);
      setFaktore(data);
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    (async () => await fetchOpcine())();
    (async () => await fetchKrvneGrupe())();
    (async () => await fetchFaktore())();
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(noviDonatorZaUpis);

    try {

      fetch('https://localhost:44343/api/Osobe/unesiDonora', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(noviDonatorZaUpis)
      }).then(() => {
        console.log('Nova osoba dodana');
      })
    } catch (error) {
      console.log(error);
    } finally{navigate("/donatori")}

  }
  return (
    
    <div className='inputFormaDiv'>
    
      <form >
        <label >JMBG</label>
        <input required
          type="text"
          placeholder="JMBG donatora.."
          onChange={(e) => { noviDonatorZaUpis.jmbg = e.target.value }} />

        <label>Ime</label>
        <input
          required
          type="text"
          placeholder="Ime donatora.."
          onChange={(e) => { noviDonatorZaUpis.ime = e.target.value }} />

        <label>Prezime</label>
        <input
          required
          type="text"
          placeholder="Prezime donatora.."
          onChange={(e) => { noviDonatorZaUpis.prezime = e.target.value }} />

        <label>Broj zdravstvene knjižice</label>
        <input
          required
          type="text"
          placeholder="Broj zdravstvene knjižice donatora.."
          onChange={(e) => { noviDonatorZaUpis.brojKnjizice = e.target.value }} />

        <label>Adresa</label>
        <input
          required
          type="text"
          placeholder="Adresa donatora.."
          onChange={(e) => { noviDonatorZaUpis.adresa = e.target.value }} />

        <label>Općina</label>
        <select id="opcina"
          required
          onChange={(e) => { noviDonatorZaUpis.opcinaId =parseInt(e.target.value) }}>
          <option>Izaberite općinu stanovanja</option>
          {opcine.map((opcina) => (
            <option value={opcina.opcinaId}>{opcina.nazivOpcine}</option>
          ))}
        </select>

        <label>Krvna grupa</label>
        <select id="krvnaGrupa"
          required
          onChange={(e) => { noviDonatorZaUpis.krvnaGrupaId = parseInt(e.target.value) }}>
          <option>Izaberite krvnu grupu</option>
          {krvneGrupe.map((krvnaGrupa) => (
            <option value={krvnaGrupa.krvnaGrupaId}>{krvnaGrupa.krvnaGrupa1}</option>
          ))}
        </select>

        <label>RH faktor</label>
        <select id="faktor"
          required
          onChange={(e) => { noviDonatorZaUpis.faktorId = parseInt(e.target.value)}}>
          <option>Izaberite RH faktor</option>
          {faktori.map((faktor) => (
            <option value={faktor.faktorId}>{faktor.faktor}</option>
          ))}
        </select>

        <label>Kontakt telefon</label>
        <input
          required
          type="text"
          placeholder="U formatu bez / i -"
          onChange={(e) => { noviDonatorZaUpis.telefon = e.target.value }} />

        <label>E-mail</label>
        <input
          type="text"
          placeholder="E-mail donatora"
          onChange={(e) => { noviDonatorZaUpis.email = e.target.value }} />

        <label>Napomena</label>
        <input
          type="text"
          placeholder="Napomena "
          onChange={(e) => { noviDonatorZaUpis.napomena = e.target.value }} />


        <input type="submit" onClick={(e) => handleSubmit(e)} />
      </form>

    </div>
          

  )
}

export default NoviDonator