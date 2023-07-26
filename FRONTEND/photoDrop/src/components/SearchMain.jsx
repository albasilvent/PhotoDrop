import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { SearchPosts } from "./SearchPosts";
import "../styles/SearchMain.css";

export function SearchMain() {
    const [search, setSearch] = useState("");

    function inputOnChange(evt) {
        setSearch(evt.target.value);
    }
    return (
        <main className="Page">
            <SearchBar search={search} inputOnChange={inputOnChange} />
            {!search && <h2>Otros post que te podrían interesar...</h2>}
            {search && <h2 className="resultados">Resultados:</h2>}
            <SearchPosts search={search} />
        </main>
    );
}
