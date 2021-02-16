import React, { useState } from 'react';

const AddCountry = () => {
  // let isErroneous = false;
  const [country, setCountry] = useState("");
  const [isErroneous, setIsErroneous] = useState(false);
  const [testimony, setTestimony] = useState(null);
  const [testimonyList, setTestimonyList] = useState([]);
  const [disableCountry, setDisableCountry] = useState(false)

  const isValid = (e) => {
    let isValid = /^[a-zA-Z]+$/.test(e.target.value);
    return isValid;
  }
  const inputHandler = (e) => {
    //chekck if not character
    if (isValid(e)) {
      setIsErroneous(false);
      setCountry(e.target.value)
    } else {
      setIsErroneous(true);
    }
  }

  const testimonyAddHandler = (e) => {
    e.preventDefault();
    let itemToAdd = {
      id: testimonyList.length + 1,
      text: testimony
    }
    setTestimonyList(testimonyList => [...testimonyList, itemToAdd]);
    setTestimony("");
    setDisableCountry(true);
  }

  function submitHandler() {
    const stateSoFar = JSON.parse(localStorage.getItem('state'));
    let countryToAdd = {
      id: stateSoFar.countries.length + 1,
      name: country,
      testimonies: testimonyList
    };
    let newState = { ...stateSoFar, countries: [...stateSoFar.countries, countryToAdd] };
    localStorage.setItem('state', JSON.stringify(newState));
    setCountry("");
    setTestimonyList([]);
    setDisableCountry(true)
  };

  return (
    <>
      <div className="row container add-new">
        <form className="col s12 m10" onSubmit={testimonyAddHandler}>
          {isErroneous}
          <div className="row">
            <div className="input-field col s12 m6">
              <label htmlFor="country" className="active">Country Name</label>
              <input placeholder="Please provide the name of the country"
                id="coutry" type="text" value={country}
                className="validate" onChange={inputHandler}
                disabled={disableCountry} />
              {isErroneous ? <span className="type-error">
                {"Please provide albhabets only"}</span> : null}
            </div>
            <div className="row">
              <div className="input-field col s12 m10">
                <label htmlFor="testimony" className="active">Testimony</label>
                <textarea id="testimony" className="materialize-textarea"
                  value={testimony || ""}
                  onChange={(e) => setTestimony(e.target.value)}></textarea>
              </div>
              <div className="col s10 m2">
                <button className="btn orange lighten-1 z-depth-2" disabled={!country || !testimony}>Add</button>
              </div>
            </div>
          </div>
        </form>
      </div>
      {testimonyList.length ? <AddedTestimony testimonyList={testimonyList} /> : null}
    </>

  )



  function AddedTestimony({ testimonyList }) {
    return (
      <div className="container row">
        <h5 className="card-title left-align">Testimonials </h5>
        <hr></hr>

        {testimonyList.map((item) =>
          <div className="col m5 s10 card testimony-container" key={item.id}>
            <Testimony testimony={item} />
          </div>)}
        <button className="btn fixed-action-btn btn-large green lighten-1 z-depth-2" onClick={submitHandler}>Submit</button>
      </div>

    )
  }
}

function Testimony({ testimony }) {
  return (
    <div className="card blue-grey darken-1" >
      <div className="card-content white-text">
        <span className="card-title">{testimony.id}</span>
        <p className="card-body">{testimony.text}</p>
      </div>
    </div>
  )
}


export default AddCountry;