import "./_style.css";

export default function ChatSummary({ chat }) {
  const { _id, title, assistants, date } = chat;

  const lateChat = new Date(date) < new Date();

  return (
    <figure className={`chat${lateChat ? " late-chat" : ""}`}>
      <a href={`/chats/${_id}`} className="d-flex">
        <i className="material-icons icon-comment">mode_comment</i>
        <div className="ml-2">
          <p>{title}</p>
          <div className="d-flex align-items-center with-icon">
            <i className="material-icons text-secondary">person</i>
            <p>{assistants.length}</p>
          </div>
        </div>
      </a>
    </figure>
  );
}
