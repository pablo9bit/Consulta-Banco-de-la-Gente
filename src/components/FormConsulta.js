import { useState, createRef, useEffect } from "react";
import firebase from "../config/firebase";
import ReCAPTCHA from "react-google-recaptcha";
import useAlerta from "../hooks/useAlerta";

const FormConsulta = () => {
  const [resultado, setResultado] = useState({ data: null, consultado: false });
  const [setAlerta, MostrarAlerta] = useAlerta(null);
  const [loadingLocal, setLoadingLocal] = useState(null);

  const [DatosForm, LeerForm] = useState({ cuil: "" });
  const { cuil } = DatosForm;

  const recaptchaRef = createRef();

  useEffect(() => {
    const alertar = () => {
      if (resultado.data === null && resultado.consultado && !loadingLocal) {
        setAlerta({
          msg: "No se encontraron resultados.",
          class: "danger",
        });
      }
    };

    alertar();
  }, [resultado, loadingLocal]);

  const onChange = (e) => {
    LeerForm({
      ...DatosForm,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setAlerta(null);
    setResultado({ data: null, consultado: false });

    const recaptchaValue = recaptchaRef.current.getValue();
    //console.log(recaptchaValue);

    if (recaptchaValue) {
      if (cuil.trim().length !== 11) {
        setAlerta({
          msg: "Debe ingresar su Número de CUIL sin guiones",
          class: "danger",
        });
      } else {
        consultar(parseInt(cuil));
      }
    } else {
      setAlerta({
        msg: "Debe validar reCAPTCHA",
        class: "danger",
      });
      //return;
    }
  };

  const consultar = async (micuil) => {
    setLoadingLocal(true);
    const miculnum = parseInt(micuil);
    const db = firebase.database();
    const ref = db.ref("/");

    //console.log(cuil);
    ref
      .orderByChild("CUIT")
      .equalTo(miculnum)
      .on(
        "value",
        (snapshot) => {
          console.log("salida", snapshot.val());

          let data = null;
          if (snapshot.val()) {
            data = snapshot.val()[1];
          }

          setResultado({ data, consultado: true });
          setLoadingLocal(false);
        },
        (errorObject) => {
          console.log("The read failed: " + errorObject.name);
        }
      );
  };

  return (
    <div>
      <img src="header_banco_gente.png" width="100%" alt="bancodelagente" />
      <br></br>
      <div className="text-center p-1">
        <b>CONSULTA DE ESTADO SOLICITUD CREDITO LIBRE DISPONIBILIDAD</b>
      </div>
      <form onSubmit={onSubmit} style={{ margin: "30px" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input style={{ width: "400px" }}

            type="text"
            name="cuil"
            className="form-control"
            id="cuil"
            placeholder="Ingrese su CUIL (Sin Guiones)"
            onChange={onChange}
            value={cuil}
          />
        </div>
        <br></br>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="btn btn-primary" type="submit">
            consultar
          </button>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          {loadingLocal ? <div className="m-2"><b>Buscando...</b></div> : ""}
        </div>
        <br></br>
        <div style={{ display: "flex", justifyContent: "center" }}>

          <ReCAPTCHA
            //https://bancodelagente-cba-gov-ar.web.app/
            //sitekey="6LfsQhQcAAAAACwwTgk47g1TVusF8mhGb4eRC_lO"
            sitekey="6LeH_HUbAAAAAApK164OIBLZOX0uOaZWiXYRZjw_"
            ref={recaptchaRef}
            onChange={onChange}
          />
        </div>
      </form>
      <MostrarAlerta />

      {resultado.data ? (
        <table className="table table-striped row p-3">
          <tbody>
            <tr>
              <th scope="row">CUIT</th>
              <td>{resultado.data.CUIT}</td>
            </tr>
            <tr>
              <th scope="row">Nombre</th>
              <td>{resultado.data.NOMBRES}</td>
            </tr>
            <tr>
              <th scope="row">Apellido</th>
              <td>{resultado.data.APELLIDOS}</td>
            </tr>
            <tr>
              <th scope="row">Mensaje</th>
              <td>{resultado.data.MENSAJE}</td>
            </tr>
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default FormConsulta;
