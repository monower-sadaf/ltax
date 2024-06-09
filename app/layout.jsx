import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import localFont from "next/font/local";
export const metadata = {
  title: "ভূমি উন্নয়ন কর",
  description: "Enhancement of Bangla Language Project",
  charSet: "UTF-8",
  httpEquiv: "X-UA-Compatible",
  content: "IE=edge",
  name: "viewport",
  content: "width=device-width, initial-scale=1.0",
  icons: {
    icon: "/assets/images/favicon.png",
  },
};
// Font files can be colocated inside of `pages`
export const Inter = localFont({ 
  src: '../public/assets/fonts/Inter-Regular.ttf',
  fallback: 'system-ui',
  preload: false,
  display: "swap",
  weight:  "400"
});
export const ubuntu = localFont({ 
  src: '../public/assets/fonts/Ubuntu-Regular.ttf',
  fallback: 'system-ui',
  preload: false,
  display: "swap",
  weight: "400"
});
export const tiroBangla = localFont({ 
  src: '../public/assets/fonts/TiroBangla-Regular.ttf',
  fallback: 'arial',
  preload: false,
  display: "swap",
  weight: "400",
});
export const kalpurush = localFont({ 
  src: '../public/assets/fonts/Kalpurush/kalpurush.ttf',
  fallback: 'arial',
  preload: false,
  display: "swap",
  weight: "400",
});
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={kalpurush.className}>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
