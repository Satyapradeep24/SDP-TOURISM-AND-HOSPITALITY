import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tabs } from 'antd';
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from "sweetalert2";
import { Tag } from 'antd';
const { TabPane } = Tabs;

function ProfileScreen() {

    const user = JSON.parse(localStorage.getItem("currentUser"));

    useEffect(() => {

        if (!user) {
            window.location.href = "/login"
        }

    }, [])

    return (
        <div>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Profile" key="1">
                    <div style={{ marginLeft: "20px" }}>
                        <h3 style={{ textAlign: "left" }}>My Profile</h3>
                        <br />
                        <p className="profi-p"><b>Name :</b>  {user.name}</p>
                        <p className="profi-p"><b>Email : </b> {user.email}</p>
                        <p className="profi-p"><b>isAdmin : </b> {user.isAdmin ? "YES" : "NO"}</p>
                    </div>

                </TabPane>
                <TabPane tab="Bookings" key="2">
                    <MyBookings />
                </TabPane>
            </Tabs>

        </div>
    )
}
export default ProfileScreen;

export function MyBookings() {

    const user = JSON.parse(localStorage.getItem("currentUser"));
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchData() {

            try {
                setLoading(true)
                const data = await (await axios.post('/api/bookings/getBookingsByUserId', { userid: user._id })).data
                console.log(data);
                setBookings(data);
                setLoading(false);

            } catch (error) {
                setLoading(false);
                setError(true);
                console.log(error);
            }

        }
        fetchData();
    }, [])

    async function cancelBooking(bookingid, placesid) {

        try {
            setLoading(true);
            const result = await (await axios.post("/api/bookings/cancelBooking", { bookingid, placesid })).data
            console.log(result);
            setLoading(false);
            Swal.fire("Congrats", "Successfully Your Cancelled the Room", "success").then(result => {
                window.location.reload()
            });
        } catch (error) {
            console.log(error);
            setLoading(false);
            Swal.fire("Oops", "Something went wrong", "error");
        }

    }

    return (
        <div>
            <div className="">
                <div className="">
                    {loading && (<Loader />)}
                    {bookings.map(booking => (
                        <div className="pro-bs" key={booking._id}>
                            <h3 style={{ textAlign: "left" }}>{booking.places}</h3>
                            <p className="profi-p"><b>Booking Id  :</b> {booking._id}</p>
                            <p className="profi-p"><b>Check In :</b> {booking.fromDate}</p>
                            <p className="profi-p"><b>Check Out :</b> {booking.toDate}</p>
                            <p className="profi-p"><b>Amount :</b> {booking.totalAmount}</p>
                            <p className="profi-p"><b>Status :</b>{" "} {booking.status == "cancelled" ? (<Tag color="red">CANCELLED</Tag>) : (<Tag color="green">CONFIRMED</Tag>)} </p>

                            {booking.status !== "cancelled" && (<div style={{ textAlign: "right" }}>
                                <button className="pay" onClick={() => { cancelBooking(booking._id, booking.placesid) }} >CANCEL BOOKING</button>
                            </div>)}

                        </div>
                    ))}<br/>

                </div>
            </div>
        </div>
    )
}
