import React, { useState, useEffect } from "react";
import { Tabs } from 'antd';
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

function AdminRooms(){
    const [rooms, setRooms] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await (await axios.get("/api/places/getallplaces")).data
                setRooms(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(error);
            }
        }
        fetchData();

    }, [])

    return (
        <div className="table-container">


            <h3>Rooms</h3>

            {loading && (<Loader />)}

            <table className="bs">
                <thead>
                    <tr>
                        <th>Room Id : </th>
                        <th>Name : </th>
                        <th>Type : </th>
                        <th>Rent per day : </th>
                        <th>Max count : </th>
                        <th>Phone number : </th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.length > 0 &&
                        rooms.map((room) => {
                            return (
                                <tr key={room._id}>
                                    <td data-label="Room Id : ">{room._id}</td>
                                    <td data-label="Name : ">{room.name}</td>
                                    <td data-label="Type : ">{room.type}</td>
                                    <td data-label="Rent per day : ">{room.rentperday}</td>
                                    <td data-label="Max count : ">{room.maxcount}</td>
                                    <td data-label="Phone number : ">{room.phonenumber}</td>
                                </tr>
                            )
                        })}
                </tbody>
            </table><br />
        </div>
    )
}
export default AdminRooms;