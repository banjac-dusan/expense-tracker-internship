import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";

const DashboardIncomeTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/incomes?_page=1&_limit=5")
      .then((response) => setData(response.data));
  }, []);

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Amount €</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((value, key) => {
          return (
            <tr key={key}>
              <td>{value.name}</td>
              <td>{value.description}</td>
              <td>{value.amount}</td>
              <td>{value.time}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default DashboardIncomeTable;
