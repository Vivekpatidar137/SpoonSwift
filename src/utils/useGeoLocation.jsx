import { useState, useEffect } from "react";

const useGeoLocation = () => {
    const [location, setLocation] = useState({
        lat: null,
        lng: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        if (!navigator.geolocation) {
            setLocation({
                lat: null,
                lng: null,
                loading: false,
                error: "Geolocation is not supported by your browser",
            });
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    loading: false,
                    error: null,
                });
            },
            (err) => {
                setLocation({
                    lat: null,
                    lng: null,
                    loading: false,
                    error: err.message,
                });
            }
        );
    }, []);

    return location;
};

export default useGeoLocation;
