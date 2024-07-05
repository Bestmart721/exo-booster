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
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
// import "bootstrap/scss/bootstrap.scss";
import "./index.css";

import Root from "./routes/root";
import AuthLayout from "./layouts/AuthLayout.jsx";
import ErrorPage from "./pages/error-page";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { LanguageProvider } from "./layouts/LanguageContext.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				index: true,
				element: <AuthLayout/>, // Redirect from root to /auth/signin
			},
			{
				path: "/auth",
				element: <AuthLayout />,
				children: [
					{
						index: true, // This sets the default child route for /auth
						element: <Signin />,
					},
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
				path: "/home",
				element: <div>Home</div>,
			}
		],
		// errorElement: <ErrorPage />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<LanguageProvider>
		<I18nextProvider i18n={i18n}>
			<RouterProvider router={router} />
		</I18nextProvider>
		</LanguageProvider>
	</React.StrictMode>
);
