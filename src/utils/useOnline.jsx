import { useState, useEffect } from "react";

const useOnline = () => {
    const [isOnline, setIsOnline] = useState(true);

    const onlineHandle = () => {
        setIsOnline(true);
    };

    const offlineHandle = () => {
        setIsOnline(false);
    };
    useEffect(() => {
        window.addEventListener("online", onlineHandle);
        window.addEventListener("offline", offlineHandle);

        return () => {
            window.removeEventListener("online", onlineHandle);
            window.removeEventListener("offline", offlineHandle);
        };
    }, []);

    return isOnline;
};

export default useOnline;
