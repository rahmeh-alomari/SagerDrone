import HeaderHTML from "./HeaderHTML";
import avatarImg from "../../../assets/Women-avatar-icon.jpg";

const Header = () => {
  const user = { name: "MS.Rahmeh", avatar: avatarImg ,position:"Front-End Engineer"};
  return <HeaderHTML user={user} />;
};

export default Header;
