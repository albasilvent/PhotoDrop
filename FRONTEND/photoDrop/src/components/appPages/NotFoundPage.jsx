import { Header } from "../Header";
import {NotFound} from "../NotFound"
import { Footer } from "../Footer";

export function NotFoundPage(){
    return (
        <>
            <Header />
            <NotFound/>
            <Footer />
        </>
    );
}