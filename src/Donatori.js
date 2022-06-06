/* eslint-disable react/no-direct-mutation-state */
import React, { Component } from "react";
import "./Donatori.css";
export class Donatori extends Component {
  constructor(props) {
    super(props);

    this.state = {
      donatori: [],
      historija: [],
      faktori: [],
      opcine: [],
      krvneGrupe: [],
      historijaBolesti: [],
      historijaDonacija: [],
      modalTitle: "",
      jmbg: 0,
      ime: "",
      prezime: "",
      brojKnjizice: "",
      adresa: "",
      opcinaId: 0,
      krvnaGrupaId: 0,
      faktorId: 0,
      telefon: "",
      email: "",
      datum: "",
      dijagnozaId: "",
      dijagnoza: "",
      napomena: "",

      jmbgFilter: "",
      opcinaFilter: "",
      faktorFilter: "",
      krvnaGrupaFilter: "",

      donatoriWithoutFilter: [],
    };
  }

  FilterFn() {
    var jmbgFilter = this.state.jmbgFilter;
    var krvnaGrupaFilter = this.state.krvnaGrupaFilter;
    var faktorFilter = this.state.faktorFilter;
    var opcinaFilter = this.state.opcinaFilter;

    var filteredData = this.state.donatoriWithoutFilter.filter(function (el) {
      return (
        el.jmbg
          .toString()
          .toLowerCase()
          .includes(jmbgFilter.toString().trim().toLowerCase()) &&
        el.krvnaGrupa
          .toString()
          .toLowerCase()
          .includes(krvnaGrupaFilter.toString().trim().toLowerCase()) &&
        el.faktor
          .toString()
          .toLowerCase()
          .includes(faktorFilter.toString().trim().toLowerCase()) &&
        el.nazivOpcine
          .toString()
          .toLowerCase()
          .includes(opcinaFilter.toString().trim().toLowerCase())
      );
    });

    this.setState({ donatori: filteredData });
  }

  changejmbgFilter = (e) => {
    this.state.jmbgFilter = e.target.value;
    this.FilterFn();
  };

  changekrvnaGrupaFilter = (e) => {
    this.state.krvnaGrupaFilter = e.target.value;
    this.FilterFn();
  };

  changeopcinaFilter = (e) => {
    this.state.opcinaFilter = e.target.value;
    this.FilterFn();
  };

  changefaktorFilter = (e) => {
    this.state.faktorFilter = e.target.value;
    this.FilterFn();
  };

