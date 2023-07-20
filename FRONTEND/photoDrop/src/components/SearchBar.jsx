import "../styles/SearchBar.css";

export function SearchBar() {
    return (
        <div className="searchBar">
            <p className="material-symbols-rounded">Search</p>
            <input type="text" placeholder="Buscar"></input>
        </div>
    );
}
