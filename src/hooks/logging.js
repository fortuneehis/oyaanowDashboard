import axios from "axios";

const loginUrl = "https://oyanow-api.herokuapp.com/staff/signin";

export const logging = (data) => {
  return new Promise(async (resolve, reject) => {
    const response = await axios.post(loginUrl, data);
    console.log(response.data);
    resolve(response.data);
    localStorage.setItem("token", JSON.stringify(response.data.token));
  });
};
