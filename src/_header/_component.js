import "./_style.css";

export default function Header({ userImg }) {
  return (
    <header>
      <div className="profile-pic">
        {userImg && <img src={userImg} alt="profile-pic" />}
      </div>
      <div>
        <span>JALO</span>
      </div>
      <div style={{ width: "56px" }}></div>
    </header>
  );
}
