import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import UpgradeBar from "../components/UpgradeBar";
import NavbarAccount from "../components/NavbarAccount";
import poland from "../media/poland-map.jpg";
import pomerania from "../media/pomerania-map.jpg";
import "../styles/MapsList.scss";
import numeral from "numeral";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { mapsState, getMaps } from "../redux/slices/mapsSlice";
import IMap from "../interfaces/IMap";
import { useDispatch } from "react-redux";

const MapsList = () => {
    const [maps, setMaps] = useState<IMap[]>([])

    const mapsState = useSelector<RootState, mapsState>(state => state.mapsReducer);

    const dispatch = useDispatch()

    useEffect(() => {
        const sessionMaps = sessionStorage.getItem('maps')
        if (mapsState.maps.length > 0) {
            setMaps(mapsState.maps)
        }
        else if (sessionMaps) {
            setMaps(JSON.parse(sessionMaps))
        }
        else {
            dispatch(getMaps() as any)
        }
    }, [mapsState.maps])

    let { state } = useLocation();

    return (
        <div className="maps-container">
            <div className="maps-main-view">
                <UpgradeBar />
                <div className="maps-nav-bar">
                    <header>
                        <div className="logo">
                            <a title="GeoGuessr" href="/">
                                <img
                                    src="https://www.geoguessr.com/_next/static/images/logo-e108dab37292e7fec6148eb5f19bf484.svg"
                                    alt="GeoGuessr"
                                />
                            </a>
                        </div>
                        <div></div>
                        <NavbarAccount user={state.user} />
                    </header>
                </div>
                <div className="maps-main">
                    <div className="maps-grid">
                        {maps.length !== 0 ? (
                            maps.map((el) => (
                                <Link
                                    key={el._id}
                                    to={el._id}
                                    state={{ user: state.user, map: el }}
                                    style={{ textDecoration: "none", cursor: "auto" }}
                                >
                                    <div className="map" id={el._id}>
                                        <img
                                            alt="map-img"
                                            src={el.name === "Tricity areas" ? pomerania : poland}
                                        ></img>
                                        <div>{el.name}</div>
                                        <button>PLAY</button>
                                        {/* <div>{el.description}</div> */}
                                        {/* <div>{el.likes} likes</div> */}
                                        <div className="map-details">
                                            {numeral(el.locationsList.length).format("0.0a")}{" "}
                                            locations
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div>MAPS LOADING... (can take up to 30 seconds)</div>
                        )}
                    </div>
                </div>
                <div className="maps-side-bar">
                    <div className="side-bar-content"></div>
                </div>
            </div >
        </div >
    );
};

export default MapsList;
