const webpack = require('webpack');

/** @type {import("next").NextConfig} **/

const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ['js', 'jsx', 'mdx'],
  env: {
    USERNAME: 'samsul',
    PASSWORD: 'mhl@123@2019',
    LOCAL_BASE_TOKEN_URL: 'https://localhost/ldTax/api/token',
    LOCAL_BASE_URL: 'https://localhost/ldTax',
    BASE_TOKEN_URL: 'https://devldtax.mysoftheaven.com/api/token',
    BASE_URL: 'https://devldtax.mysoftheaven.com',
    PAYMENT_BASE_URL: 'https://dakhila-v2.limslrb.com',
    BASE_URL_V1: 'https://ldtv2dev.apimanager.mysoftheaven.com/api/v1',
    BASE_URL_V1_BASE: 'https://ldtv2dev.apimanager.mysoftheaven.com',
    BASE_PAYMENT_URL: 'https://devldtax.mysoftheaven.com/paymentapi',
    LDTAX_PORTAL_BASE: 'http://localhost:3000',
    PORTAL_API: 'https://devldtax-portal-admin-api.mysoftheaven.com/api',
    SSO_URL: 'http://127.0.0.1:8080',
    SSO_LIVE_URL: 'https://idp-devsso.land.gov.bd',
    SSO_CLIENT_ID: '9aa4673b-6923-4855-9fc9-ff56b04dbdf3',
    SSO_SECRET: 'DfSqhod28T03Kjfz3dkbaP1GWj0apPaHt6gBxOQ1',
    SSO_AUTHORIZE_URL: 'http://127.0.0.1:8080/oauth/authorize?',
    SSO_REDIRECT_URI: 'http://localhost:3000/api/callback',
    SSO_TOKEN_URL: 'http://127.0.0.1:8080/oauth/token',
    LOGIN_URL: '/sso',
    OFFICE_URL: 'https://ldtv2dev.mysoftheaven.com',
    OFFICE_LOGIN_URL: 'http://ldtv2dev.mysoftheaven.com/login',
    ORG_API_URL: 'https://ldtaxorgapi.mysoftheaven.com/api',
    ORG_USERNAME: 'LdtaxOrg1',
    ORG_PASSWORD: 'api@ldtaxOrg@2024',
  },
  webpack: (config) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
      }),
    );
    return config;
  },
  images: {
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'devldtax-portal-admin-api.mysoftheaven.com',
      },
      {
        protocol: 'https',
        hostname: 'land.gov.bd',
      },
      {
        protocol: 'https',
        hostname: 'mysoftheaven.com',
      },
      
      {
        protocol: 'https',
        hostname: 'beta-idp.stage.mygov.bd',
      },

      {
        protocol: 'https',
        hostname: 'idp-devsso.land.gov.bd',
      },
      
    ]
    
  },
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=9999999999, must-revalidate',
          }
        ],
      },
    ]
  },
}

module.exports = nextConfig;

