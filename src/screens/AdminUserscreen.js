import React, { useState, useEffect } from "react";
import { Tabs } from 'antd';
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

function AdminUserscreen(){

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await (await axios.get("/api/users/getAllUsers")).data
                setUsers(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(error);
            }
        }
        fetchData();

    }, [])

    return(
        <div className="table-container">

        <h3>Users</h3>
        {loading && (<Loader />)}

        <table className="bs">
            <thead>
                <tr>
                    <th>User Id : </th>
                    <th>Name : </th>
                    <th>Email : </th>
                    <th>Is Admin : </th>
                </tr>
            </thead>
            <tbody>
                {users && (users.map(user=>{
                        return <tr key={user._id}>
                                <td data-label="User Id : ">{user._id}</td>
                                <td data-label="Name : ">{user.name}</td>
                                <td data-label="Email : ">{user.email}</td>
                                <td data-label="Is Admin : ">{user.isAdmin ? "YES" : "NO"}</td>
                            </tr>
                        
                    }))}
            </tbody>
        </table><br />
    </div>
    )
}
export default AdminUserscreen;