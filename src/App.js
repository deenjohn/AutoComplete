import { useEffect, useState } from 'react';
import axios from 'axios';
import { url_endpoint } from './constants';
import AutoComplete from './components/Autocomplete';
import "./App.css";

function App() {
  const [autosearchRes, setAutoSearchRes] = useState([]);
  useEffect(() => {
    axios.get(url_endpoint).then((res) => {
      setAutoSearchRes(res.data.split("\n"))
    });
  }, []);
  return (
    <div className="searchBlock">
      <div className="search-bar-container">
        <AutoComplete data={autosearchRes} />
      </div>
    </div>
  );
}

export default App;
