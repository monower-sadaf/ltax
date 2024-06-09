import axios from "axios";
import { getTokenFromCookie } from "../_utils/cookieUtils";
import { cache } from "react";

const portalApi = process.env.PORTAL_API;
const portalClient = axios.create({
  baseURL: portalApi,
  headers: {
    accept: "application/json",
    "content-type": "application/json",
  },
  cancelToken: axios.CancelToken.source().token,
});

const token = getTokenFromCookie();
const ptoken = getTokenFromCookie();

const CancelToken = axios.CancelToken;
const cancelTokenSource = CancelToken.source();

const headersOption = {
  Authorization: token,
  "content-type": "application/json",
};

const portalheadersOption = {
  Authorization: ptoken,
  "content-type": "application/json",
};

export const Menulist = cache(
  async () => {
    const {
      data: { data },
    } = await portalClient.get("/menu-lists");
    return data;
  },
  { maxAge: 1000 * 60 * 60 }
);

export const Sliders = cache(
  async () => {
    const {
      data: { data },
    } = await portalClient.get("/sliders");
    return data;
  },
  { maxAge: 1000 * 60 * 60 }
);

export const Notices = cache(
  async () => {
    const {
      data: { data },
    } = await portalClient.get("/notices");
    return data;
  },
  { maxAge: 1000 * 60 * 60 }
);

export const HomeStatistics = async () => {
  const request = [];
  const data = await fetch(
    `${process.env.BASE_URL}/portal/statistics`,
    { request },
    {
      headers: headersOption,
    }
  )
    .then((res) => res.json())
    .then((res) => res.data);
  return data;
};

export const getTable1Data = async (category, id, title, testqr) => {
  let response = [];
  if (category === "divisions") {
    response = await fetch(`${process.env.BASE_URL}/portal/listData`, {
      headersOption,
      method: "POST",
    }).then((res) => res.json()).catch((error) => console.log(error));
  } else {
    const req = {
      [testqr]: parseInt(id),
    };
    response = await fetch(`${process.env.BASE_URL}/portal/listData`, req, {
      headersOption,
      method: "POST",
    }).then((res) => res.json()).catch((error) => console.log(error));
  }

  return response?.data;
};

export const Services = async () => {
  const {
    data: { data },
  } = await portalClient.get("/services");
  return data;
};

export const appsAndSoftwares = async () => {
  const {
    data: { data },
  } = await portalClient.get("/apps-and-softwares");
  return data;
};

export const Videos = async () => {
  const {
    data: { data },
  } = await portalClient.get("/land-related-video-links");
  return data;
};

export const recentUpdates = async () => {
  const {
    data: { data },
  } = await portalClient.get("/recent-updates");
  return data;
};

export const Faqs = async () => {
  const {
    data: { data },
  } = await portalClient.get("/faqs");
  return data;
};

export const vumiShebaForm = cache(
  async () => {
    const {
      data: { data },
    } = await portalClient.get("/vhumi_sheba_forms");
    return data;
  },
  { maxAge: 1000 * 60 * 60 }
);

export const ainObidhi = cache(
  async () => {
    const {
      data: { data },
    } = await portalClient.get("/ayinbidhis");
    return data;
  },
  { maxAge: 1000 * 60 * 60 }
);

export const poriPotro = async () => {
  const {
    data: { data },
  } = await portalClient.get("/poripotro_proggapons");
  return data;
};

export const manuals = async () => {
  const {
    data: { data },
  } = await portalClient.get("/manuals");
  return data;
};

export const nitimala = async () => {
  const {
    data: { data },
  } = await portalClient.get("/nitimalas");
  return data;
};

// const logoutHeadersOption = {
//   'Authorization': token,
//   'content-type': 'application/json'
// };

// export async function Logout(user) {
//     try {
//         const { data } = await axios.get(`${process.env.SSO_URL}/api/logmeout`,{
//             headers: logoutHeadersOption
//         });
//         console.log(data.data);
//     } catch (err) {

