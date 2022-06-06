import React, { useEffect, useState } from 'react'
import './NovaDonacija.css'
import { useNavigate } from 'react-router-dom';


const NovaDonacija = () => {
  const navigate = useNavigate();
  const [jmbgovi, setJmbg] = useState([]);
  const [ustanove, setUstanove] = useState([]);

  var novaDonacija = {
    jmbg: '',
    ustanovaId:0,
    datum:'',
    opis:''
  }



  const fetchJmbg = async () => {
    try {
      const response = await fetch('https://localhost:44343/api/Osobe/prikaziSveOsobe');
      if (!response.ok) throw Error('Did not recived expected data');
      const data = await response.json();
      console.log(data);
      setJmbg(data);
    } catch (error) {
      console.log(error.message)
    }
  }


  const fetchUstanove = async () => {
    try {
      const response = await fetch('https://localhost:44343/api/Ustanova/prikaziSveUstanove');
      if (!response.ok) throw Error('Did not recived expected data');
      const data = await response.json();
      console.log(data);
      setUstanove(data);
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    (async () => await fetchJmbg())();
    (async () => await fetchUstanove())();
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(novaDonacija);

    try {

      fetch('https://localhost:44343/api/Donacija/unesiDonaciju', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(novaDonacija)
      }).then(() => {
        console.log('Nova osoba dodana');
      })
    } catch (error) {
      console.log(error);
    } finally{navigate("/donacije")}

  }


  return (
    <div className='forma'>
      <h3>Forma za unos donacije:</h3>
      <form >
        <label>Jmbg</label>
        <select id="jmbg1"
          required
          onChange={(e) => { novaDonacija.jmbg = e.target.value }}>
          <option>Izaberite JMBG</option>
          {jmbgovi.map((jmbg) => (
            <option value={jmbg.jmbg}>{jmbg.jmbg}</option>
          ))}
        </select>
        <label>Ustanova</label>
        <select id="ustanova1"
          required
          onChange={(e) => { novaDonacija.ustanovaId =parseInt(e.target.value) }}>
          <option>Izaberite ustanovu</option>
          {ustanove.map((ustanova) => (
            <option value={ustanova.ustanovaId}>{ustanova.nazivUstanove}</option>
          ))}
        </select>
       
        <label>Datum</label>
        <input
          required
          type="date"
          placeholder="Izaberite datum"
          onChange={(e) => { novaDonacija.datum = e.target.value }} />

        <label>Opis donacije</label>
        <input
          required
          type="text"
          placeholder="Upisite opis"
          onChange={(e) => { novaDonacija.opis = e.target.value }} />
        <input type="submit" onClick={(e) => handleSubmit(e)} />
      </form>
      
      </div>
   

  )
}

export default NovaDonacija