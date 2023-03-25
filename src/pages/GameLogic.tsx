// const GameLogic = () => {
//   return (<>
//     <div>Witam</div>
//   </>)
// }
// export default GameLogic
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "react-router";
import {
  GoogleMap,
  StreetViewPanorama,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import { Link, useLocation } from "react-router-dom";
import "../styles/GameLogic.scss";
import IGame from "../interfaces/IGame";
import ILocation from "../interfaces/ILocation";

interface mapSizeInterface {
  height: string;
  width: string;
}


const GameLogic = () => {

  const [round, setRound] = useState(1);
  const [roundScore, setRoundScore] = useState(0);
  const [gameScore, setGameScore] = useState(0);
  const [markers, setMarkers] = useState<markerInterface[]>([]);
  const [summaryMarkers] = useState<markerInterface[][]>([]);
  const [map, setMap] = useState<google.maps.Map>();
  const [mapSize, setMapSize] = useState<mapSizeInterface>({} as mapSizeInterface);
  const [distance, setDistance] = useState<number | null>(null);
  const [backToStart, setBackToStart] = useState<number>(0);
  const [prevCenter, setPrevCenter] = useState<google.maps.LatLng>({} as google.maps.LatLng);
  const [gameFinished, setGameFinished] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [game, setGame] = useState<IGame>({} as IGame)
  const [mapCenter, setMapCenter] = useState<google.maps.LatLng>({} as google.maps.LatLng);
  let { state } = useLocation();

  interface markerInterface {
    lat: number;
    lng: number;
    url?: string;
  }

  useEffect(() => {
    if (map) {
      setMapCenter(map.getCenter())
    }
  }, [map])

  const onMapLoad = useCallback((map: google.maps.Map) => {
    console.log(state)
    setGame(state.game)
    map.setOptions(mapOptions);
    setMap(map);
    loadCenter(map, state.game);
    console.log("Map loaded")
    //Street view lines
    // const streetViewLayer = new window.google.maps.StreetViewCoverageLayer();
    // streetViewLayer.setMap(map);
  }, []);

  //REACT-GOOGLE-MAPS-COMPONENTS-OPTIONS
  const mapOptions = {
    draggableCursor: "crosshair",
    gestureHandling: "greedy",
    streetViewControl: false,
    fullscreenControl: false,
    disableDefaultUI: true,
    clickableIcons: false,
  };
  const panoramaOptions = {
    position: { ...state.game.locations[state.game.currentRound - 1] },
    //COMPASS
    panControl: true,
    //ZOOM BUTTONS
    zoomControl: game.zoom,
    //ROAD ARROWS
    linksControl: game.move,
    //ZOOM
    scrollwheel: game.zoom,
    //MOVING
    clickToGo: game.move,
    //SHOW ADDRESS
    addressControl: false,
    //ROAD NAMES
    showRoadLabels: false,
    //ADDONS
    fullscreenControl: false,
    motionTrackingControl: true,
    enableCloseButton: false,
    visible: true,
  };
  const polyLineOptions = {
    geodesic: true,
    strokeColor: "#FFFFF",
    strokeOpacity: 0,
    icons: [
      {
        icon: {
          path: "M 0,0 0,0",
          strokeOpacity: 1,
          scale: 3,
        },
        offset: "0",
        repeat: "5px",
      },
    ],
  };

  function loadCenter(map: google.maps.Map, game: IGame) {
    const geocoder = new window.google.maps.Geocoder();
    console.log(game.locations)
    if (game?.country) {
      geocoder.geocode({ address: game.country }, function (results, status) {
        map.setCenter(results![0].geometry.location);
        map.setZoom(5);
      });
    } else {
      map.setZoom(1);
    }
  }

  const onMapClick = useCallback((e: google.maps.LatLng) => {
    setMarkers([
      {
        lat: e.lat(),
        lng: e.lng(),
      },
    ]);
  }, []);

  const location = game.locations && game.locations[round - 1];

  const addSolutionMarker = () => {
    const solMarker = {
      lat: location.lat,
      lng: location.lng,
      url: `https://www.google.com/maps?q&layer=c&cbll=${location.lat},${location.lng}`,
    };
    markers.push(solMarker);
    summaryMarkers.push(markers);
  };

  const zoomFitBounds = (boundsList: any[]) => {
    const bounds = new window.google.maps.LatLngBounds();
    boundsList.forEach((coord) => {
      bounds.extend(coord);
    });
    if (map) {
      map.fitBounds(bounds);
    }
  };

  const getDistacneInUnits = () => {
    const fixedDist = +parseFloat(distance!.toFixed(1))
    if (Math.round(distance!) > 2000) {
      return `${parseFloat((distance! / 1000).toFixed(1))} KM`;
    }
    if (fixedDist > 10000) {
      if (distance) {
        //TEST VALUE
        return `${Math.round(distance! / 1000)} KM`;
      }
    }
    if (fixedDist <= 2000) {
      return `${Math.round(distance!)} M`;
    }
  };

  const getRoundScore = (dist: number) => {
    //REFFERENCE: https://www.reddit.com/r/geoguessr/comments/7ekj80/for_all_my_geoguessing_math_nerds/
    const exponent = 0.9893391207 ** Math.round(dist / 1000);
    setRoundScore(Math.round(5000 * exponent));
  };

  const handleGuess = () => {
    const solutionPosition = new window.google.maps.LatLng(
      location.lat,
      location.lng
    );
    const solutionLocation: ILocation = {
      lat: solutionPosition.lat(),
      lng: solutionPosition.lng()
    };
    const markerPosition = new window.google.maps.LatLng(
      markers[0].lat,
      markers[0].lng
    );
    const markerLocation: ILocation = {
      lat: markerPosition.lat(),
      lng: markerPosition.lng()
    };
    const distance =
      window.google.maps.geometry.spherical.computeDistanceBetween(
        solutionPosition,
        markerPosition
      );

    game.currentRound++;
    game.roundsList.push([solutionLocation, markerLocation]);
    //State reset to fix
    // editGame({ round: markerPosition, id: game._id });
    setDistance(distance);
    addSolutionMarker();
    zoomFitBounds([solutionPosition, markerPosition]);
    setMapSize({
      height: "100vh",
      width: "100vw",
    });
    getRoundScore(distance);
  };

  const nextRound = () => {
    if (round === game.locations.length) {
      console.log(summaryMarkers);
      const summaryMarkersFlattened = summaryMarkers.flat();
      setMarkers(summaryMarkersFlattened);
      zoomFitBounds(summaryMarkersFlattened);
      if (gameFinished === false) {
        setGameScore(gameScore + roundScore);
      }
      setGameFinished(true);
    } else {
      setMarkers([]);
      setRound(round + 1);
      setMapSize({} as mapSizeInterface);
      setGameScore(gameScore + roundScore);
      setTimeout(() => {
        loadCenter(map, game);
      }, 100);
    }
  };

  if (!mapCenter.lat) {
    setMapCenter(state.game.locations[state.game.currentRound - 1])
  }
  // console.log(center)

  const panoramaContainerStyle = {
    height: "100vh",
    width: "100vw",
  };

  if (!game.move) {
    window.addEventListener(
      "keydown",
      (event) => {
        if (
          // Change or remove this condition depending on your requirements.
          (event.key === "ArrowUp" || // Move forward
            event.key === "ArrowDown" || // Move forward
            event.key === "ArrowLeft" || // Pan left
            event.key === "ArrowRight") && // Pan right // Zoom out
          !event.metaKey &&
          !event.altKey &&
          !event.ctrlKey
        ) {
          event.stopPropagation();
        }
      },
      { capture: true }
    );
  }
  //PREVENT PANORAMA FROM GOING TO START POINT UNINTENTIONALLY
  const panoMap = useMemo(
    () => (
      <GoogleMap
        id="street-view"
        // center={center}
        zoom={1}
        mapContainerStyle={panoramaContainerStyle}
      >
        <StreetViewPanorama

          // visible={true}
          // onLoad={onPanoramaLoad}
          options={panoramaOptions}
        />
      </GoogleMap>
    ),
    [round, backToStart]
  );

  return (
    <div>
      <div id="panorama-container">
        {panoMap}
        <div
          id="startingPoint"
          aria-label="Starting point"
          onClick={() => {
            setPrevCenter(map.getCenter()!);
            setBackToStart(backToStart + 1);
          }}
        >
          <img
            src="https://www.geoguessr.com/_next/static/images/icon-return-to-start-3b4eed3225adfd860a4ed3726ad1e05a.svg"
            alt="backToStart"
          />
        </div>
        <div className="score-board">
          <div>
            <div>Round</div>
            <div>{round}</div>
          </div>
          <div>
            <div>Score</div>
            <div>{gameScore}</div>
          </div>
        </div>
      </div>
      <div
        id={"map-container"}
        className={
          markers.length > 1
            ? `active ${hidden ? "hidden" : ""}`
            : `${hidden ? "hidden" : ""}`
        }
      >
        <GoogleMap
          id="map"
          mapContainerStyle={
            mapSize || {
              height: "210px",
              width: "250px",
            }
          }
          zoom={5}
          center={mapCenter}
          onClick={(e: google.maps.MapMouseEvent) => onMapClick(e.latLng)}
          onLoad={onMapLoad}
        >
          {markers.length > 0 &&
            markers.map((marker) => (
              <Marker
                key={`${marker.lat}-${marker.lng}`}
                position={{ lat: marker.lat, lng: marker.lng }}
                icon={
                  marker.url
                    ? {
                      url: `https://www.geoguessr.com/_next/static/images/correct-location-4da7df904fc6b08ce841e4ce63cd8bfb.png`,
                      scaledSize: new window.google.maps.Size(25, 25),
                    }
                    : ""
                }
                onClick={() =>
                  marker.url ? window.open(marker.url, "_blank") : {}
                }
              />
            ))}
          {markers.length === 2 && (
            <Polyline
              path={[markers[0], markers[1]]}
              options={polyLineOptions}
            />
          )}
          {markers.length === 10 &&
            summaryMarkers.map((markersList) => (
              <Polyline
                key={`${markersList[0].lat}-${markersList[0].lng}`}
                path={[markersList[0], markersList[1]]}
                options={polyLineOptions}
              />
            ))}
        </GoogleMap>
        <div className="cancel" onClick={() => setHidden(!hidden)}>
          X
        </div>
        {(markers.length === 0 || markers.length % 2 !== 0) && (
          <button
            id="confirmButton"
            className={markers.length > 0 ? "active" : ""}
            onClick={() => {
              markers.length > 0 ? handleGuess() : console.log("no marker");
            }}
          >
            {markers.length > 0 ? "GUESS" : "PLACE YOUR PIN ON THE MAP"}
          </button>
        )}
        {markers.length > 0 && markers.length % 2 === 0 && (
          <div className="scoreboard">
            <div className="roundPoints">
              {markers.length !== 10 ? roundScore : gameScore} points
            </div>
            <div id="progressBar" >
              <div
                id="progress"
                style={{
                  width: `${markers.length !== 10
                    ? (roundScore / 5000 * 100)
                    : (gameScore / 25000 * 100)
                    }%`,
                }}
              ></div>
            </div>
            {markers.length !== 10 ? (
              <div className="score">
                Your guess was {getDistacneInUnits()} away
              </div>
            ) : (
              <div>Well played!</div>
            )}
            <button id="nextRound" onClick={() => nextRound()}>
              {summaryMarkers.length !== 5 ? "NEXT ROUND" : "SUMMARY"}
            </button>
            {summaryMarkers.length === 5 && (
              <Link to={`../../maps/${game.mapId}`}>
                <button id="playAgain">PLAY AGAIN</button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameLogic;
