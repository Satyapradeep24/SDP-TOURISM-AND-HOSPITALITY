import axios from "axios";
import React, {  useState, useEffect } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Contacts from "../components/Contacts";


function ContactScreen() {

    const [contacts, setContact] = useState([])
    const [loading, setLoading] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        async function fetchData() {

            try {
                setLoading(true)
                const data = (await axios.get("http://localhost:5000/api/contacts/getcontacts")).data
                setContact(data)
                setLoading(false)
            } catch (error) {
                setError(true)
                console.log(error);
                setLoading(false);

            }

        }
        fetchData();
    }, []);


    <div className="about">
            <h1>Welcome travel booking app</h1>
            <p>👁️‍🗨️How to use this app..? don't worry i can clearly explain..✌️</p>
            <li>first of all you can click Get Start button</li>
            <li>1st you go to register, and then next you click login in your correct email and password.
                because no login in your account you can't booking your travel slot.
                directly you will reach the <b>Error Message!..</b></li>
            <li>successfully login go to home page,and choose your favourty place book now</li>
            <li>next page move to booking your room  select start date to end date then show book now
                button freely food provide veg and non-veg available</li>
            <li>next page go to Demo payment section , click pay button enter demo email id
                <b> Next card no: 4242 4242 4242 4242 </b>
                using this demo card number,and select expiry date and CVC password just click any 3 numbers</li>
            <li>next page move to your Profile and Bookings Room</li>
            <h3>How to Access Admin page..?</h3>
            <li>New places, rooms, foods, added screen. 1st logout your Account,
                next login this email:<b>mano@gamil.com</b> and password:<b>111</b>because this email and password only access to admin  go to link top /admin Example:<b>http://localhost:3000/admin</b></li>
                
                <br/><br/>
        </div>

    return (
        <div className="cont-app">
            {loading ? (<center><Loader /></center>) : error ? (<Error />) : (contacts.map(contact => {
                return (
                    <div className="itemss" key={contact._id}>
                        <Contacts contacts={contact} />
                    </div>
                );
            }))}
        </div>

    )
}
export default ContactScreen;