import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import { UsersContext } from '../App';

const Admin = () => {
  const { users } = useContext(UsersContext);

  return (
    <div className="admin-page-container">
      <Navbar />
      <div className="admin-content">
        <h2>Admin / Owner View</h2>
        <p style={{ color: '#64748b', fontSize: '0.98rem', marginBottom: '1.2rem' }}>
          All registered users and their bookings
        </p>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Profession</th>
                <th>Slots</th>
                <th>Booking Date</th>
                <th>Booking Slot</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr><td colSpan={6} style={{ textAlign: 'center', color: '#64748b' }}>No users registered yet.</td></tr>
              ) : (
                users.map((user, idx) => (
                  <tr key={user.email + idx}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.profession}</td>
                    <td>{user.slots}</td>
                    <td>{user.bookingDate || <span style={{ color: '#dc2626' }}>—</span>}</td>
                    <td>{user.bookingSlot || <span style={{ color: '#dc2626' }}>—</span>}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <style>{`
.admin-page-container {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  box-sizing: border-box;
}
.admin-content {
  background: #fff;
  padding: 2.5rem 2rem;
  border-radius: 18px;
  box-shadow: 0 2px 16px rgba(79,70,229,0.08);
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  justify-content: center;
  margin: 2.5rem auto 0 auto;
}
.admin-table-wrapper {
  width: 100%;
  overflow-x: auto;
}
.admin-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background: #f8fafc;
  border-radius: 12px;
  overflow: hidden;
  font-size: 1rem;
}
.admin-table th, .admin-table td {
  padding: 0.8rem 1rem;
  text-align: left;
  border-bottom: 1px solid #e0e7ff;
}
.admin-table th {
  background: #e0e7ff;
  color: #3730a3;
  font-weight: 700;
}
.admin-table tr:last-child td {
  border-bottom: none;
}
@media (max-width: 900px) {
  .admin-content {
    max-width: 98vw;
    padding: 1.2rem 0.5rem;
  }
  .admin-table th, .admin-table td {
    padding: 0.6rem 0.5rem;
    font-size: 0.97rem;
  }
}
@media (max-width: 600px) {
  .admin-content {
    padding: 1rem 0.2rem;
  }
  .admin-table th, .admin-table td {
    padding: 0.4rem 0.2rem;
    font-size: 0.93rem;
  }
}
`}</style>
      </div>
    </div>
  );
};

export default Admin; 