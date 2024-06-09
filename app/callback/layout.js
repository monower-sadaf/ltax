import "@/app/globals.css";
import localFont from "next/font/local";
// Font files can be colocated inside of `pages`
export const Inter = localFont({ 
  src: '../../public/assets/fonts/Inter-Regular.ttf',
  fallback: 'system-ui',
  preload: false,
  display: "swap",
  weight:  "400"
});

export const ubuntu = localFont({ 
  src: '../../public/assets/fonts/Ubuntu-Regular.ttf',
  fallback: 'system-ui',
  preload: false,
  display: "swap",
  weight: "400"
});

export const tiroBangla = localFont({ 
  src: '../../public/assets/fonts/TiroBangla-Regular.ttf',
  fallback: 'arial',
  preload: false,
  display: "swap",
  weight: "400",
});

export const metadata = {
  title: 'ভূমি উন্নয়ন কর',
  icons: {
    icon: '/assets/images/favicon.png',
  },
};

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
