import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function HangoutForm({ hangout = {}, formFunction }) {
  const [title, setTitle] = useState(hangout.title || "");
  const [errTitle, setErrTitle] = useState("");
  const [place, setPlace] = useState(hangout.place || "");
  const [errPlace, setErrPlace] = useState("");
  const [date, setDate] = useState(hangout.date || new Date());
  const [errDate, setErrDate] = useState("");
  const [description, setDescription] = useState(hangout.description || "");
  const [errDescription, setErrDescription] = useState("");

  const functionMap = {
    title,
    place,
    date,
    description,
    errorFunctions: {
      title: setErrTitle,
      place: setErrPlace,
      date: setErrDate,
      description: setErrDescription,
    },
  };

  return (
    <form className="bg-transparent d-flex flex-column h-100">
      <div className="form-group">
        <input
          type="text"
          autoComplete="nope"
          className="form-control"
          placeholder="What will you do?"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setErrTitle("");
          }}
        />
        <small className="text-danger">{errTitle}</small>
      </div>

      <div className="form-group">
        <div className="d-flex align-items-center with-icon">
          <i className="material-icons text-secondary">room</i>
          <input
            type="text"
            autoComplete="nope"
            className="form-control"
            placeholder="Where would it be?"
            value={place}
            onChange={(e) => {
              setPlace(e.target.value);
              setErrPlace("");
            }}
          />
        </div>
        <small className="text-danger">{errPlace}</small>
      </div>

      <div className="form-group mb-4">
        <label>When will this be?</label>
        <div className="d-flex align-items-center with-icon">
          <i className="material-icons text-secondary">calendar_today</i>
          <DatePicker
            selected={date}
            onChange={(d) => {
              setDate(d);
              setErrDate();
            }}
            showTimeSelect
            timeIntervals={15}
            dateFormat="dd/MM/yyyy HH:mm"
          />
        </div>
        <small className="text-danger">{errDate}</small>
      </div>

      <div className="form-group">
        <label>Maybe a description about what you'll do?</label>
        <textarea
          type="text"
          autoComplete="nope"
          className="form-control"
          rows="4"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setErrDescription("");
          }}
        />
        <small className="text-danger">{errDescription}</small>
      </div>

      <div className="flex-grow-1"></div>

      <div
        className="btn create-hangout"
        onClick={() => formFunction(functionMap)}
      >
        <span className="flex-grow-1">Create Hangout</span>
        <i className="material-icons">create</i>
      </div>
    </form>
  );
}
