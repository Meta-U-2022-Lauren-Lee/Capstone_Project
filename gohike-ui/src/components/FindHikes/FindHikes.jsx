/**
 * @fileoverview This file implements the Find Hikes page component so that
 * users can find hikes near them. It uses the Google Maps API to render a map
 * with markers at hike locations.
 */
import * as React from "react";
import "./FindHikes.css";
import SideBar from "./SideBar";
import axios from "axios";
import GoogleMapReact from "google-map-react";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";

/**
 * Renders SideBar and GoogleMaps component
 *
 * @param {boolean} transparent State var holding state of Navbar background
 * @param {function} setTransparent Sets the boolean in transparent
 * @param {{username: string, sessionToken: string, firstName: string,
 * lastName: string}} currUser Holds info on current user from local storage
 * @returns Find Hikes component
 */
export default function FindHikes({ transparent, setTransparent, currUser }) {
  const params = useParams();
  /**
   * Holds id of hike if clicked on from the Feed page
   * @type {number}
   */
  const id = params.id;
  /**
   * State var that holds info of a hike selected in the sidebar
   * @param {hike}
   */
  const [selectedHike, setSelectedHike] = React.useState(null);
  /**
   * State var that holds coordinates of center of GoogleMap component
   * @type {{lat: number, lng: number}}
   */
  const [center, setCenter] = React.useState({
    lat: 37.4816056542292,
    lng: -122.17105672877193,
  });
  /**
   * State var that holds value of zoom for GoogleMap component
   * @type {number}
   */
  const [zoom, setZoom] = React.useState(11);
  /**
   * State var that holds info on hikes found from search
   * @type {Array<hike>}
   */
  const [searchInputResult, setSearchInputResult] = React.useState([]);
  /**
   * State var that holds added hike's trail type
   */
  const [trailType, setTrailType] = React.useState("")

  // Fetches data on a specific hike on every render
  React.useEffect(async () => {
    if (transparent) {
      setTransparent(false);
    }

    // Fetch data
    if (id != undefined) {
      let data = await axios.get(`http://localhost:3001/trails/id/${id}`);
      setSearchInputResult(Array.from(data.data.trail));
      setCenter({
        lat: data.data.trail[0].latitude,
        lng: data.data.trail[0].longitude,
      });
    }
  }, []);

  // Return React component
  return (
    <nav className="find-hikes">
      <SideBar
        searchInputResult={searchInputResult}
        setSearchInputResult={setSearchInputResult}
        setCenter={setCenter}
        selectedHike={selectedHike}
        setSelectedHike={setSelectedHike}
        currUser={currUser}
      />
      <div className="map-div">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDEc_o7C5X1ljM7fq27LLr5QdZPfrQlQZA" }}
          center={center}
          defaultZoom={zoom}
        >
          {searchInputResult.map((trail, index) => {
            return (
              <Marker
                key={index}
                lat={trail.latitude}
                lng={trail.longitude}
                setCenter={setCenter}
                setSelectedHike={setSelectedHike}
                selectedHike={selectedHike}
                trail={trail}
              />
            );
          })}
        </GoogleMapReact>
      </div>
      <div className="create_hike">
          <span>Don't see the hike you're looking for?</span>
          <span>Add it here</span>
      </div>
      <div className="create_hike_popout">
        <input
            type="text"
            className="trail_type"
            autoComplete="off"
            onChange={(event) => setTrailType(event.target.value)}
            placeholder="Trail Type"
            value={trailType}
            required
        />
        <input
            type="text"
            className="difficulty"
            autoComplete="off"
            onChange={(event) => setTrailType(event.target.value)}
            placeholder="Trail Type"
            value={trailType}
            required
        />
        <input
            type="text"
            className="trail_type"
            autoComplete="off"
            onChange={(event) => setTrailType(event.target.value)}
            placeholder="Trail Type"
            value={trailType}
            required
        />
        <input
            type="text"
            className="location"
            autoComplete="off"
            onChange={(event) => setTrailType(event.target.value)}
            placeholder="Trail Type"
            value={trailType}
            required
        />
        <input
            type="text"
            className="ascent"
            autoComplete="off"
            onChange={(event) => setTrailType(event.target.value)}
            placeholder="Trail Type"
            value={trailType}
            required
        />
        <input
            type="text"
            className="descent"
            autoComplete="off"
            onChange={(event) => setTrailType(event.target.value)}
            placeholder="Trail Type"
            value={trailType}
            required
        />
        <input
            type="text"
            className="high"
            autoComplete="off"
            onChange={(event) => setTrailType(event.target.value)}
            placeholder="Trail Type"
            value={trailType}
            required
        />
        <input
            type="text"
            className="low"
            autoComplete="off"
            onChange={(event) => setTrailType(event.target.value)}
            placeholder="Trail Type"
            value={trailType}
            required
        />
        <input
            type="text"
            className="longitude"
            autoComplete="off"
            onChange={(event) => setTrailType(event.target.value)}
            placeholder="Trail Type"
            value={trailType}
            required
        />
        <input
            type="text"
            className="latitude"
            autoComplete="off"
            onChange={(event) => setTrailType(event.target.value)}
            placeholder="Trail Type"
            value={trailType}
            required
        />
        <input
            type="text"
            className="condition_status"
            autoComplete="off"
            onChange={(event) => setTrailType(event.target.value)}
            placeholder="Trail Type"
            value={trailType}
            required
        />
        <input
            type="text"
            className="summary"
            autoComplete="off"
            onChange={(event) => setTrailType(event.target.value)}
            placeholder="Trail Type"
            value={trailType}
            required
        />
      </div>
    </nav>
  );
}

/**
 * Marker components on Google Map for each hike in search results
 *
 * @param {number} lat Latitude of hike location
 * @param {number} lng Longitude of hike location
 * @param {function} setCenter Sets center of Google Map
 * @param {function} setSelectedHike Used on click
 * @param {hike}  selectedHike Info of selected hike
 * @param {hike}  trail Info on hike
 * @returns
 */
export function Marker({
  lat,
  lng,
  setCenter,
  setSelectedHike,
  selectedHike,
  trail,
}) {
  /**
   * Handles click of marker
   */
  function handleClick() {
    // Set center of Google Map to this marker
    setCenter({ lat, lng });

    // Open and close selected hike
    if (selectedHike != trail) {
      setSelectedHike(trail);
    } else {
      setSelectedHike(null);
    }
  }

  // Return React component
  return (
    <div className="marker">
      <span className="material-icons md-48 marker-icon" onClick={handleClick}>
        add_location
      </span>
    </div>
  );
}