//     }
// }

export async function CitizenKhotianList(id, owner_type) {
  try {
    if (owner_type == 1) {
      const { data } = await axios.post(
        process.env.BASE_URL_V1 + "/khotian",
        {
          id: id,
          owner_type: 1,
        },
        { headers: headersOption }
      );
      return data?.data;
    } else {
      const { data } = await axios.post(
        process.env.BASE_URL_V1 + "/khotian",
        {
          id: id,
          owner_type: 0,
        },
        { headers: headersOption }
      );
      return data?.data;
    }
  } catch (e) {}
}

// editProfile
export async function EditProfile(req) {
  try {
    const { data } = await axios.post(
      process.env.BASE_URL + "/api/editProfile",
      req,
      { headers: headersOption }
    );
    return data;
  } catch (e) {}
}

export async function CitizenDakhilaList(id, owner_type) {
  try {
    let type = owner_type == 1 ? 1 : 0;
    const { data } = await axios.post(
      process.env.BASE_URL_V1 + "/dhakhila",
      {
        id: id,
        owner_type: type,
      },
      { headers: headersOption }
    );
    return data?.data;
  } catch (e) {
    return "ERROR: " + e;
  }
}

export async function CitizenHolding(id, owner_type) {
  Object.assign(headersOption, {
    cancelToken: cancelTokenSource.token,
  });

  try {
    if (owner_type == 1) {
      const { data } = await axios.post(
        process.env.BASE_URL_V1 + "/holding",
        {
          id: id,
          owner_type: owner_type,
        },
        {
          headers: headersOption,
        }
      );
      return data?.data;
    } else {
      const { data } = await axios.post(
        process.env.BASE_URL_V1 + "/holding",
        { id: id, owner_type: 0 },
        {
          headers: headersOption,
        }
      );
      return data?.data;
    }
  } catch (e) {}
}

export async function citizenHoldingDetails(req) {
  Object.assign(headersOption, {
    cancelToken: cancelTokenSource.token,
  });
  const { data } = await axios.post(
    process.env.BASE_URL_V1 + "/citizenHoldingDetails",
    { holdingId: req },
    { headers: headersOption }
  );
  return data?.data;
}

export async function DakhilaDetails(req) {
  const { data } = await axios.post(
    process.env.PAYMENT_BASE_URL + "/dakhila/dakhilaPrint",
    { id: req.id },
    { headers: headersOption }
  );
  return data;
}

export async function GetDivisions() {
  const { data } = await axios.get(process.env.BASE_URL_V1 + "/getDivisions/", {
    headers: headersOption,
  });

  return data?.data;
}

export async function GetDistricts(districtID) {
  const { data } = await axios.get(
    process.env.BASE_URL_V1 + "/getDistricts/" + districtID,
    { headers: headersOption }
  );

  return data?.data;
}

export async function GetUpazila(upazilaID) {
  const { data } = await axios.get(
    process.env.BASE_URL_V1 + "/getUpazilas/" + upazilaID,
    { headers: headersOption }
  );

  return data?.data;
}

export async function GetOffice(upazilaID) {
  const { data } = await axios.get(
    process.env.BASE_URL_V1 + "/getOffices/" + upazilaID,
    { headers: headersOption }
  );

  return data?.data;
}

export async function GetMoujasByOffices(officeID) {
  const { data } = await axios.get(
    process.env.BASE_URL_V1 + "/getMoujasByOffices/" + officeID,
    { headers: headersOption }
  );

  return data?.data;
}

export async function GetMouja(MoujaID) {
  const { data } = await axios.get(
    process.env.BASE_URL_V1 + "/getMoujasByUpazila/" + MoujaID,
    { headers: headersOption }
  );

  return data?.data;
}

