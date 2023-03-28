import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.scss";
// import video from "../media/main-video.mp4";
// const video = require("../media/main-video.mp4");
import backgroundImg from "../media/background-img.jpg";
import NavbarAccount from "../components/NavbarAccount";
import UpgradeBar from "../components/UpgradeBar";
import IUser from "../interfaces/IUser";
import video from "../media/main-video.mp4";

interface HomeProps {
    user: IUser;
}

const Home: React.FC<HomeProps> = ({ user }) => {
    return (
        <div className="home-container">
            <div className="home-main-view">
                <UpgradeBar />
                <div className="home-nav-bar">
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
                        <NavbarAccount user={user} />
                    </header>
                </div>
                <div className="home-main">
                    <div className="video-background">
                        <img src={backgroundImg} alt="background-img"></img>
                        <video autoPlay muted>
                            <source src={video} type="video/mp4" />
                        </video>
                    </div>
                    <div className="bg-color-match"></div>

                    <main>
                        <div className="grid-layout">
                            <div className="game-modes">
                                <Link
                                    to="/maps"
                                    className="link"
                                    state={{ user: user }}
                                // style={{ textDecoration: "none" }}
                                >
                                    SINGLEPLAYER
                                </Link>
                                <div className="link">MULTIPLAYER</div>
                                <div className="link">PARTY</div>
                                <div className="link">QUIZ</div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <div className="home-side-bar">
                <div className="sidie-bar-content"></div>
            </div>
        </div>
    );
}
export default Home