import axios from "axios";
import { getTokenFromCookie } from "@/app/_utils/cookieUtils";

const token = getTokenFromCookie();

const orgClient = axios.create({
  baseURL: process.env.BASE_URL+'/apiorg',
  headers: {
    "Content-Type": "application/json",
    
  },
  // cancelToken: axios.CancelToken.source().token,
});

/* export async function organizationFaq() {
  const { data } = await axios.get(         
    process.env.BASE_URL + '/portal/faq',
    {headers:headersOption}         
  );
  return data?.data;
}; */

// token = token

// dash api = {
// hea tokrn
//}

// export const orgLogin = async (formdata) => {
//   const { data } = await axios.post(
//     process.env.ORG_API_URL + "/token",
//     {
//       username: formdata.username,
//       password: formdata.password,
//     },
//     { headers: { "Content-Type": "application/json" } }
//   );

//   return data;
// };

// export const register = async (postdata) => {
//   const {data} = await orgClient.post("/register",{
//     orgName: postdata.orgName,
//     username: postdata.username,
//     phone: postdata.phone,
//     orgType: postdata.orgType,
//     category_id: postdata.category_id,
//     password: postdata.password
//   });
//   return data;
// }

// export const orgLogin = async (postdata) => {
//   const {data} = await orgClient.post("/signin",{
//     username: postdata.username,
//     password: postdata.password
//   });
//   return data;
// }


// export const user = async (id) => {
//   const { data } = await orgClient.post("/profile",{id:id});
//   return data.data;
// };

export const categories = async () => {
  const { data } = await orgClient.post('/organizationCategory');
  return data?.data;
}

export const type = async (id) => {
  console.log('id : ',id);
  const { data } = await orgClient.post("/organizationType", { orgCatId: id });
  return data;
};

// export const categoriesByType = async (id) => {
//   const data = await orgClient.post("/organizationCategory");
//   return data;
// };

// export const type = async (id) => {
//   const data = await orgClient.post("/organizationType", { organizationId: id });
//   return data;
// };

export const holdings = async (id) => {
  const { data: { data } } = await orgClient.post("/holdings", { id: id });
  return data;
};

export const dhakhila = async (id) => {
  const { data: { data } } = await orgClient.post("/dhakhila", { id: id });
  return data;
};

// export const holdingDetails = async (id, holding) => {
//   const { data: { data } } = await orgClient.post("/organization/holdings/detail", { org_id: id, id: holding });
//   return data[0];
// };

export const khotianEntry = async (data) => {
  const response = await orgClient.post("/khotian/store", data);
  return response;
};

// export const setPassword = async (data) => {
//   const response = await orgClient.post("/setpassword", data);
//   return response;
// };

// export const updateOrgProfile = async (data) => {
//   const response = await orgClient.post("/update", data);
//   return response;
// };

// export const orgProfile = async (id) => {
//   const { data: { data } } = await orgClient.post("/profile", { id: id });
//   return data;
// };


export const orgDash = async (id) => {
  // destructure array of objects
  const { data: { data } } = await orgClient.post("/dashboard", { id: id });
  return data[0];

};

// dakhila/payment-request
// export async function orgPayment (req) {

//     const { data } = await axios.post(         
//       process.env.BASE_PAYMENT_URL + '/getPaymentReqWithPgForOrg', 
//       req       
//     );
//     return data;
  
// }

export async function orgPayment (req) {
  try {
    const { data } = await axios.post(         
      process.env.PAYMENT_BASE_URL + '/dakhila/payment-request', 
      req,         
      {headers:headersOption}         
    );
    return data;
  }catch(e) {
  }
}

export const categoryById = async (id) => {
  const { data: { data: { organizationType } } } = await orgClient.post("/organization/categories", { orgCategoryId: id });
  return organizationType;
}


export const typeById = async (id) => {
  const { data: { data: { organizationType } } } = await orgClient.post("/organization/types", { orgTypeId: id });
  return organizationType;
}

export const orgKhotian = async (id) => {
  const { data: { data } } = await orgClient.post("/khotian", { org_id: id });
  return data;
}

export const createKhotian = async (data) => {
  const response = await axios.post(
    process.env.ORG_API_URL + "/khotian/store",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response;
}