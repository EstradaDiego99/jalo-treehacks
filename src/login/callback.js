import { useEffect } from "react";
import queryString from "query-string";
import "../index.css";
import axios from "axios";

import { backendURL } from "../utils/globals";
import { saveToken } from "../_auth/utils";

export default function FacebookCallback() {
  useEffect(() => {
    const urlParams = queryString.parse(window.location.search);
    const { code } = urlParams;
    axios
      .post(`${backendURL}/signup`, { code })
      .then((res) => {
        const { access_token, msg } = res.data;
        saveToken(access_token);
        alert(msg);
        window.location = "/";
      })
      .catch(() => alert("Unexpected error"));
  }, []);

  return (
    <main>
      <p>Guardando usuario...</p>
    </main>
  );
}
