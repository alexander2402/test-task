import React, {useEffect, useState} from 'react';
import Card from "./Component/Card";
import Pagination from "react-js-pagination/src/components/Pagination";


function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activePage, setActivePage] = useState(1);

  async function fetchData(searchQuery, page) {
    const url = `https://www.omdbapi.com/?i=tt3896198&apikey=8523cbb8&s=${searchQuery}&page=${page}`;
    const res = await fetch(url);
    res.json()
      .then(res => {
        setCards(res.Search);
      });
  }

  function searchHandler(event) {
    setSearchQuery(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();
    fetchData(searchQuery, 1)
  }

  function handlePageChange(pageNumber) {

  }

  return (
    <div className={'container'}>
      <div className="navbar navbar-expand-lg bg-light ">
        <div className="navbar-brand">Movie Catalog</div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <form className="form-inline my-2 my-lg-0" onSubmit={submitHandler}>
              <input className="form-control mx-auto" style={{width: '40rem'}} type="search" placeholder="Search"
                     aria-label="Search" value={searchQuery} onChange={searchHandler}/>
              <button className="btn btn-outline-success mx-3 " type="submit" style={{width: '7rem'}}>Search</button>
            </form>
            <li className="nav-item ">
              <div className="nav-link dropdown-toggle mx- 3">
                Pavel Horski
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className='row' style={{border: "none"}}>
        {
          cards.length ?
            cards.map((card, id) => (<Card card={card} key={id}/>))
            : <div>Nothing found</div>
        }
      </div>
      <div className='row' style={{border: "none"}}>
        <Pagination onChange={handlePageChange} totalItemsCount={cards.length} activePage={activePage}/>
      </div>
    </div>
  );
}

export default App;
