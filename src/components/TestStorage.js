import React, { useState } from "react";
import firebase from "../config/firebase";

const TestStorage = () => {
  const [uploadValue, setUploadValue] = useState(0);
  const [picture, setPicture] = useState();

  const onChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    
    const storageRef = firebase.storage().ref(`pictures/${file.name}`);
    const task = storageRef.put(file);
    
    
    task.on(
      "state_changed",
      (snapshot) => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadValue(percentage);
      },
      (error) => {
        console.error(error.message);
      },
      () => {
        // Upload complete
        console.log(task.snapshot);
        firebase.storage().ref(`pictures/${file.name}`).getDownloadURL().then(function(url) {
            console.log("url",url)
            setPicture(url);

        })
        
      }
    );
  };

  return (
    <div>
      <progress value={uploadValue} max="100">
        {uploadValue} %
      </progress>
      <br />
      <input type="file" onChange={onChange} />
      <br />
      <img width="90" src={picture} alt=""/>
    </div>
  );
};

export default TestStorage;
