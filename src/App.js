import React, { useState, useEffect } from "react";
import Card from "./Component/Card";

function App() {
  const [cards, setCards] = useState([]);
  const [cardsToShow, setCardsToShow] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);

  async function fetchData(searchQuery, page) {
    const url = `https://www.omdbapi.com/?i=tt3896198&apikey=8523cbb8&s=${searchQuery}&page=${page}`;
    const res = await fetch(url);
    res.json().then((res) => {
      setCards(res.Search);
      setCardsToShow(res.Search ? res.Search.slice(0, 4) : null);
    });
  }

  const searchHandler = (event) => {
    setSearchQuery(event.target.value);
  };

  const submitHandler = (event) => {
    if (event) {
      event.preventDefault();
    }
    fetchData(searchQuery, activePage);
  };

  const showFirstFourCards = () => {
    setCardsToShow(cards.slice(0, 4));
  };

  const showSecondFourCards = () => {
    setCardsToShow(cards.slice(4, cards.length));
  };

  const paginationClickHandler = (pageNumber) => {
    setActivePage(pageNumber);
  };
  // это надо сделать лучше :) консоль пиздит что-то, но как-то мне похуй
  useEffect(() => {
    submitHandler();
  }, [activePage]);
  return (
    <div className={"container"}>
      <div className="navbar navbar-expand-lg bg-light">
        <div className="navbar-brand">Movie Catalog</div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <form className="form-inline my-2 my-lg-0" onSubmit={submitHandler}>
              <input
                className="form-control mx-auto"
                style={{ width: "40rem" }}
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={searchHandler}
              />
              <button
                className="btn btn-outline-success mx-3 "
                type="submit"
                style={{ width: "7rem" }}
              >
                Search
              </button>
            </form>
            <li className="nav-item ">
              <div className="nav-link dropdown-toggle mx- 3">Pavel Horski</div>
            </li>
          </ul>
        </div>
      </div>
      <div className="row" style={{ border: "none" }}>
        {cardsToShow && cardsToShow.length ? (
          cardsToShow.map((card, id) => <Card card={card} key={id} />)
        ) : (
          <div>Nothing found</div>
        )}
      </div>
      {cardsToShow && cardsToShow.length ? (
        <div className="row" style={{ border: "none" }}>
          <button
            onClick={() => {
              showFirstFourCards();
            }}
          >
            первая четверка
          </button>
          <button
            onClick={() => {
              showSecondFourCards();
            }}
          >
            остальные
          </button>
        </div>
      ) : null}
      {cards && cards.length ? (
        <div className="row" style={{ border: "none" }}>
          <button
            onClick={() => {
              paginationClickHandler(1);
            }}
          >
            1 page
          </button>
          <button
            onClick={() => {
              paginationClickHandler(2);
            }}
          >
            2 page
          </button>
          <button
            onClick={() => {
              paginationClickHandler(3);
            }}
          >
            3 page
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default App;
