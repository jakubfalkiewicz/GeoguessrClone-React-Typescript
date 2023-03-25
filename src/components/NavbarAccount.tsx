import React from "react";
import profileAvatar from "../media/profile-avatar.webp";
import tier50 from "../media/tier-50.png";
import "../styles/NavbarAccount.scss";
import IUser from "../interfaces/IUser";

interface HomeProps {
    user: IUser;
}

const NavbarAccount: React.FC<HomeProps> = ({ user }) => {
    // export default function NavbarAccount() {
    function calculateLevel(experience: number) {
        let level = 0;
        let requiredExp = 0;
        while (experience >= requiredExp) {
            level++;
            requiredExp = level * (level + 1) * 50;
        }
        let levelExp = (level - 1) * level * 50;
        return {
            level: level - 1,
            experienceBar: ((experience - levelExp) / (requiredExp - levelExp)) * 100,
        };
    }
    const userExp = calculateLevel(user.experience);
    return (
        <div className="account-info">
            <div className="search-bar">
                <div className="skew-background-1"></div>
                <picture>
                    <img
                        src="https://www.geoguessr.com/_next/static/images/search-icon-6aee7cacff9ad0bd5e6b637943a0180a.svg"
                        alt=""
                    />
                </picture>
                <div className="skew-background-2"></div>
            </div>
            <div className="account">
                <div className="profile-avatar">
                    <div>
                        <img src={profileAvatar} loading="lazy" alt="profile-avatar" />
                    </div>
                    <picture>
                        <img src={tier50} alt="tier-50" />
                    </picture>
                </div>
                <div className="profile-stats">
                    <div className="user-level">
                        LVL {userExp.level < 0 ? 0 : userExp.level}
                    </div>
                    <div className="user-title">VOYAGER</div>
                    <div className="user-level-progress">
                        <div
                            className="progress-bar"
                            style={{
                                width: userExp.experienceBar + "%",
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default NavbarAccount