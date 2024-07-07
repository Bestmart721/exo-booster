import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
	MDBContainer,
	MDBDropdown,
	MDBDropdownItem,
	MDBDropdownMenu,
	MDBDropdownToggle,
	MDBIcon,
	MDBNavbar,
	MDBNavbarBrand,
	MDBSpinner,
} from "mdb-react-ui-kit";
import {
	useMobileMediaQuery,
	useMobileOrTabletMediaQuery,
} from "../responsiveHook";
import { useTranslation } from "react-i18next";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firebaseSignOut } from "../firebaseAuth";
import { useLanguage } from "./LanguageContext";

const languages = {
	en: { name: "English", flag: "gb.svg" },
	fr: { name: "Français", flag: "fr.svg" },
};

const getFlagUrl = (flagCode) => `https://flagcdn.com/${flagCode}`;

export default function RootLayout() {
	const navigate = useNavigate();
	const { t, i18n } = useTranslation();
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const { language, switchLanguage } = useLanguage();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				navigate("/home");
				user.displayName = user.email.split("@")[0];
				setUser(user);
			} else {
				navigate("/auth");
				setUser(null);
			}
			setLoading(false);
		});

		// Cleanup subscription on unmount
		return () => unsubscribe();
	}, []);

	const signOut = () => {
		firebaseSignOut().then(() => {
			setUser(null);
			navigate("/");
		});
	};

	return (
		<>
			<MDBNavbar
				expand="lg"
				light
				bgColor="white"
				sticky
				className="shadow-none-"
			>
				<MDBContainer>
					<MDBNavbarBrand tag={Link} to="/">
						<img src="/logopng 1.png" className="logo-img" alt="logo" />
					</MDBNavbarBrand>
					<div className="mb-lg-0 d-flex flex-grow-0 w-auto gap-4 gap-md-5">
						<MDBDropdown>
							<MDBDropdownToggle tag="a" className="nav-link" role="button">
								<img
									src={getFlagUrl(languages[language].flag)}
									alt={languages[language].name}
									width={28}
									className="mb-1 me-2"
								/>
								{i18n.language.toUpperCase()}
							</MDBDropdownToggle>
							<MDBDropdownMenu responsive="end">
								{Object.entries(languages).map(([code, { name, flag }]) => (
									<MDBDropdownItem
										key={code}
										link
										href={`#${code}`}
										onClick={(e) => {
											switchLanguage(code);
											i18n.changeLanguage(code);
										}}
									>
										<img
											src={getFlagUrl(flag)}
											alt={name}
											width={28}
											className="me-4 mb-1"
										/>
										{name}
									</MDBDropdownItem>
								))}
							</MDBDropdownMenu>
						</MDBDropdown>
						{user && (
							<MDBDropdown>
								<MDBDropdownToggle tag="a" className="nav-link" role="button">
									{user.displayName}
								</MDBDropdownToggle>
								<MDBDropdownMenu responsive="end">
									<MDBDropdownItem link>Action</MDBDropdownItem>
									<MDBDropdownItem link>Another action</MDBDropdownItem>
									<MDBDropdownItem divider />
									<MDBDropdownItem link onClick={signOut}>
										<MDBIcon fas icon="sign-out-alt" className="me-2" />
										{t("Sign Out")}
									</MDBDropdownItem>
								</MDBDropdownMenu>
							</MDBDropdown>
						)}
					</div>
				</MDBContainer>
			</MDBNavbar>

			<MDBContainer>
				<Outlet />
			</MDBContainer>

			{loading && (
				<div className="d-flex justify-content-center align-items-center position-fixed spinner-wrapper">
					<MDBSpinner color="primary" style={{ width: "3rem", height: "3rem" }}>
						<span className="visually-hidden">Loading...</span>
					</MDBSpinner>
				</div>
			)}
		</>
	);
}
