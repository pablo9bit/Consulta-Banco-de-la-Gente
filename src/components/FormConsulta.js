import { useState } from "react";
import firebase from "../config/firebase";
import ReCAPTCHA from "react-google-recaptcha";

const FormConsulta = () => {

    const [resultado, setResultado] = useState(null);

    const [DatosForm, LeerForm] = useState({ cuil: "" });
    const { cuil } = DatosForm;

    const onChange = (e) => {
        LeerForm({
            ...DatosForm,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (cuil.trim() === "") {
            //setAlerta({ msg: "Todos los campos son obligatorios", class: "danger" });
            return;
        } else {
            consultar(parseInt(cuil));
        }
    };


    const consultar = async (micuil) => {

        const db = firebase.database();
        const ref = db.ref('/');

        //console.log(cuil);
        ref.orderByChild('CUIT').equalTo(micuil).on('child_added', (snapshot) => {
            console.log(snapshot.val());
            setResultado(snapshot.val());
        });

    };


    return (
        <div>
            <img src="header_banco_gente.png" width="100%" />
            <br></br>
            <div className="text-center p-3">
                <b>CONSULTA DE ESTADO SOLICITUD CREDITO LIBRE DISPONIBILIDAD</b>
            </div>
            <form onSubmit={onSubmit} style={{ margin: "50px" }}>
                <label htmlFor="cuil">CUIL: </label>
                <input
                    type="text"
                    name="cuil"
                    className="form-control"
                    id="cuil"
                    placeholder="Ingrese su CUIL"
                    onChange={onChange}
                    value={cuil}
                />
                <br></br>
                <button className="btn btn-primary" type="submit" >
                    consultar
                </button>
                <br></br><br></br>

                <ReCAPTCHA
                    //https://bancodelagente-cba-gov-ar.web.app/
                    sitekey="6LfsQhQcAAAAACwwTgk47g1TVusF8mhGb4eRC_lO"
                    onChange={onChange}
                />
            </form>

            {resultado ?

                <table className="table table-striped row p-3"   >

                    <tbody>
                        <tr>
                            <th scope="row">CUIT</th>
                            <td>{resultado.CUIT}</td>
                        </tr>
                        <tr>
                            <th scope="row">Nombre</th>
                            <td>{resultado.NOMBRES}</td>
                        </tr>
                        <tr>
                            <th scope="row">Apellido</th>
                            <td>{resultado.APELLIDOS}</td>
                        </tr>
                        <tr>
                            <th scope="row">Mensaje</th>
                            <td>{resultado.MENSAJE}</td>
                        </tr>
                    </tbody>

                </table> : null}

        </div>
    );
};

export default FormConsulta;
