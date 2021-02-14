import "./_style.css";

export default function Header({ backButton, userImg, chatLink }) {
  return (
    <header>
      <div className="profile-pic">
        {backButton && (
          <i className="material-icons" onClick={() => (window.location = "/")}>
            arrow_back
          </i>
        )}
        {userImg && <img src={userImg} alt="profile-pic" />}
      </div>
      <div>
        <span>JALO</span>
      </div>
      <div style={{ width: "56px" }}>
        {chatLink && (
          <a href={chatLink} alt="chat">
            <i
              className="material-icons"
              onClick={() => (window.location = "/")}
            >
              mode_comment
            </i>
          </a>
        )}
      </div>
    </header>
  );
}