export async function khotianEntry(req) {
  Object.assign(headersOption, {
    "content-type": "multipart/form-data",
  });

  if (req?.owner_type == 1) {
    const { data } = await axios.post(
      process.env.BASE_URL_V1 + "/khotianEntry",
      req,
      { headers: headersOption }
    );
    return data;
  } else {
    const { data } = await axios.post(
      process.env.BASE_URL_V1 + "/khotianEntry",
      req,
      { headers: headersOption }
    );
    return data;
  }
}

// faq
export async function FaqList() {
  const { data } = await axios.get(process.env.BASE_URL + "/portal/faq", {
    headers: headersOption,
  });
  return data?.data;
}

// holding req = id
export async function Complain(id) {
  const { data } = await axios.get(
    process.env.BASE_URL_V1 + "/holding-complain-list?user_id=" + id,
    {},
    { headers: headersOption }
  );
  return data?.data;
}

// complain id
export async function Feedback(id, cancelTokenSource) {
  const { data } = await axios.get(
    process.env.BASE_URL_V1 + "/holding-complain-feedback?id=" + id,
    {},
    { headers: headersOption },
    { cancelToken: cancelTokenSource.token }
  );
  return data?.data;
}

// Delete complain id
export async function DeleteComplain(id) {
  const { data } = await axios.post(
    process.env.BASE_URL_V1 + "/delete-complain/",
    { id: id },
    { headers: headersOption }
  );
  return data?.data;
}

// Delete khotian id
export async function DeleteKhotian(id) {
  const { data } = await axios.post(
    process.env.BASE_URL_V1 + "/khotianDelete",
    { id: id },
    { headers: headersOption }
  );
  return data?.data;
}

/* request body
 */
// editProfile
/*
export async function Payment (req) {
  try {
    const { data } = await axios.post(         
      process.env.BASE_PAYMENT_URL + '/getPaymentReqWithPg', 
      req,         
      {headers:headersOption}         
    );
    return data;
  }catch(e) {
       
  }
}
*/

export async function Payment(req) {
  try {
    const { data } = await axios.post(
      process.env.PAYMENT_BASE_URL + "/dakhila/payment-request",
      req,
      { headers: headersOption }
    );
    return data;
  } catch (e) {}
}

export async function BatchPaymentReq(req) {
  try {
    const { data } = await axios.post(
      process.env.PAYMENT_BASE_URL + "/dakhila/batch-payment-request-log",
      req,
      { headers: headersOption }
    );
    return data;
  } catch (e) {}
}

// citizenBarChartData
export async function citizenBarChartData(req) {
  const { data } = await axios.post(
    process.env.BASE_URL + "/api/citizenBarChartData",
    { nid: req },
    { headers: headersOption }
  );
  return data?.data;
}

export async function complainCount(req) {
  const { data } = await axios.post(
    process.env.BASE_URL + "/api/complainCount",
    { username: req },
    { headers: headersOption }
  );
  return data?.data;
}

export const Faq = async () => {
  const { data } = await axios.get(process.env.BASE_URL + "/portal/faq", {
    headersOption,
  });
  return data?.data;
};

export async function StatsData(req) {
  const { data } = await axios.post(
    process.env.BASE_URL_V1 + "/dashboard",
    { id: req },
    { headers: headersOption }
  );
  return data?.data;
}

export async function CreateComplain(req) {
  Object.assign(headersOption, {
    "content-type": "multipart/form-data",
  });

  const { data } = await axios.post(
    process.env.BASE_URL_V1 + "/create-complain-holding",
    req,
    { headers: headersOption }
  );
  return data;
}

export const citizenSignup = async (req) => {
  const { data } = await axios.post(
    process.env.BASE_URL + "/portal/signup",
    req,
    { headers: headersOption }
  );

  return data;
};

// OTC
// Pending (OTC) List
export async function PendingOtc(nid = null, dob = null) {
  const { data } = await axios.post(
    process.env.PAYMENT_BASE_URL + "/Api/pendingOtcList",
    { nid: nid, dob: dob },
    {
      headers: {
        Authorization: ptoken,
        "content-type": "multipart/form-data",
      },
    },
    { cancelToken: cancelTokenSource.ptoken }
  );
  return data?.data;
}

