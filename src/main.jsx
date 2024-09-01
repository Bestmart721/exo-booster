import "core-js/stable";
import "regenerator-runtime/runtime";
import "intl-pluralrules";
import "whatwg-fetch";
import React from "react";
import ReactDOM from "react-dom/client";
// import App from './App.tsx'
import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { store } from "./store";
import { Provider } from "react-redux";
import MyErrorBoundary from "./layouts/MyErrorBoundary.jsx";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "flag-icons/css/flag-icons.min.css";
import "./index.css";
import "./axiosConfig.js";
import { SpeedInsights } from '@vercel/speed-insights/react';

import { LanguageProvider } from "./layouts/LanguageContext.jsx";
import { ToasterProvider } from "./layouts/ToasterContext.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import RootLayout from "./layouts/RootLayout.jsx";
import ErrorPage from "./pages/error-page";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home.jsx";
import Account from "./pages/Account.jsx";
import Referral from "./pages/Referral.jsx";
import Orders from "./pages/Orders.jsx";
import Wallet from "./pages/Wallet.jsx";
import Payment from "./pages/Payment.jsx";
import Affiliate from "./pages/Affiliate.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{
				path: "/auth",
				element: <AuthLayout />,
				children: [
					{
						path: "/auth/signup",
						element: <Signup />,
						// loader: loadSignupData,
					},
					{
						path: "/auth/signin",
						element: <Signin />,
					},
				],
			},
			{
				index: true,
				element: <Home />,
			},
			{
				path: "/account",
				element: <Account />,
			},
			{
				path: "/referral",
				element: <Referral />,
			},
			{
				path: "/orders",
				element: <Orders />,
			},
			{
				path: "/wallet",
				element: <Wallet />,
			},
			{
				path: "/payment",
				element: <Payment />,
			},
			{
				path: "/affiliate",
				element: <Affiliate />,
			},
			{
				path: "/privacy-policy",
				element: <PrivacyPolicy />,
			},
		],
		errorElement: import.meta.env.VITE_ENV !== "production" && <ErrorPage />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<div>
		<MyErrorBoundary>
			<Provider store={store}>
				<LanguageProvider>
					<I18nextProvider i18n={i18n}>
						<ToasterProvider>
							<RouterProvider router={router} />
							<SpeedInsights />
						</ToasterProvider>
					</I18nextProvider>
				</LanguageProvider>
			</Provider>
		</MyErrorBoundary>
	</div>
);
