import React from "react";
import { Routes, Route } from "react-router-dom";
import MapsList from "../pages/MapsList";
import MapDetails from "../pages/MapDetails";
// import NewMap from "../pages/NewMap";
import NotFound from "./NotFound";

export default function MapRoutes() {
  return (
    <div>
      <Routes>
        <Route index element={<MapsList />} />
        <Route path=":id" element={<MapDetails />} />
        {/* <Route path="new" element={<NewMap />} /> */}
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}
