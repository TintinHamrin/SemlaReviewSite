import React from 'react';

function FirstPage() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch('/hello')
      .then((res) => res.json())
      .then((data) => setData(data.message))
      .catch((e) => console.error(e));
    fetch('/m').catch((e) => console.error(e));
  }, []);

  const buttonHandler = () => {
    console.log('click');
    fetch('/button-clicks').catch((e) => console.error(e));
  };

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
