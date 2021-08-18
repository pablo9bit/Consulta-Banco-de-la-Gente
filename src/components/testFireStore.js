import firebase from "../config/firebase";

const TestFireStore = () => {
 
  const guardar = () => {
    const db = firebase.firestore();
    db.settings({ timestampsInSnapshots: true });

    db.collection("users").add({
      fullname: "pablo8",
      email: "pablo.pellegrinet@gmail.com",
    });
  };

  const actualizar = async () => {
    const db = firebase.firestore();
    db.settings({ timestampsInSnapshots: true });

    const cityRef = db.collection("users").doc("5LVesWQcUg7BffgrbAEv");

    const res = await cityRef.update({ fullname: "clara" });
  };

  const borrar = async () => {
    const db = firebase.firestore();
    db.settings({ timestampsInSnapshots: true });

    const res = await db.collection('users').doc('hIcM6wu8DUcR4Pah99ZP').delete();

  };
  
  return (
    <div>
      <button
        onClick={() => {
          guardar();
        }}
      >
        Guardar
      </button>
      <button
        onClick={() => {
          actualizar();
        }}
      >
        actualizar
      </button>
      <button
        onClick={() => {
          borrar();
        }}
      >
        borrar
      </button>
    </div>
  );
};

export default TestFireStore;
