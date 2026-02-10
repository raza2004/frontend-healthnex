"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

type Doctor = {
  id: string | number;
  lat: number;
  lng: number;
  name: string;
  specialization?: string;
  address?: string;
};

interface MapComponentProps {
  lat: number;
  lng: number;
  doctors?: Doctor[];
}

export default function MapComponent({ lat, lng, doctors }: MapComponentProps) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "400px", width: "100%", borderRadius: "10px" }}
    >
      {/* Free OpenStreetMap tiles */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />

      {/* User Location Marker */}
      <Marker position={[lat, lng]}>
        <Popup>You are here</Popup>
      </Marker>

      {/* Doctor Markers */}
      {doctors?.map((doc) => (
        <Marker key={doc.id} position={[doc.lat, doc.lng]}>
          <Popup>
            <strong>{doc.name}</strong>
            <br />
            {doc.specialization}
            <br />
            {doc.address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
