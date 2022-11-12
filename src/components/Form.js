import React, { useState } from "react";
import Axios from "axios";

function Form() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [position, setPosition] = useState("");
  const [team, setTeam] = useState([]);

  const saveToDb = () => {
    Axios.post("http://localhost:3001/insert", {
      name: name,
      age: age,
      position: position,
    });
  };

  const displayDb = () => {
    Axios.get("http://localhost:3001/display").then((response) =>
      setTeam(response.data)
    );
  };

  const clearDb = () => {
    Axios.delete("http://localhost:3001/clear").then((response) =>
      setTeam(response.data)
    );
    displayDb();
  };

  return (
    <div className="container">
      <div className="formContainer">
        <h1>Create your starting 11</h1>
        <div className="pair">
          <label>Player's name:</label>
          <input
            type="text"
            placeholder="Enter name"
            className="formInput"
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
        </div>
        <div className="pair">
          <label>Player's age:</label>
          <input
            type="number"
            placeholder="Enter age"
            className="formInput"
            onChange={(e) => {
              setAge(e.target.value);
            }}
          ></input>
        </div>
        <div className="pair">
          <label>Player's position:</label>
          <input
            type="text"
            placeholder="Enter position"
            className="formInput"
            onChange={(e) => {
              setPosition(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <button onClick={saveToDb}>Save to Database</button>
          <button onClick={displayDb}>Display Team</button>
          <button onClick={clearDb}>Clear</button>
        </div>
      </div>
      <div className="team">
        {team.map((player, index) => {
          return (
            <p key={index}>
              {index + 1}. {player.name}, {player.age}, {player.position}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default Form;
