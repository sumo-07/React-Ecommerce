import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../UI/Header";
import { Footer } from "../UI/Footer";
import { useEffect, useState } from "react";
export const AppLayout = () => {
    const location = useLocation();
    const [key, setKey] = useState(location.pathname);

    useEffect(() => {
        setKey(location.pathname);
    }, [location.pathname]);
    return <>
        <Header />
        <div key={key} className="page-transition">
            <Outlet />
        </div>
        <Footer />
    </>
}