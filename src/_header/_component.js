import "./_style.css";
import jaloBlack from "../jalo-black.svg";

export default function Header({
  backButton,
  middleSign,
  showIcon,
  peopleAmmount,
  userImg,
  chatLink,
}) {
  return (
    <header>
      <div className="profile-pic">
        {backButton && (
          <i className="material-icons" onClick={() => (window.location = "/")}>
            arrow_back
          </i>
        )}
        {userImg && (
          <a href="/login">
            <img src={userImg} alt="profile-pic" />
          </a>
        )}
      </div>
      <div>
        {showIcon && <img src={jaloBlack} alt="" style={{ height: "48px" }} />}
        {middleSign && (
          <div className="text-center chat-title">
            <p className="m-0">{middleSign}</p>
            {peopleAmmount && (
              <div className="d-flex align-items-center with-icon">
                <i className="material-icons text-secondary">person</i>
                <p className="m-0">{peopleAmmount}</p>
              </div>
            )}
          </div>
        )}
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
