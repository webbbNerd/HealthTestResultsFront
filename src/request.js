import axios from "axios";
import { api } from "./settings";
const token = Cookies.get("jwttoken");

const authAxios = axios.create({
  baseURL: api,
});

export const getToken = () => {
  return {
    headers: {
      Autherization: "Token " + token,
      type: "web",
    },
  };
};

class Request {
  error = (err) => {
    try {
      if (err.response.status === 401) {
        Cookies.remove("jwttoken");
      }
    } catch (e) {}
  };

  submitForm(data) {
    return new Promise((next, error) => {
      authAxios
        .post("/form", { ...data }, getToken())
        .then((d) => {
          next(d.data);
        })
        .catch((err) => {
          next(err.respose.data);
          this.error(err);
        });
    });
  }
}

export default new Request();
