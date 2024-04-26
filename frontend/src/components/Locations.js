import React from "react";
import { Link } from 'react-router-dom';

function Locations({ locations }) {


    return (
        // <div className="location">
        //     <div className="box-shadow-loc">
        //         <img src={locations.limageurls[0]} alt='img.jpg' className="img" />
        //         <div>
        //             <h1 id="lname">{locations.lname}</h1>
        //             {" "}
        //             <p className="text">Reviews : {locations.lreviews}</p>
        //             <p className="text">Phone Number : {locations.lphonenumber}</p>
        //             <p className="text">Located In : {locations.llocated}</p>

        // <Link to={`/rooms/${locations.lname}`}>
        //     <div className="loc-btn">
        //         <button className="view">Book Now</button>
        //     </div>
        // </Link>
        //         </div>
        //     </div>
        // </div>
        <div className="">
            <div className="grid-item">
                <img src={locations.limageurls[0]} alt='img.jpg'  />

                <div className="overlay">
                    <h2>{locations.lname}</h2>
                    <p>Reviews : {locations.lreviews}</p>
                    <p className="text">Phone Number : {locations.lphonenumber}</p>
                    <p className="text">Located In : {locations.llocated}</p>
                    <Link to={`/rooms/${locations.lname}`}>
                        <div className="loc-btn">
                            <button className="view">Book Now</button>
                        </div>
                    </Link>
                </div>
            </div>

        </div>
    )
}
export default Locations;