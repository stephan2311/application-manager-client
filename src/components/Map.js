import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Map(props) {

    const [searchQuery, setSearchQuery] = useState("");

    console.log(props.street);
    console.log(props.city);
    console.log(props.zip);
    console.log(props.country);

    const street = props.street;
    const city = props.city;
    const zip = props.zip;
    const country = props.country;


    useEffect(() => {
        axios
            .get(
                `https://nominatim.openstreetmap.org/?q=${JSON.stringify(street + ',' + city + ',' + zip + ',' + country)}&format=json&limit=1`
            )
            .then((response) => {
                console.log('response.data', response.data[0]);
                setSearchQuery(response.data[0]);
                console.log(searchQuery);
            });
    }, []);

    // const { lon, lat } = searchQuery;
    // console.log(lon);
    // console.log(lat);

    console.log(searchQuery);
    console.log(searchQuery.lon);
    console.log([parseInt(searchQuery.lon), parseInt(searchQuery.lat)])

    return (
        <>
            {searchQuery &&
                <MapContainer center={[parseFloat(searchQuery.lat), parseFloat(searchQuery.lon)]} zoom={13}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[51.505, -0.09]}>
                    </Marker>
                </MapContainer>
            }
        </>
    )
}

export default Map
