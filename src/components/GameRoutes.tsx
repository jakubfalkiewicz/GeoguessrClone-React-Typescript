import React from "react";
import { Routes, Route } from "react-router-dom";
// import MapsList from "./MapsList";

import NotFound from "./NotFound";
import GameLogic from "../pages/GameLogic";
import GameSummary from "../pages/GameSummary";
import { LoadScript } from "@react-google-maps/api";

export default function GameRoutes() {
    const key: string = process.env.REACT_APP_GOOGLE_MAPS_API_KEY!
    return (
        <div>
            <Routes>
                {/* <Route index element={<MapsList />} /> */}
                <Route
                    path=":id"
                    element={
                        <LoadScript googleMapsApiKey={`${key}`}>
                            <GameLogic />
                        </LoadScript>
                    }
                />
                <Route path="summary" element={<GameSummary />} />
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </div>
    );
}
