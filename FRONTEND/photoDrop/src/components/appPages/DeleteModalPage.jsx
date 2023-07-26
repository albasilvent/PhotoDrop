import { DeleteModal } from "../DeleteModal";
import { Footer } from "../Footer";
import { Header } from "../Header";

export function DeleteModalPage () {
    return <main className="Page">
        <Header/>
        <DeleteModal/>
        <Footer/>
    </main>
}