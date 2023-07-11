import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { sendValidationCode } from "../api/send-validation-code";
import { Form } from "../components/forms/Form.jsx";
import { FormInput } from "../components/forms/FormInput";
import { Button } from "../components/forms/Button";

export function ValidateEmail() {
    const [queryParams] = useSearchParams();
    const navigate = useNavigate();
    const email = queryParams.get("email");

    const [code, setCode] = useState();

    async function submitCode() {
        try {
            await sendValidationCode({
                email,
                code,
            });
            navigate("/login");
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Form onSubmit={submitCode}>
            <h2>Validación del email</h2>
            <p>Se ha enviado un código de validación al email: {email}</p>
            <p>Escribe aquí el código para validarlo</p>
            <FormInput onChange={setCode} />
            <Button type={"submit"}>Enviar</Button>
        </Form>
    );
}
