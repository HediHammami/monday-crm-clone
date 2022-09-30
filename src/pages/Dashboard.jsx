import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import TicketCard from "../components/TicketCard";
import CategoriesContext from "../context";

const Dashbored = () => {
  const [tickets, setTickets] = useState([]);

  const { categories, setCategories } = useContext(CategoriesContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:5000/tickets");

      const dataObj = response.data.data;

      const arrKeys = Object.keys(dataObj);
      const arrData = Object.keys(dataObj).map((key) => dataObj[key]);
      const formatedArray = [];
      arrKeys.forEach((key, index) => {
        const formatedData = { ...arrData[index] };
        formatedData["documentId"] = key;
        formatedArray.push(formatedData);
      });
      setTickets(formatedArray);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setCategories([...new Set(tickets?.map(({ category }) => category))]);
  }, [setCategories, tickets]);

  const colors = [
    "rgb(255,179,186)",
    "rgb(255,223,186)",
    "rgb(255,255,186)",
    "rgb(186,255,201)",
    "rgb(186,225,255)",
  ];

  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];

  return (
    <div className="dashboard">
      <h1>Dashbored</h1>
      <div className="ticket-container">
        {tickets &&
          uniqueCategories?.map((uniqueCat, categoryIndex) => (
            <div key={categoryIndex}>
              <h3>{uniqueCat}</h3>
              {tickets
                .filter((ticket) => ticket.category === uniqueCat)
                .map((filteredTicket, _index) => (
                  <TicketCard
                    key={_index}
                    id={_index}
                    color={colors[categoryIndex] || colors[0]}
                    ticket={filteredTicket}
                  />
                ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashbored;
