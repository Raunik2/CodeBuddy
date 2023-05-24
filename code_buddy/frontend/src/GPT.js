import React from "react";
import { useState } from "react";
import axios from "axios";
import form from "react-bootstrap/form";
import button from "react-bootstrap/button";
import "./App.css";
const GPT = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Please give the code");
      return;
    }
    setLoading(true);
    let inp = "";

    if (endpoint === "COMMENT")
      inp =
        "I am providing you a code, check it and return the same code with proper logical comments :\n" +
        input;
    else if (endpoint === "DEBUG")
      inp = "Explain everything about this code:\n" + input;

    axios
      .post("http://localhost:4000/gpt", { prompt: inp })
      .then((resp) => {
        setOutput(resp.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2 className="h1">Code Buddy</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="form-control"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            width: "1200px",
            height: "500px",
            border: "1px solid black",
            backgroundColor: "",
            // color:'aqua'
          }}
        />

        <div>
          <select
            className="form-select"
            onChange={(e) => setEndpoint(e.target.value)}
          >
            <option value="COMMENT">Comment</option>
            <option value="DEBUG">Explain</option>
          </select>
        </div>

        <button className="btn btn btn-info" type="submit">
          Process
        </button>

        <div className="output_div">
          
             {loading ? "loading..." : output}
             
        </div>

      </form>
    </div>
  );
};

export default GPT;
