import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showData, setShowData] = useState([]);
  const [searchData, setSearchData] = useState("");

  // search input-
  const handleSearch = () => {
    const filteredItem = users.filter((item) => {
      if (
        item.fullName.toLowerCase() === searchData.toLowerCase() ||
        item.fullName.includes(searchData)
      ) {
        return (
          item.fullName.toLowerCase() === searchData.toLowerCase() ||
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

    setShowData(filteredItem);
    console.log(filteredItem, searchData);
    setSearchData("");
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
      if (value === "26 to 30") {
        return item.age > 26 && item.age < 30;
      }
      if (value === "30 to 40") {
        return item.age > 26 && item.age < 30;
      }
      if (value === "40 to 100") {
        return item.age > 46 && item.age < 100;
      }
    });
    setShowData(filteredItem);
  };

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => {
        setShowData(data);
        setUsers(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
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
              onBlur={handleSearch}
              className="py-2 px-4 border border-left-0"
            >
              Search
            </button>
          </label>
        </div>
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
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {showData?.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.fullName}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.age}</td>
              <td>{item.role}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Users;