  refreshList() {
    fetch("https://localhost:44343/api/Osobe/prikaziSveOsobe")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ donatori: data, donatoriWithoutFilter: data });
      });

    fetch("https://localhost:44343/api/RhFaktor/prikaziSveRhFaktore")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ faktori: data });
      });

    fetch("https://localhost:44343/api/Opcina/prikaziSveOpcine")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ opcine: data });
      });

    fetch("https://localhost:44343/api/KrvnaGrupa/prikaziSveKrvneGrupe")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ krvneGrupe: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  changeIme = (e) => {
    this.setState({ ime: e.target.value });
  };
  changePrezime = (e) => {
    this.setState({ prezime: e.target.value });
  };
  changebrojKnjizice = (e) => {
    this.setState({ brojKnjizice: e.target.value });
  };
  changeAdresa = (e) => {
    this.setState({ adresa: e.target.value });
  };
  changenazivOpcine = (e) => {
    this.setState({ opcinaId: parseInt(e.target.value) });
  };

  changekrvnaGrupa = (e) => {
    this.setState({ krvnaGrupaId: parseInt(e.target.value) });
  };
  changeFaktor = (e) => {
    this.setState({ faktorId: parseInt(e.target.value) });
  };
  changeTelefon = (e) => {
    this.setState({ telefon: e.target.value });
  };
  changeEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  changeNapomena = (e) => {
    this.setState({ napomena: e.target.value });
  };

  deleteClick(jmbg) {
    if (window.confirm("Da li ste sigurni?")) {
      fetch("https://localhost:44343/api/Osobe/obrisiPodatak/" + jmbg, {
        method: "DELETE",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            alert(result);
            this.refreshList();
          },
          (error) => {
            alert("Failed");
          }
        );
    }
  }

  editClick(don) {
    this.setState({
      modalTitle: "Uredi donora",
      jmbg: don.jmbg,
      ime: don.ime,
      prezime: don.prezime,
      brojKnjizice: don.brojKnjizice,
      adresa: don.adresa,
      telefon: don.telefon,
      email: don.email,
      napomena: don.napomena,
    });
  }

  createClick() {
    fetch("https://localhost:44343/api/Osobe/unesiDonora", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ime: this.state.ime,
        prezime: this.state.prezime,
        brojKnjizice: this.state.brojKnjizice,
        adresa: this.state.adresa,
        opcinaId: this.state.opcinaId,
        krvnaGrupaId: this.state.krvnaGrupaId,
        faktorId: this.state.faktorId,
        telefon: this.state.telefon,
        email: this.state.email,
        napomena: this.state.napomena,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          this.refreshList();
        },
        (error) => {
          alert("Failed");
        }
      );
  }
  updateClick() {
    fetch(
      "https://localhost:44343/api/Osobe/izmijeniOsobu?jmbg=" + this.state.jmbg,
      {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",

          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jmbg: this.state.jmbg,
          ime: this.state.ime,
          prezime: this.state.prezime,
          brojKnjizice: this.state.brojKnjizice,
          adresa: this.state.adresa,
          telefon: this.state.telefon,
          email: this.state.email,
          napomena: this.state.napomena,
        }),
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          alert("Uređivanje uspješno");
          this.refreshList();
          console.log(result);
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  handleClick(jmbg) {
    fetch(
      "https://localhost:44343/api/Historija/historijaPoJmbg?jmbg=" + jmbg,
      {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ historijaBolesti: result });
          console.log(result);
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  handleDonacija(jmbg) {
    fetch("https://localhost:44343/api/Donacija/donacijePoJMBG?jmbg=" + jmbg, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ historijaDonacija: result });
          console.log(result);
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  render() {
    const {
      donatori,
      modalTitle,
      historijaBolesti,
      historijaDonacija,
      jmbg,
      ime,
      prezime,
      brojKnjizice,
      adresa,
      telefon,
      email,
      napomena,
    } = this.state;

    return (
      <div className="donatori">
        <div className="filteri">
          <input
            className="input"
            onChange={this.changejmbgFilter}
            placeholder="Filter donatora po JMBG"
          />

          <input
            className="input"
            onChange={this.changeopcinaFilter}
            placeholder="Filter donatora po općinama"
          />

          <input
            className="input"
            onChange={this.changekrvnaGrupaFilter}
            placeholder="Filter krvne grupe npr. A"
          />

          <input
            className="input"
            onChange={this.changefaktorFilter}
            placeholder="Filter RH faktora npr. +"
          />
        </div>
        <table id="donoriTabela">
          <tr>
            <th>JMBG</th>
            <th>Ime</th>
            <th>Prezime</th>
            <th>Broj knjižice</th>
            <th>Adresa</th>
            <th>Općina</th>
            <th>Krvna grupa</th>
            <th>RH faktor</th>
            <th>Broj telefona</th>
            <th>E-mail</th>
            <th>Napomena</th>
            <th>Dodatne opcije</th>
          </tr>

          {donatori.map((don) => (
            <tr key={don.jmbg}>
              <td>{don.jmbg}</td>
              <td>{don.ime}</td>
              <td>{don.prezime}</td>
              <td>{don.brojKnjizice}</td>
              <td>{don.adresa}</td>
              <td>{don.nazivOpcine}</td>
              <td>{don.krvnaGrupa}</td>
              <td>{don.faktor}</td>
              <td>{don.telefon}</td>
              <td>{don.email}</td>
              <td>{don.napomena}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-light mr-1"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  title="Uredi osobu"
                  onClick={() => this.editClick(don)}
                >
                  <img
                    src="https://toppng.com/uploads/preview/75476-2019-02-08-edit-icon-png-small-11563142463qiwrzqx0e1.png"
                    alt="myimage"
                    width={17}
                  />
                </button>

                <button
                  type="button"
                  title="Obriši osobu"
                  className="btn btn-light mr-1"
                  onClick={() => this.deleteClick(don.jmbg)}
                >
                  <img
                    src="https://icon-library.com/images/delete-icon-png/delete-icon-png-19.jpg"
                    alt="myimage"
                    width={17}
                  />
                </button>

                <button
                  type="button"
                  title="Prikaži historiju bolesti"
                  className="btn btn-light mr-1"
                  onClick={() => this.handleClick(don.jmbg)}
                >
                  <img
                    src="https://flyclipart.com/thumbs/history-timeline-icon-33-project-timeline-icon-1265687.png"
                    alt="myimage"
                    width={25}
                  />
                </button>

                <button
                  title="Prikaži historiju donacija"
                  type="button"
                  className="btn btn-light mr-1"
                  onClick={() => this.handleDonacija(don.jmbg)}
                >
                    <img
                    src="https://e7.pngegg.com/pngimages/752/940/png-clipart-american-red-cross-blood-donation-australian-red-cross-donation-blood-miscellaneous-triangle.png"
                    alt="myimage"
                    width={17}
                  />
                </button>
              </td>
            </tr>
          ))}
        </table>
        <h3 >Historija bolesti </h3>
        <table id="donoriTabela">
          <thead>
            <tr>
              <th>JMBG</th>
              <th>Ime</th>
              <th>Prezime</th>
              <th>Broj knjižice</th>
              <th>Datum</th>
              <th>Dijagnoza</th>
            </tr>
          </thead>
          <tbody>
            {historijaBolesti.map((don) => (
              <tr>
                <td>{don.jmbg}</td>
                <td>{don.ime}</td>
                <td>{don.prezime}</td>
                <td>{don.brojKnjizice}</td>
                <td style={{whiteSpace: "nowrap"}}>{don.datum.substring(0,10)}</td>
                <td>{don.dijagnoza}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Historija donacija</h3>
        <table id="donoriTabela">
          <thead>
            <tr>
              <th>JMBG</th>
              <th>Ime</th>
              <th>Prezime</th>
              <th>Broj knjižice</th>
              <th>Krvna grupa</th>
              <th>RH faktor</th>
              <th>Telefon</th>
              <th>E-mail</th>
              <th>Datum</th>
              <th>Opis</th>
              <th>Naziv ustanove</th>
              <th>Naziv općine</th>
            </tr>
          </thead>
          <tbody>
            {historijaDonacija.map((don) => (
              <tr key={don.donacijaId}>
                <td>{don.jmbg}</td>
                <td>{don.ime}</td>
                <td>{don.prezime}</td>
                <td>{don.brojKnjizice}</td>
                <td>{don.krvnaGrupa}</td>
                <td>{don.faktor}</td>
                <td>{don.telefon}</td>
                <td>{don.email}</td>
                <td style={{whiteSpace: "nowrap"}}>{don.datum.substring(0,10)}</td>
                <td>{don.opis}</td>
                <td>{don.nazivUstanove}</td>
                <td>{don.nazivOpcine}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <div className="d-flex flex-row bd-highlight mb-3">
                  <div className="p-2 w-50 bd-highlight">
                    <div className="input-group mb-3">
                      <span className="input-group-text">Ime</span>
                      <input
                        type="text"
                        className="form-control"
                        ref={ime}
                        defaultValue={this.state.ime}
                        onChange={this.changeIme}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">Prezime</span>
                      <input
                        type="text"
                        className="form-control"
                        ref={prezime}
                        defaultValue={this.state.prezime}
                        onChange={this.changePrezime}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">Broj knjižice</span>
                      <input
                        type="text"
                        className="form-control"
                        value={brojKnjizice}
                        onChange={this.changebrojKnjizice}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">Adresa</span>
                      <input
                        type="text"
                        className="form-control"
                        ref={adresa}
                        defaultValue={this.state.adresa}
                        onChange={this.changeAdresa}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Telefon</span>
                      <input
                        type="text"
                        className="form-control"
                        value={telefon}
                        onChange={this.changeTelefon}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">email</span>
                      <input
                        type="text"
                        className="form-control"
                        value={email}
                        onChange={this.changeEmail}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">Napomena</span>
                      <input
                        type="text"
                        className="form-control"
                        value={napomena}
                        onChange={this.changeNapomena}
                      />
                    </div>
                  </div>
                </div>

                {jmbg !== 0 ? (
                  <button
                    type="button"
                    className="btn btn-danger float-start"
                    onClick={() => this.updateClick()}
                  >
                    Update
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
