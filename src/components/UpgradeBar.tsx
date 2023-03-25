import React from "react";
import "../styles/UpgradeBar.scss";

export default function UpgradeBar() {
    return (
        <div className="home-upgrade-bar">
            <div className="empty"></div>
            <div className="free-acc-info">
                You are on a Free-account and can play for free for 5 minutes every 15
                minutes.
            </div>
            <div className="timer-upgrade">
                <div className="timer-container">
                    <div className="timer">
                        <picture>
                            <img
                                src="https://www.geoguessr.com/_next/static/images/stopwatch-green-2e27320085422df7d2496ec56fd80fc6.png"
                                aria-hidden="true"
                                alt=""
                                width="20"
                                height="20"
                            />
                        </picture>
                        <div className="countdown-time">
                            <span>05</span>
                            <span>:</span>
                            <span>00</span>
                        </div>
                    </div>
                </div>
                <div className="upgrade">
                    <span className="upgrade-text">UPGRADE TO PRO</span>
                </div>
            </div>
        </div>
    );
}
