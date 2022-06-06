/* eslint-disable react/no-direct-mutation-state */
import React, { Component } from "react";

import "./Donacije.css";

export class Donacije extends Component {
  constructor(props) {
    super(props);

    this.state = {
      donacije: [],
      donatori: [],
      ustanova: [],
      donacijaId: 0,
      jmbg: "",
      nazivUstanove: "",
      datum: "",
      opis: "",

      datumFilter: "",
      krvnaGrupaFilter: "",
      faktorFilter: "",

      donacijeWithoutFilter: [],
    };
  }

  FilterFn() {
    var datumFilter = this.state.datumFilter;
    var krvnaGrupaFilter = this.state.krvnaGrupaFilter;
    var faktorFilter = this.state.faktorFilter;

    var filteredData = this.state.donacijeWithoutFilter.filter(function (el) {
      return (
        el.datum
          .toString()
          .toLowerCase()
          .includes(datumFilter.toString().trim().toLowerCase()) &&
        el.krvnaGrupa
          .toString()
          .toLowerCase()
          .includes(krvnaGrupaFilter.toString().trim().toLowerCase()) &&
        el.faktor
          .toString()
          .toLowerCase()
          .includes(faktorFilter.toString().trim().toLowerCase())
      );
    });

    this.setState({ donacije: filteredData });
  }
  changekrvnaGrupaFilter = (e) => {
    this.state.krvnaGrupaFilter = e.target.value;
    this.FilterFn();
  };

  changedatumFilter = (e) => {
    this.state.datumFilter = e.target.value;
    this.FilterFn();
  };

  changefaktorFilter = (e) => {
    this.state.faktorFilter = e.target.value;
    this.FilterFn();
  };
  sortResult(prop, asc) {
    var sortedData = this.state.donacijeWithoutFilter.sort(function (a, b) {
      if (asc) {
        return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
      } else {
        return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
      }
    });

    this.setState({ donacije: sortedData });
  }

  refreshList() {
    fetch("https://localhost:44343/api/Donacija/prikaziSveDonacije")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ donacije: data, donacijeWithoutFilter: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }
  render() {
    const { donacije } = this.state;

    return (
      <div>
        <div className="filteri">
          <input
            className="input"
            onChange={this.changekrvnaGrupaFilter}
            placeholder="Filter krvne grupe npr. A"
          />
          <input
            className="input"
            onChange={this.changefaktorFilter}
            placeholder="Filter RH faktora npr. + "
          />
          <input
            className="input"
            onChange={this.changedatumFilter}
            placeholder="Filter datuma donacije"
          />
        </div>
        
        <table id="donacijeTabela">
          
            <tr>
              <th >JMBG</th>
              <th>Ime</th>
              <th>Prezime</th>
              <th>Broj knjižice</th>
              <th>Krvna grupa</th>
              <th>RH faktor</th>
              <th>Broj telefona</th>
              <th>Email</th>
              <th>Datum</th>
              <th>Opis</th>
              <th>Opcina</th>
              <th>Ustanova</th>
            </tr>
      
  
            {donacije.map((donacije) => (
              <tr key={donacije.donacijaId}>
                <td>{donacije.jmbg}</td>
                <td>{donacije.ime}</td>
                <td>{donacije.prezime}</td>
                <td>{donacije.brojKnjizice}</td>
                <td>{donacije.krvnaGrupa}</td>
                <td>{donacije.faktor}</td>
                <td>{donacije.telefon}</td>
                <td>{donacije.email}</td>
                <td style={{whiteSpace: "nowrap"}}>{donacije.datum.substring(0,10)}</td>
                <td>{donacije.opis}</td>
                <td>{donacije.nazivOpcine}</td>
                <td>{donacije.nazivUstanove}</td>
              </tr>
            ))}
        
        </table>
       
      </div>
    );
  }
}
