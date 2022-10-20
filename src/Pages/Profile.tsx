import React from "react";

interface Props {
  isLoggedIn: any;
  user: any;
}

const Profile: React.FC<Props> = (props) => {
  if (props.isLoggedIn) {
    return <div>You are logged in as {props.user.email}</div>;
  } else {
    return <div>You are not logged in</div>;
  }
};

export default Profile;
