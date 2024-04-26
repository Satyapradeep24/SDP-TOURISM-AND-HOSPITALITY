import axios from "axios";
import React, { useState, useEffect } from "react";
import Locations from "../components/Locations";
import Loader from "../components/Loader";
import Error from "../components/Error";

function LocationScreen() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const data = (await axios.get("/api/locations/getlocations")).data;
      setLocations(data);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
    }
  }

  function filterBySearch() {
    if (!searchKey) {
      // If the search key is empty, display all locations
      fetchData();
      return;
    }

    const filteredLocations = locations.filter((location) =>
      location.lname.toLowerCase().includes(searchKey.toLowerCase())
    );
    setLocations(filteredLocations);
  }

  return (
    <div>
      <div className="loc-search">
        <input className="loc-input" type="text" placeholder="search location" value={searchKey}
          onChange={(e) => { setSearchKey(e.target.value); }} onKeyUp={filterBySearch} />
          <i className="fa-solid fa-location-crosshairs"></i>
      </div>


      <div className="grid-container">
        {loading ? (
          <center>
            <Loader />
          </center>
        ) : error ? (
          <Error />
        ) : (
          locations.map((location) => {
            return (
              <div className="item" key={location._id}>
                <Locations locations={location} />
              </div>
            );
          })
        )}

        <div>
        </div>
      </div>
    </div>
  );
}

export default LocationScreen;
