import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function User() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Smith', email: 'bob@example.com', role: 'Pornstar' },
  ]);

  const [editingUser, setEditingUser] = useState(null);
  const tableRef = useRef();

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

  const handleSave = () => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === editingUser.id ? editingUser : u
      )
    );
    setEditingUser(null);
  };

  const handleDelete = (id) => {
    gsap.to(tableRef.current.querySelector(`tr[data-id="${id}"]`), {
      opacity: 0,
      y: -20,
      duration: 0.3,
      onComplete: () => {
        setUsers((prev) => prev.filter((user) => user.id !== id));
      },
    });
  };

  return (
    <div className="w-full h-full flex flex-col items-center  overflow-x-hidden p-4">
      <table className="w-full " ref={tableRef}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {users.map((user) => (
            <tr key={user.id} data-id={user.id}>
              <td>
                {editingUser?.id === user.id ? (
                  <input
                    type="text"
                    value={editingUser.name}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, name: e.target.value })
                    }
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editingUser?.id === user.id ? (
                  <input
                    type="email"
                    value={editingUser.email}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, email: e.target.value })
                    }
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  user.email
                )}
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
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                    <option value="Employee">Employee</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>
              <td>
                {editingUser?.id === user.id ? (
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold  h-[31px] w-[60px] rounded-full"
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
    </div>
  );
}
