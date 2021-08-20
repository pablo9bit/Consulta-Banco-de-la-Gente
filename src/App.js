/* import TestFireStore from "./components/TestFireStore";
import TestStorage from "./components/TestStorage"; */
import firebase from "./config/firebase";

import { FirebaseDatabaseProvider, FirebaseDatabaseNode } from '@react-firebase/database'

import FormConsulta from "./components/FormConsulta";


function App() {
  return (
/*     <FirebaseDatabaseProvider firebase={firebase}>
 */
      <div className="App">
        <FormConsulta />
        <br></br>
        <br></br>
     {/*    <FirebaseDatabaseNode path="/" orderByValue="CUIT" limitToFirst={3}>
          {d =>  {
            return <pre>{JSON.stringify(d, null, 2)}</pre>;
          }}
        </FirebaseDatabaseNode> */}

      </div>

  );
}

export default App;
