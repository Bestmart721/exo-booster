import React, { useEffect, useState } from "react";
import {
	Link,
	Navigate,
	Outlet,
	useLocation,
	useNavigate,
} from "react-router-dom";
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
import { useTranslation } from "react-i18next";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firebaseSignOut } from "../firebaseAuth";
import { useLanguage } from "./LanguageContext";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";
// import { R } from "reactstrap";

const languages = {
	en: { name: "English", flag: "us.svg" },
	fr: { name: "Français", flag: "fr.svg" },
};

const getFlagUrl = (flagCode) => `https://flagcdn.com/${flagCode}`;

export default function RootLayout() {
	const location = useLocation();
	const navigate = useNavigate();
	const { t, i18n } = useTranslation();
	// const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const { language, switchLanguage } = useLanguage();
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				console.log(user);
				user.displayName = user.email.split("@")[0];
				const { accessToken, displayName, email, uid } = user;
				dispatch(setUser({ accessToken, displayName, email, uid }));
			} else {
				dispatch(setUser(null));
			}
			setLoading(false);
		});

		// Cleanup subscription on unmount
		return () => unsubscribe();
	}, []);

	const signOut = () => {
		firebaseSignOut().then(() => {
			dispatch(setUser(null));
			navigate("/auth");
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
					{/* <MDBIcon fas icon="bars" className="me-3" /> */}
					<MDBNavbarBrand tag={Link} to="/">
						<img src="/logopng 1.png" className="logo-img" alt="logo" />
					</MDBNavbarBrand>
					<div className="mb-lg-0 d-flex flex-grow-0 w-auto gap-4 gap-md-5">
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
						<MDBDropdown>
							<MDBDropdownToggle tag="a" className="nav-link" role="button">
								<img
									src={getFlagUrl(languages[language].flag)}
									alt={languages[language].name}
									width={28}
									className="mb-1"
								/>
								{/* {i18n.language.toUpperCase()} */}
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
					</div>
				</MDBContainer>
			</MDBNavbar>

			<>
				{!loading &&
					(user && location.pathname.includes("/auth") ? (
						<Navigate to={"/"} />
					) : !user && !location.pathname.includes("/auth") ? (
						<Navigate to={"/auth"} />
					) : (
						<Outlet />
					))}
			</>

			{loading && (
				<div className="d-flex justify-content-center align-items-center position-fixed spinner-wrapper">
					<MDBSpinner color="white" style={{ width: "3rem", height: "3rem" }}>
						<span className="visually-hidden">Loading...</span>
					</MDBSpinner>
				</div>
			)}
		</>
	);
}
