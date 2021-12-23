import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import ReactMapGl, { Marker, Popup } from "react-map-gl";

const Simplemap = ({ _id }) => {
  const [coords, setCoords] = useState([]);
  const [postId, setPostId] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    async function getGeoCode() {
      const { data } = await axios.get("/api/posts");
      const posts = data;
      const newCoords = [];
      const posting = [];
      for (let i = 0; i < posts.length; i++) {
        const location = posts[i].location;
        const id = posts[i]._id;
        const response = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=39b07783561747b1b301c84b5e602c31&language=en&pretty=1`
        );
        const longlat = response.data.results[0].geometry;
        const complete = { ...longlat, id };
        newCoords.push(complete);
        posting.push(id);
      }
      setCoords(newCoords);
      setPostId(posting);
    }
    getGeoCode();
  }, []);

  const [viewPort, setViewPort] = useState({
    latitude: 51.5072,
    longitude: 0.1276,
    zoom: 5.5,
  });

  const [popup, setPopUp] = useState(null);

  const handleClick = () => {
    navigate(`/landing/${postId}`);
  };

  return (
    <div>
      <nav className="landing-nav">
        <Link to={`/profile`}>Profile</Link>
        <Link to="/landing">Home</Link>
        <Link to={`/add`}>Add Your Post</Link>
      </nav>
      <div className="map-container">
        <ReactMapGl
          mapboxApiAcessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          height="95%"
          width="100%"
          mapStyle="mapbox://styles/mapbox/streets-v11"
          {...viewPort}
          onViewStateChange={(viewPort) => setViewPort(viewPort)}
        >
          {coords.length &&
            coords.map((coord, i) => {
              return (
                <Marker key={i} latitude={coord.lat} longitude={coord.lng}>
                  <span onClick={() => setPopUp(coord)}>🧑‍💻</span>
                  <Link
                    className="links"
                    to={{ pathname: `/landing/${coord.id}` }}
                  >
                    {" "}
                    Find My Post
                  </Link>
                </Marker>
              );
            })}
          <div className="popup-conatiner">
            {popup && (
              <Popup
                latitude={popup.lat}
                longitude={popup.lng}
                closeOnClick={true}
                onClose={() => setPopUp(null)}
              >
                {postId.map((id) => (
                  <div className="popup" onClick={handleClick}></div>
                ))}
              </Popup>
            )}
          </div>
        </ReactMapGl>
      </div>
    </div>
  );
};

export default Simplemap;
