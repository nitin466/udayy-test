import React, { useState, useReducer, useEffect } from 'react';

const MyContext = React.createContext();

let initialState = {
  countries: [
    {
      id: 1,
      name: 'India',
      testimonies: [
        { id: 1, text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. veritatis necessitatibus illum.' },
        { id: 2, text: 'Consequuntur ratione earum corporis eveniet sequi maiores? ' },
        { id: 3, text: 'Quod sed eaque soluta, nesciunt ut delectus sequi eveniet officiis ullam obcaecati' },
        { id: 4, text: 'veritatis necessitatibus illum.' },
        { id: 5, text: 'Consequuntur ratione earum corporis eveniet sequi maiores? ' },
      ]
    },
    {
      id: 2,
      name: 'USA',
      testimonies: [
        { id: 1, text: 'Testmimony_USA_1' },
        { id: 2, text: 'Testmimony_USA_2' },
        { id: 3, text: 'Testmimony_USA_3' },
        { id: 4, text: 'Testmimony_USA_4' },
        { id: 5, text: 'Testmimony_USA_5' },
      ]
    }
  ],
  selectedCountry: "",
  selectedTestimonies: []
}

const myRedcucer = (state, action) => {
  debugger
  switch (action.type) {
    case 'CHANGE_COUNRTY':
      let selected = state.countries.filter((item) => item.name === action.country);
      let testimonials = selected[0].testimonies
      return {
        ...state,
        selectedCountry: action.country,
        selectedTestimonies: testimonials
      };
    case 'update':
      debugger
      return state;
    default:
      return state;
  }
}

//Main component
const ABTesting = () => {

  useEffect(() => {
    let localStore = localStorage.getItem('state');
    console.log('use effect local', localStore);
    if (!localStore) {
      debugger
      //first render
      localStorage.setItem('state', JSON.stringify(initialState))
    } else {
      initialState = JSON.parse(localStorage.getItem('state'));
      dispatch({ type: 'update' })
    }

  })

  const [country, setCountry] = useState('');
  const [state, dispatch] = useReducer(myRedcucer, initialState);
  let countryList = state.countries.map(({ name }) => name)


  const handleCoutryChange = (e) => {
    setCountry(e.target.value);
    dispatch({ type: 'CHANGE_COUNRTY', country: e.target.value })
  }


  return (
    <MyContext.Provider value={dispatch}>
      <CountrySelect countryList={countryList} />
      <Testimonies testimonyList={state.selectedTestimonies} />
    </MyContext.Provider>
  )

  // component for country dropdown wiht countries form state object
  function CountrySelect() {
    return (
      <div className="container">
        <div className="row">
          <div className="input-field col s12 m5 no-padding-1">
            <select className="" value={state.selectedCountry || country} onChange={(e) => handleCoutryChange(e)}>
              <option value="" disabled defaultValue>Choose country</option>
              {countryList.map(item => {
                return (<option key={item} value={item}>{item}</option>)
              })
              }
            </select>
          </div>
        </div>
      </div>
    )
  }

  //Component for testimonials
  function Testimonies({ testimonyList }) {
    return (
      <div className="container row">
        {testimonyList.length > 0 ? testimonyList.map(testimony =>
          <div className="col m5 s12 card testimony-container" key={testimony.id}>
            <Testimony testimony={testimony} />
          </div>
        ) : country ? <span className="type-error">No testimony found</span> : null}
      </div>
    )
  }

  //component for individual items
  function Testimony({ testimony }) {
    return (
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">{testimony.id}</span>
          <hr></hr>
          <p className="card-body overflow">{testimony.text}</p>
        </div>
      </div>
    )
  }
}

export default ABTesting