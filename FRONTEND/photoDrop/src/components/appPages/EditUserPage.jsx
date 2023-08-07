import { Header } from "../Header";
import {EditUser} from "../EditUser"
import { Footer } from "../Footer";
import { useCurrentUser } from "../../functions/utils/use-current-user";

export function EditUserPage() {

    const currentUser = useCurrentUser();

    return (
        <>
            <Header />
            {currentUser && <EditUser currentUser={currentUser}/>}
            <Footer />
        </>
    );
}
