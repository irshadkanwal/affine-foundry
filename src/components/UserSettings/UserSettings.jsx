import React from "react";
import Settings from "./Settings";
import ChangePassword from "./ChangePassword";
import UserProfile from "./UserProfile";

function UserSettings() {
  return (
    <div className="main_container">
      <div className="left_container">
        <div className="settings_container">
          <Settings />
        </div>
        <div className="password_container">
          <ChangePassword />
        </div>
      </div>
      <div className="right_container">
        <UserProfile />
      </div>
    </div>
  );
}

export default UserSettings;
