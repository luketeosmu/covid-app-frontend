import axios from "axios";

const REGISTER_API_URL = "http://localhost:8080/users";
const AUTH_API_URL = "http://localhost:8080/users/search";

class AuthenticationService {
  registerUser = async (user) => {
    return axios
      .post(REGISTER_API_URL, user)
      .then((response) => {
        localStorage.clear();
        localStorage.setItem("user", JSON.stringify(response.data));
        // console.log(localStorage.getItem("user"));
        // return response.data;
        console.log(JSON.parse(localStorage.getItem("user")).id);
      })
      .catch((err) => {
        console.log(err);
        // this.signOut();
      });
  };
  //store user after registering, register business and use id from local storage
  //then store business under user, and sign out.

  registerBusiness = async (business) => {
    return axios
      .post(`http://localhost:8080/users/${JSON.parse(localStorage.getItem("user")).id}/businesses`,
        business,
        {
          auth: {
            username: `${JSON.parse(localStorage.getItem("user")).username}`,
            password: "Tester123",
          },
        }
      )
      .then((response) => {
        this.signOut();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  authenticate = async (user) => {
    return axios
      .post(AUTH_API_URL, user)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log(localStorage.getItem("user"));
        // return response.data;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  signOut() {
    // localStorage.clear();
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  isLoggedIn() {
    if (localStorage.getItem("user") === null) {
      return false;
    }
    return true;
  }
}

export default new AuthenticationService();
