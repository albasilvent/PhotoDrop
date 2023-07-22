import "../styles/SearchBar.css";

// eslint-disable-next-line react/prop-types
export function SearchBar({search, inputOnChange}) {
   
    return (
        <div className="searchBar">
            <p className="material-symbols-rounded">Search</p>
            <input
                type="text"
                placeholder="Buscar"
                value={search}
                onChange={inputOnChange}
            ></input>
        </div>
    );
}
