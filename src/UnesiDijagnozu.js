import React, { useEffect, useState } from 'react'
import './Dijagnoza.css'
import { useNavigate } from 'react-router-dom';
const UnesiDijagnozu = () => {

  const [jmbgovi, setJmbg] = useState([]);
  const navigate = useNavigate();

 

  var novaDijagnoza ={
    jmbg:'',
    dijagnoza:'',
    datum:''
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

  useEffect(() => {
    (async () => await fetchJmbg())();
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(novaDijagnoza);

    try {

      fetch('https://localhost:44343/api/Historija/unesiDijagnozu', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(novaDijagnoza)
      }).then(() => {
        console.log('Nova osoba dodana');
      })
    } catch (error) {
      console.log(error);
    } finally{navigate("/donatori")}

  }


  return (
    <div className='forma2'>
        <h3>Forma za unos dijagnoze:</h3>
      <form >
        <label>Jmbg</label>
        <select id="jmbg"
          required
          onChange={(e) => { novaDijagnoza.jmbg = e.target.value }}>
          <option>Izaberite JMBG</option>
          {jmbgovi.map((jmbg) => (
            <option value={jmbg.jmbg}>{jmbg.jmbg}</option>
          ))}
        </select>
        <label>Datum</label>
        <input
          required
          type="date"
          placeholder="Izaberite datum"
          onChange={(e) => { novaDijagnoza.datum = e.target.value }} />

        <label>Opis dijagnoze</label>
        <input
          required
          type="text"
          placeholder="Upisite opis dijagnoze"
          onChange={(e) => { novaDijagnoza.dijagnoza = e.target.value }} />
        <input type="submit" onClick={(e) => handleSubmit(e)} />
      </form>
    </div>

  )
}

export default UnesiDijagnozu