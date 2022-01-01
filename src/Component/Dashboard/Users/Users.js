import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Container, Spinner, Table } from "react-bootstrap";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showData, setShowData] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [loading, setIsLoading] = useState(false);

  // search input-
  const handleSearch = () => {
    const filteredItem = users.filter((item) => {
      const name = item.fullName.toLowerCase();
      if (
        name === searchData.toLowerCase() ||
        item.fullName.includes(searchData)
      ) {
        return (
          name === searchData.toLowerCase() ||
          item.fullName.includes(searchData)
        );
      }
      if (item.email === searchData) {
        return item.email === searchData;
      }
      if (item.phone === searchData || item.phone.includes(searchData)) {
        return item.phone === searchData || item.phone.includes(searchData);
      }
    });
    setSearchData("");
    setShowData(filteredItem);
  };

  // filter by age-
  const handleSelect = (e) => {
    const value = e.target.value;
    const filteredItem = users.filter((item) => {
      if (value === "") {
        return item;
      }
      if (value === "18 to 25") {
        return item.age > 18 && item.age < 25;
      }
      if (value === "25 to 30") {
        return item.age > 25 && item.age < 30;
      }
      if (value === "30 to 40") {
        return item.age > 30 && item.age < 45;
      }
      if (value === "40 to 100") {
        return item.age > 45 && item.age < 100;
      }
    });
    setShowData(filteredItem);
  };

  useEffect(() => {
    fetch("https://pacific-beach-91181.herokuapp.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setShowData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleBlock = (event, status) => {
    const email =
      event.target.parentNode.parentNode.parentNode.parentNode.children[2]
        .innerText;
    if (!email) {
      return;
    }
    const data = { email, status };
    const confirmation = window.confirm(
      "Are you sure want to block this user?"
    );
    if (confirmation) {
      setIsLoading(true);
      fetch("https://pacific-beach-91181.herokuapp.com/users", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.acknowledged) {
            setIsLoading(false);
            if (status === "block") {
              alert("User successfully blocked");
            } else {
              alert("user successfully unbloked");
            }
          }
        })
        .catch((error) => console.log(error));
    } else {
      return;
    }
  };

  return (
    <section style={{ minHeight: "80vh" }} className="mx-2 mb-5">
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <div className="mt-5 mb-2">
            <label className="d-flex">
              <input
                className="py-2"
                style={{ width: "260px" }}
                onBlur={(e) => setSearchData(e.target.value)}
                type="text"
                placeholder="Search here"
              />
              <button
                onClick={handleSearch}
                className="py-2 px-4 border border-left-0"
              >
                Search
              </button>
            </label>
          </div>
          {loading && <Spinner animation="border" />}
          <div className="mt-5">
            <label className="me-3 fw-bold text-uppercase">Filter by age</label>
            <select className="py-1 px-4" onChange={handleSelect}>
              <option value="" placeholder="Select age">
                Select age
              </option>
              <option value="18 to 25">18 to 25</option>
              <option value="25 to 30">25 to 30</option>
              <option value="30 to 40">30 to 40</option>
              <option value="40 to 100">40 to 100</option>
            </select>
          </div>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>S/L</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Age</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {showData.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.fullName}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.age}</td>
                <td>{item.role}</td>
                <td className="text-center">
                  {item?.status === "blocked" ? (
                    <button
                      className="m-0 p-0 border-0 text-danger"
                      title="Unblock this user"
                    >
                      <FontAwesomeIcon
                        onClick={(e) => handleBlock(e, "unblock")}
                        icon={faUnlock}
                      />
                    </button>
                  ) : (
                    <button
                      className="m-0 p-0 border-0"
                      title="Block this user"
                    >
                      <FontAwesomeIcon
                        onClick={(e) => handleBlock(e, "block")}
                        icon={faLock}
                      />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </section>
  );
};

export default Users;
