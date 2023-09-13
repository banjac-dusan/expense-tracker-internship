import React from "react";
import Buttons from "../components/Buttons";

import { useNavigate } from "react-router-dom";

import ModalForm from "../components/ModalForm";
import DashboardIncomeTable from "../components/DashboardIncomeTable";
import DashboardExpensesTable from "../components/DashboardExpenseTable";
import MoneyBalance from "../components/MonayBalance";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <MoneyBalance />
      <h4>Recent changes</h4>
      <div>
        <h4
          style={{
            marginTop: "2rem",
            backgroundColor: "#42b883",
            color: "#ffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          Incomes
        </h4>
      </div>

      <DashboardIncomeTable />
      <div>
        <h4
          style={{
            marginTop: "3rem",
            backgroundColor: "#fc0303",
            color: "#ffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          Expenses
        </h4>
      </div>
      <DashboardExpensesTable />

      <ModalForm
        style={{
          margin: "2rem 3rem",
        }}
      />
      <Buttons
        label="Expense Chat"
        handleClick={() => navigate("expense-page")}
      />
      <Buttons
        label="Income Chart"
        handleClick={() => navigate("income-page")}
      />
    </>
  );
};

export default Dashboard;
