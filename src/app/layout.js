import "./globals.css";
import "swiper/css";
import "swiper/css/bundle";
import "react-toastify/dist/ReactToastify.css";
import "react-photo-view/dist/react-photo-view.css";
import "react-circular-progressbar/dist/styles.css";

import "@/assets/css/animate.css";
import "@/assets/css/font-awesome.min.css";
import "@/assets/css/flaticon-set.css";

import "@/assets/css/nice-select.css";
import "@/assets/css/validnavs.css";
import "@/assets/css/helper.css";
import "@/assets/css/unit-test.css";
import "@/assets/css/style.css";

import { ToastContainer } from "react-toastify";
import { Manrope, Outfit } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"] });
const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Tag Rides - Ride-Sharing Serivce -",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${outfit.className} ${manrope.className}`}
      >
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
