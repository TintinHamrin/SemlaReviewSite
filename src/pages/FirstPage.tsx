import React, { useEffect } from 'react';
import Server from '../../server/server';

function FirstPage() {
  const [data, setData] = React.useState(null);
  const [mostViewed, setMostViewed] = React.useState(null);

  React.useEffect(() => {
    fetch('/website-counter')
      .then((res) => res.json())
      .then((data) => setData(data.message))
      .catch((e) => console.error(e));
    fetch('/visits-count').catch((e) => console.error(e));
  }, []);

  const buttonHandler = () => {
    console.log('click');
    fetch('/button-clicks').catch((e) => console.error(e));
  };

  useEffect(() => {
    fetch('/hello')
      .then((response) => response.json())
      .then((data) => setMostViewed(data))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{data || 'Loading...'}</p>
      </header>
      <div>
        <button onClick={buttonHandler}>Click</button>
      </div>
    </div>
  );
}

export default FirstPage;
