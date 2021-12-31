import { map } from "@firebase/util";
import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [serchData, setSearchData] = useState("");

  const handleSearch = () => {};

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Container>
      <div className="mt-5 mb-2">
        <label className="d-flex">
          <input
            className="w-50 py-2"
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S/L</th>
            <th>First Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.fullName}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.role}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Users;
