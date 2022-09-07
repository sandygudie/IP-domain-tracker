import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
const DisplayMap = ({ data }) => {
  const position = [data.location?.lat, data.location?.lng];

  return (
    <>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        className="map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={position}
          icon={
            new Icon({
              iconUrl: "/icon-location.svg",
              iconSize: [40, 50],
              iconAnchor: [12, 41],
            })
          }
        >
          <Popup>
           { data.isp}
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
};

export default DisplayMap;
