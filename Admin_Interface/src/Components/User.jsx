import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import Cookies from 'js-cookie';

export default function User() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [serverError, setServerError] = useState('');
  const tableRef = useRef();

  // Fetch users from the database on component mount
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('http://localhost:6868/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${Cookies.get('token')}`,
          }
        });
        const data = await response.json();

        if (!response.ok) {
          setServerError(data.message + ' (' + data.errorCode + ')');
        } else {
          setUsers(await data.data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    fetchUsers();
  }, []);

  // GSAP animation for rows
  useEffect(() => {
    gsap.fromTo(
      tableRef.current.querySelectorAll('tr'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }
    );
  }, [users]);

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:6868/user/${editingUser.id}`, {
        method: 'PATCH', // Update user in the database
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${Cookies.get('token')}`,
        },
        body: JSON.stringify({
          role: editingUser.role,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setServerError(data.message + ' (' + data.errorCode + ')');
      }

      setUsers((prev) =>
        prev.map((u) => (u.id === editingUser.id ? editingUser : u))
      );
      setEditingUser(null);
    } catch (error) {
      console.error('Error saving user:', error);
      setServerError(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:6868/user/${id}`, {
        method: 'DELETE', // Delete user in the database
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${Cookies.get('token')}`,
        }
      });
      const data = await response.json();

      if (!response.ok) {
        setServerError(data.message + ' (' + data.errorCode + ')');
      }

      gsap.to(tableRef.current.querySelector(`tr[data-id="${id}"]`), {
        opacity: 0,
        y: -20,
        duration: 0.3,
        onComplete: () => {
          setUsers((prev) => prev.filter((user) => user.id !== id));
        },
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      setServerError(error.message);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center overflow-x-hidden p-4">
      <table className="w-full" ref={tableRef}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="text-center">
          {users.map((user) => (
            <tr key={user.id} data-id={user.id}>
              <td>
                {user.name}
              </td>
              <td>
                {user.email}
              </td>
              <td>
                {editingUser?.id === user.id ? (
                  <select
                    value={editingUser.role}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, role: e.target.value })
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option value="ADMIN">Admin</option>
                    <option value="CUSTOMER">Customer</option>
                    <option value="EMPLOYEE">Employee</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>
              <td>
                {editingUser?.id === user.id ? (
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold h-[31px] w-[60px] rounded-full"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold mr-4 h-[31px] w-[60px] rounded-full"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold h-[31px] w-[60px] rounded-full"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {
        serverError && (
          <div className='w-full h-[100px] flex items-center  text-center'>
            <div className='w-[80%] ml-[70px] text-red-500'>
              {serverError}
            </div>
          </div>
        )
      }
    </div>
  );
}
