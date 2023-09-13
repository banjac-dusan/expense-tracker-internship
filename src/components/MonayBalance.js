import React, { useState, useEffect } from "react";
import axios from "axios";

const MoneyBalance = () => {
  const [dataExpense, setDataExpense] = useState([]);
  const [dataIncome, setDataIncome] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get("http://localhost:3000/expenses")
        .then((response) => setDataExpense(response.data));

      await axios
        .get("http://localhost:3000/incomes")
        .then((response) => setDataIncome(response.data));
    }

    fetchData();
  }, []);

  const expenseAmounts = dataExpense.map((data) => data.amount);
  const incomeAmounts = dataIncome.map((data) => data.amount);

  const totalExpenseAmount = expenseAmounts.reduce(
    (total, amount) => total + parseInt(amount),
    0
  );
  console.log(expenseAmounts, incomeAmounts);
  console.log(totalExpenseAmount);

  const totalIncomeAmount = incomeAmounts.reduce(
    (total, amount) => total + parseInt(amount),
    0
  );

  console.log(totalIncomeAmount);

  const totalBalance = totalIncomeAmount - totalExpenseAmount;

  return (
    <h1
      style={{
        marginTop: "1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Current Balance {totalBalance} {"€"}
    </h1>
  );
};

export default MoneyBalance;
