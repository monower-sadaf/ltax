import { parseCookies, setCookie } from 'nookies';
import  axios  from 'axios';

// Fetch token
async function generate_token(res){
  const req = ({
    username: process.env.USERNAME,
    password: process.env.PASSWORD
  });

  
  
  const resp = await axios.post(process.env.BASE_TOKEN_URL,req);

  if(resp.data.status === '200'){
    const cookieOptions = {
      expire_on: resp.data.expire_on
    };
    // setCookie( {res},'token', resp.data.token_type+' '+resp.data.token, cookieOptions);
    setCookie( {res},'ptoken', resp.data.token_type+' '+resp.data.token, cookieOptions);
    return resp.ptoken;
  }else{
    setCookie( {res},'ptoken', '', '');
    return ;
  }
  
}

export const getTokenFromCookie = () => {
  const cookies = parseCookies();
  if(cookies.ptoken === '' || cookies.ptoken === undefined){
    generate_token();
  }
  return cookies.ptoken;
};

export const getCitizenFromCookie = () => {
  const cookies = parseCookies();
  let citizen = '';
  if(window === '' || window !== undefined){
    citizen = JSON.parse(cookies.citizen);
  }
  return citizen;
};

// org
// Fetch token
async function generate_org_token(res){
  const req = ({
    username: process.env.ORG_USERNAME,
    password: process.env.ORG_PASSWORD
  });
  
  const resp = await axios.post(process.env.ORG_API_URL,req);

  if(resp.data.status === 200){
    // const cookieOptions = {
    //   expire_on: resp.data.expire_on
    // };
    setCookie( {res},'orgtoken', resp.data.token_type+' '+resp.data.token, '');
    return resp.token;
  }else{
    setCookie( {res},'orgtoken', '', '');
    return ;
  }
  
}

export const getOrgTokenFromCookie = () => {
  const cookies = parseCookies();
  if(cookies.orgtoken === '' || cookies.orgtoken === undefined){
    generate_org_token()
  }
  return cookies.orgtoken;
};

export const getOrgFromCookie = () => {
  const cookies = parseCookies();
  let orgtoken = '';
  if(window === '' || window !== undefined){
    orgtoken = JSON.parse(cookies.orgtoken);
  }
  return orgtoken;
};
