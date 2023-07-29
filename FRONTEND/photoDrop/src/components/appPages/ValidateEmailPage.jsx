// import { useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { sendValidationCode } from "../../api/send-validation-code";
// import { Form } from "../forms/Form.jsx";
// import { FormInput } from "../forms/FormInput";
// import { Button } from "../forms/Button";
// import "../../styles/ValidateEmail.css";

// export function ValidateEmailPage() {
//     const [queryParams] = useSearchParams();
//     const navigate = useNavigate();
//     const email = queryParams.get("email");

//     const [code, setCode] = useState();

//     async function submitCode() {
//         try {
//             await sendValidationCode({
//                 email,
//                 code,
//             });
//             navigate("/login");
//         } catch (err) {
//             console.error(err);
//         }
//     }

//     return (
//         <Form onSubmit={submitCode}>
//             <div className="image">
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g strokeWidth="0" id="SVGRepo_bgCarrier"></g><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#000000" d="M20 7L9.00004 18L3.99994 13"></path> </g></svg>
//             </div>
//             <div className="content">
//                 <h2>Validación del email</h2>
//                 <p>Se ha enviado un código de validación al email: {email}</p>
//                 <p>Escribe aquí el código para validarlo</p>
//             </div>
//             <FormInput className="input" onChange={setCode} />
//             <Button type={"submit"}>Enviar</Button>
//         </Form>
//     );
// }