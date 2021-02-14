import "./_style.css";
import moment from "moment";

export default function HangoutSummary({ hangout, ownHangout }) {
  const { _id, title, place, date, user, assistants } = hangout;
  const { first_name } = user;
  const picUrl = user.picture.data.url;

  return (
    <figure className="hangout-summary">
      <a href={`/hangouts/${_id}`}>
        <div className="flex-grow-1 event-info">
          <p className="date">{moment(date).format("dddd, MMMM D. h:mm a")}</p>
          <div style={{ height: "3.25em" }}>
            <p className="title pl-2">{title}</p>
          </div>
          <div className="d-flex">
            <div className="d-flex align-items-center with-icon pl-2 flex-grow-1">
              <i className="material-icons text-secondary">room</i>
              <p>{place}</p>
            </div>

            <div className="d-flex align-items-center with-icon pl-2">
              <i className="material-icons text-secondary">person</i>
              <p>{assistants.length + 1}</p>
            </div>
          </div>
        </div>

        {!ownHangout && (
          <div className="user ml-2">
            <img src={picUrl} alt="profile-pic" />
            <p className="nombre">{first_name}</p>
          </div>
        )}
      </a>
    </figure>
  );
}
