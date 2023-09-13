import React from "react";
import TableData from "../components/TableData";
import useDataFetching from "../components/useDataFetching";


const ExpensePage = () => {
  // const {data, loading, error} = useDataFetching({url: 'expenses'})
  // console.log(data);
    return (
    <TableData url="expenses"/>
    )
  }

  

export default ExpensePage;