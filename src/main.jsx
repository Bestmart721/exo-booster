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
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import "bootstrap/scss/bootstrap.scss";
import "./index.css";

import { LanguageProvider } from "./layouts/LanguageContext.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import RootLayout from "./layouts/RootLayout.jsx";
import ErrorPage from "./pages/error-page";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home.jsx";

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
		],
		// errorElement: <ErrorPage />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<LanguageProvider>
			<I18nextProvider i18n={i18n}>
				<RouterProvider router={router} />
			</I18nextProvider>
		</LanguageProvider>
	</Provider>
);
