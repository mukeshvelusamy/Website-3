import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Main() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    axios
      .get("https://602e7c2c4410730017c50b9d.mockapi.io/users")
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError("Error occurred " + error);
        setIsLoading(false);
      });
  }, []);

  const handleRowClick = (userId) => {
    setSelectedUserId(userId);
  };

  const selectedUser = data.find((item) => item.id === selectedUserId);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12 col-md-6 col-lg-6'>
          <h1 className='text-center d-block bg-info border-1' style={{ padding: "10px" }}>User List</h1>
          {isLoading ? (
            <p>Loading data...</p>
          ) : isError ? (
            <p>Error Occurred: {isError}</p>
          ) : (
            <div className='table-responsive'>
              <table className='table table-bordered table-hover table-condensed'>
                <thead>
                  <tr>
                    <th className='text-center align-middle'>Image</th>
                    <th className='text-center align-middle'>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((item) => (
                    <tr key={item.id} onClick={() => handleRowClick(item.id)} style={{ cursor: 'pointer' }}>
                      <td scope='row align-center'><img src={item.avatar} alt='avatar' className='mx-auto' style={{ width: "50px", height: "50px" }} /></td>
                      <td className='text-center' style={{ verticalAlign: 'middle' }}>{item.profile.username}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            
              <div className="pagination">
                <button
                  className="page-button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  {"<-"}
                </button>
                {Array(Math.ceil(data.length / itemsPerPage))
                  .fill(0)
                  .map((_, index) => (
                    <button
                      key={index}
                      className={`page-button ${currentPage === index + 1 ? "active" : ""}`}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                <button
                  className="page-button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
                >
                  {"->"}
                </button>
              </div>
            </div>
          )}
        </div>
        <div className='col-12 col-md-6 col-lg-6' style={{ height: "100vh" }}>
          <h1 className='text-center d-block bg-info border-1' style={{ padding: "10px" }}>User Details</h1>
          <div className='mx-auto card shadow-lg ' style={{ border: "1px solid black", padding: "10px" }}>
            {selectedUser ? (
              <div key={selectedUser.id} className=''>
                <img src={selectedUser.avatar} alt='avatar' />
                <h3>@{selectedUser.profile.username}</h3>
                <h6>{selectedUser.Bio}</h6>
                <table className="table table-bordered">
                  <thead></thead>
                  <tbody>
                    <tr>
                      <th>Job Title</th>
                      <td>{selectedUser.jobTitle}</td>
                    </tr>
                    <tr>
                      <th>Id</th>
                      <td>{selectedUser.id}</td>
                    </tr>
                    <tr>
                      <th>Name:</th>
                      <td>{selectedUser.profile.firstName}{' '} {selectedUser.profile.lastName}</td>
                    </tr>
                    <tr>
                      <th>Email:</th>
                      <td> {selectedUser.profile.email}</td>
                    </tr>
                    <tr>
                      <th>CreatedAt</th>
                      <td>{selectedUser.createdAt}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              isLoading ? null : <p>No data Selected</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
