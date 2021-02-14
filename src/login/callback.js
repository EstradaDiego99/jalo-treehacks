import { useEffect } from "react";
import queryString from "query-string";
import "../index.css";
import axios from "axios";

import { backendURL } from "../globals";
import { saveToken } from "../_auth/utils";

export default function FacebookCallback() {
  useEffect(() => {
    const urlParams = queryString.parse(window.location.search);
    const { code } = urlParams;
    axios
      .post(`${backendURL}/signup`, { code })
      .then((res) => {
        console.log(res);
        const { access_token } = res.data;
        console.log(access_token);
        saveToken(access_token);
      })
      .catch(() => alert("Unexpected error"));
  }, []);

  return (
    <main>
      <p>Guardando usuario...</p>
    </main>
  );
}
