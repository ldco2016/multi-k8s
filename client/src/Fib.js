import React, { useState, useEffect } from "react";
import axios from "axios";

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, []);

  const fetchValues = async () => {
    const values = await axios.get("/api/values/current");
    setValues(values.data);
  };

  const fetchIndexes = async () => {
    const seenIndexes = await axios.get("/api/values/all");
    setSeenIndexes(seenIndexes.data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post("/api/values", {
      index: this.state.index,
    });
    setIndex("");
  };

  const renderValues = () => {
    const entries = [];
    // key represents index of Fib numbers
    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {this.state.values[key]}
        </div>
      );
    }

    return entries;
  };

  return (
    <div>
      <form onSubmit={this.handleSubmit}>
        <label>Enter Your Index:</label>

        <input
          value={this.state.index}
          onChange={(event) => this.setState({ index: event.target.value })}
        />
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {this.renderSeenIndexes()}

      <h3>Calculated Values:</h3>
      {this.renderValues()}
    </div>
  );
};

export default Fib;
