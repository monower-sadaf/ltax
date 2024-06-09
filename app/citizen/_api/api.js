import axios from "axios";
import { getTokenFromCookie } from "@/app/_utils/cookieUtils";

const token = getTokenFromCookie();

const citizenClient = axios.create({
  baseURL: process.env.BASE_URL_V1,
  headers: {
    Authorization: token,
    "content-type": "application/json",
  },
  cancelToken: axios.CancelToken.source().token,
});


export const login = async (data) => {
  const res = await citizenClient
    .post("/api/signin", data)
    .then((res) => res.data)
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("Request canceled", err.message);
      } else {
        console.log(err);
      }
    });
  
  if(res.status == 'true'){
    return res.data[0];
  }else{
    return false;
  }
};


export const citizenDashboardStat = async (id) => {
  const res = await citizenClient
    .post("/dashboard", { id })
    .then((res) => res.data)
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("Request canceled", err.message);
      } else {
        console.log(err);
      }
    });

  
  
  if(res.status == 'true'){
    return res.data[0];
  }else{
    return false;
  }
}

export const complainStats = async (username) => {
  const res = await citizenClient
    .post("/api/complainCount", { username })
    .then((res) => res.data)
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log("Request canceled", err.message);
      } else {
        console.log(err);
      }
    });
  
  /* if(res.status == 'true'){
    return res.data[0];
  }else{
    return false;
  } */
  

  return res.status == 200 && res.data;
}
