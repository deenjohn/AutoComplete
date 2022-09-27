import { useState, useRef, useMemo } from 'react';
import './autoComplete.css';
import Highlighter from './highlighter';

const AutoComplete = ({ data }) => {
  const [isVisbile, setVisiblity] = useState(false);
  const [search, setSearch] = useState('');
  const searchResultRef = useRef(null);

  const suggestions = useMemo(() => {
    if (!search) return [];
    if (search.length > 2) {
      const numberOfSearchMatch = data.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase())
      );
      return numberOfSearchMatch;
    } else return [];
  }, [data, search]);


  const showSuggestion = () => setVisiblity(true);
  return (
    <div style={{ height: '100%' }}>
      <input
        type="text"
        name="search"
        className="search-bar"
        autoComplete="off"
        value={search}
        onClick={showSuggestion}
        onChange={(e) => setSearch(e.target.value)}
        
      />
      <div className={`search-result ${isVisbile ? 'visible' : 'invisible'}`}>
        <ul className="list-group" ref={searchResultRef}>
          {suggestions.map((item, idx) => {
            // highlight word
            return <div>
              <Highlighter search={search}>{item}</Highlighter>
            </div>

          })}
        </ul>
      </div>
    </div>
  );
};

export default AutoComplete;
