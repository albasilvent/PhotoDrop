import { SearchBar } from "./SearchBar";
import { SearchPosts } from "./SearchPosts";

export function SearchMain(){
    return <main>
        <SearchBar/>
        <h2 style={{fontSize:"15px"}}>Otros post que te podrían interesar...</h2>
        <SearchPosts/>
    </main>
}