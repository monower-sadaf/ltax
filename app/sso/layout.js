

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
