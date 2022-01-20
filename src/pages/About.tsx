import React, { useState, FormEvent, useEffect, useRef } from 'react';
import './About.scss';

function About() {
  const [search, setSearch] = useState('');
  const [searchQt, setSearchQt] = useState('');
  const [query, setQuery] = useState('');
  const [queryQt, setQueryQt] = useState('');
  const [result, setResult] = useState([]);

  // const quantityRef = useRef<HTMLInputElement>(null);
  // const quantityGifs = quantityRef.current?.value; //works but causes no rerendering when changed. better use state?

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(search);
    setQueryQt(searchQt);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=b7nF4tFBPA5uc9IaALFE4sulM0JvQVtm&q=${query}&limit=${queryQt}&offset=0&rating=pg-13&lang=en`
        );
        const json = await data.json();
        setResult(
          json.data.map((item: any) => {
            return item.images.preview.mp4;
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
    if (query !== '') {
      fetchData();
    }
  }, [query, queryQt]);

  return (
    <div className="main-wrapper">
      <p className="about-text">
        I am Tintin, a former baker turned programmer. Here we can discuss the
        love of my life, Semlor. Search a GIF while thinking about which semla
        experience you feel like sharing with me today.
      </p>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="search gif"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="number"
          placeholder="how many gifs?"
          // ref={quantityRef}
          onChange={(e) => setSearchQt(e.target.value)}
        />
        <button>Search</button>
      </form>
      <div className="gif-items">
        {result.map((item) => (
          <div className="item" key={item}>
            <video autoPlay loop key={item} src={item}></video>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;
