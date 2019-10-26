import React, { useState, useEffect } from "react";
import api from "../../services/api";

export default function Home() {
  const [data, setData] = useState([{}]);
  const [averageNational, setAverageNational] = useState(0);
  let position = 1;

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const result = await api.get("/report");
      setData(result.data.regionals);
      setAverageNational(result.data.national);
      console.log(result.data.regionals);
    } catch (error) {
      console.log(error);
    }
  }

  function showData() {
    console.log(averageNational);
  }

  return (
    <div className="container text-center">
      <h1 style={{ fontSize: 50 }}>
        <strong>Relatório</strong>
      </h1>
      <table className="table">
        <thead>
          <th scope="col">#</th>
          <th scope="col">Regional</th>
          <th scope="col">Média</th>
        </thead>
        <tbody>
          {data.map(item => (
            <tr>
              <th scope="row">{position++}</th>
              <td>{item.description}</td>
              <td>{parseFloat(item.average).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="row">
        <div className="col-md-4">
          <h1>Média Nacional</h1>
        </div>
        <div className="col-md-1">
          <div style={{ backgroundColor: "#000", width: 10, height: 50 }}></div>
        </div>
        <div className="">
          <h1>{averageNational.toFixed(2)}</h1>
        </div>
      </div>
    </div>
  );
}
