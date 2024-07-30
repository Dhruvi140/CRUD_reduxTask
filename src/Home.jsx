import React,{useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUser } from './UserReducer';

function Home() {
    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);


    const handleDelete = (id) => {
        setUserIdToDelete(id);
        setShowModal(true);
    };

    const confirmDelete = () => {
        dispatch(deleteUser({ id: userIdToDelete }));
        setShowModal(false);
    };

    const cancelDelete = () => {
        setShowModal(false);
        setUserIdToDelete(null);
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>User Management</h2>
                <Link to="/create" className="btn btn-success">Create +</Link>
            </div>
            <div className="card shadow">
            <div className="card-body">
            <table className="table table-striped table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <Link to={`/edit/${user.id}`} className="btn btn-success btn-sm mr-2 m-2">Edit</Link>
                                <button onClick={() => handleDelete(user.id)} className="btn btn-danger btn-sm">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            </div>
            {showModal && (
                <div className="modal show" style={{ display: 'block' }} role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Delete Confirmation</h5>
                                
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this user?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={cancelDelete}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
