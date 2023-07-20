import axios from "axios";
import { api } from "./settings";

const authAxios = axios.create({
  baseURL: api,
});

const token = localStorage.getItem("jwttoken");

export const getToken = () => {
  return {
    headers: {
      token: token,
      type: "web",
    },
  };
};

class Request {
  error = (err) => {
    try {
      if (err.response.status === 401) {
        localStorage.removeItem("jwttoken");
      }
    } catch (e) {}
  };

  listForm() {
    return new Promise((next, error) => {
      authAxios
        .get("/userdata", getToken())
        .then((d) => {
          next(d.data);
        })
        .catch((err) => {
          next(err.response.data);
          this.error(err);
        });
    });
  }

  fetchReport(id) {
    return new Promise((next, error) => {
      authAxios
        .get(`/userdata/report/${id}`, getToken())
        .then((d) => {
          next(d.data);
        })
        .catch((err) => {
          next(err.response.data);
          this.error(err);
        });
    });
  }

  submitForm(data) {
    return new Promise((next, error) => {
      authAxios
        .post("/userdata", { ...data }, getToken())
        .then((d) => {
          next(d.data);
        })
        .catch((err) => {
          next(err.respose.data);
          this.error(err);
        });
    });
  }

  updateForm(data, id) {
    console.log(id, data);
    return new Promise((next, error) => {
      authAxios
        .put(`/userdata/${id}`, { ...data }, getToken())
        .then((d) => {
          next(d.data);
        })
        .catch((err) => {
          next(err.respose.data);
          this.error(err);
        });
    });
  }

  deleteForm(id) {
    return new Promise((next, error) => {
      authAxios
        .delete(`/userdata/${id}`, getToken())
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