export async function MakeChallanVerify(request_id = null) {
  const { data } = await axios.post(
    process.env.PAYMENT_BASE_URL + "/Api/challanVerification",
    { req_id: request_id },
    {
      headers: {
        Authorization: ptoken,
        "content-type": "multipart/form-data",
      },
    },
    { cancelToken: cancelTokenSource.token }
  );
  return data?.data;
}

// Delete OTC
export async function DeleteChallan(request_id = null) {
  const { data } = await axios.post(
    process.env.PAYMENT_BASE_URL + "/api/otcDelete",
    { req_id: request_id },
    {
      headers: {
        Authorization: ptoken,
        "content-type": "multipart/form-data",
      },
    },
    { cancelToken: cancelTokenSource.token }
  );
  return data?.data;
}

// get profile image
export async function GetProfileImage(user_id) {
  const { data } = await axios.post(
    process.env.SSO_LIVE_URL + "/user/profile/image",
    { user_id: user_id },
    { headers: headersOption }
  );
  return data;
}

// get profile
export async function GetProfile(user_id) {
  const { data } = await axios.post(
    process.env.SSO_LIVE_URL + "/user/details",
    { user_id: user_id },
    { headers: headersOption }
  );
  return data;
}

// get parent organization search
export async function SearchParentOrganizationByUsername(username) {
  const { data } = await axios.post(
    process.env.SSO_LIVE_URL + "/api/organization/search",
    {
      username: username,
    },
    { headers: headersOption }
  );
  return data;
}

// get parent organization
// get parent organization search
export async function GetParentOrganization(req) {
  const { data } = await axios.get(
    process.env.BASE_URL_V1 + "/getParentOrganization/" + req,
    {},
    { headers: headersOption }
  );
  return data;
}

// send request for organization
export async function SendRequestToParentOrg(params) {
  const { data } = await axios.post(
    process.env.BASE_URL_V1 + "/requestorganization",
    {
      id: params?.id,
      org_id: params?.org_id,
      username: params?.username,
      child_username: params?.child_username,
      child_name: params?.child_name,
      child_phone: params?.child_phone,
      org_name: params?.org_name,
    },
    { headers: headersOption }
  );
  return data;
}

// get included organization
export async function GetRequestedOrg(org_id) {
  const { data } = await axios.post(
    process.env.BASE_URL_V1 + "/getIncludedOrg",
    { org_id: org_id },
    { headers: headersOption }
  );
  return data;
}

export async function Notification(id) {
  const { data } = await axios.post(
    `${process.env.OFFICE_URL}/api/notification/citizen/list`,
    { user_id: id },
    { headers: headersOption }
  );
  return data;
}

export async function MarkAsReadNotification(req) {
  const data = axios.post(
    `${process.env.OFFICE_URL}/api/notification/citizen/read`,
    req,
    { headers: headersOption }
  );
  return data;
}

export async function PaymentHistory(req) {
  const data = axios.post(
    `${process.env.BASE_URL_V1}/paymentHistory`,
    { id: req.data },
    { headers: headersOption }
  );
  return data;
}

export async function GetPaymentDetailsByDakhila(req) {
  const data = axios.get(
    `${process.env.BASE_URL_V1}/paymentDetails/${req}`,
    {},
    { headers: headersOption }
  );
  return data;
}

export async function ApproveIncludedHolding(req) {
  let parent_org_id = req.parent_org_id;
  let child_org_id = req.child_org_id;

  const { data } = await axios.get(
    process.env.BASE_URL_V1 +
      "/approve-organization/" +
      parent_org_id +
      "/" +
      child_org_id,
    {},
    { headers: headersOption }
  );
  return data;
}

export async function HoldingByFiltering(req) {
  const { data } = await axios.post(
    process.env.BASE_URL_V1 + "/holding-list-by-location",
    req,
    { headers: headersOption }
  );

  return data;
}
