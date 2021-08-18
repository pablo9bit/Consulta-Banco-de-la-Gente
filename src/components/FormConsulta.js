import { useState } from "react";
import firebase from "../config/firebase";

const FormConsulta = () => {

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
            consultar();
        }
    };


    const consultar = async () => {
        const db = firebase.firestore();
        db.settings({ timestampsInSnapshots: true });

        const baseref = db.collection("base");
        const resultado = await baseref.where('cuit', '==', cuil).get();
        resultado.forEach(doc => {
            console.log(doc.data());
        });

    };


    return (
        <div>
            <img src="header_banco_gente.png" width="100%" />
            <br></br>
            CONSULTA DE ESTADO SOLICITUD CREDITO LIBRE DISPONIBILIDAD
            <form onSubmit={onSubmit} style={{ margin: "10px" }}>
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
                <button type="submit" >
                    consultar
                </button>
            </form>
        </div>
    );
};

export default FormConsulta;
