// 'use client'
// import React,{useEffect, useState } from 'react';
// import axios from 'axios';

// const req = ({
//     'username': 'samsul',
//     'password': 'mhl@123@2019'
// });




// const generateToken = async (req) => {
  
//   const [apitoken, setApiToken] = useState('');

//   useEffect(() => {
//     const fetchToken = async () => {
//       try {
//         const response = await axios.post('http://localhost/ldTax/api/token',req);
//         console.log(response.data);
//         const data = response.data;
//         // Set the cookie
//         setToken(setApiToken);
//         const token = data.token;
//         setCookie("token", token, {
//           path: "/",
//           maxAge: 3600, // Expires after 1hr
//           sameSite: true,
//         });
//       } catch (error) {
//         console.error('Error fetching token:', error);
//       }
//     };

//     fetchToken();
//   }, []);
// }

// export default generateToken;



