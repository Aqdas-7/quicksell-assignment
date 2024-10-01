import React from "react";
import { useState, useEffect } from "react";
import "./Dashboard.css";
import List from "../List/List";
import {
  FiMoreHorizontal,
  FiPlus,
  FiInfo,
  FiUser,
  FiAlertCircle,
} from "react-icons/fi";

function Dashboard({
  statuses,
  priorities,
  priorityScores,
  grouping,
  ordering,
}) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({ tickets: [], users: [] });
  const [ticketMap, setTicketMap] = useState([]);

  useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((response) => {
        setData(response);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Sorting functions
  const cmpTitle = (a, b) => a.title.localeCompare(b.title);
  const cmpPriority = (a, b) => b.priority - a.priority;

  // Mapping functions
  const mapTickets = (groupBy, orderBy) => {
    let obj = [];
    if (groupBy === "Status") {
      statuses.forEach((status) => {
        let tmp = data.tickets.filter((ticket) => ticket.status === status);
        tmp.sort(orderBy === "Title" ? cmpTitle : cmpPriority);
        obj.push(tmp);
      });
    } else if (groupBy === "User") {
      data.users.forEach((user) => {
        let tmp = data.tickets.filter((ticket) => user.id === ticket.userId);
        tmp.sort(orderBy === "Title" ? cmpTitle : cmpPriority);
        obj.push(tmp);
      });
    } else if (groupBy === "Priority") {
      priorityScores.forEach((priority) => {
        let tmp = data.tickets.filter((ticket) => priority === ticket.priority);
        tmp.sort(orderBy === "Title" ? cmpTitle : cmpPriority);
        obj.push(tmp);
      });
    }
    setTicketMap(obj);
  };

  useEffect(() => {
    mapTickets(grouping, ordering);
  }, [grouping, ordering, data]);

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  return (
    <div className="dashboard-main">
      {ticketMap.map((ticketList, key) => (
        <div className="dashboard-list" key={key}>
          <div className="dashboard-list-header-controls">
            <div className="dashboard-list-header-controls-info">
              {grouping === "Status" ? (
                <>
                  <FiInfo color="secondary" />
                  <b>
                    <p className="dashboard-list-header">{statuses[key]}</p>
                  </b>
                </>
              ) : grouping === "User" ? (
                <>
                  <FiUser style={{ color: "#9d9df4" }} />
                  <b>
                    <p className="dashboard-list-header">
                      {data.users[key].name}
                    </p>
                  </b>
                </>
              ) : (
                <>
                  <FiAlertCircle style={{ fontSize: "20px" }} />
                  <b>
                    <p className="dashboard-list-header">{priorities[key]}</p>
                  </b>
                </>
              )}
              <div className="dashboard-list-items-count">
                {ticketList.length}
              </div>
            </div>
            {ticketList.length !== 0 && (
              <div className="dashboard-icons">
                <FiPlus style={{ color: "#808080" }} />
                <FiMoreHorizontal
                  style={{ color: "#808080", marginLeft: "5px" }}
                />
              </div>
            )}
          </div>
          <List ticketList={ticketList} />
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
