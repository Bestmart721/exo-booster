import React, { useEffect, useState } from "react";
import {
	Link,
	Navigate,
	Outlet,
	useLocation,
	useNavigate,
} from "react-router-dom";
import {
	MDBBadge,
	MDBBtn,
	MDBContainer,
	MDBDropdown,
	MDBDropdownItem,
	MDBDropdownMenu,
	MDBDropdownToggle,
	MDBIcon,
	MDBListGroup,
	MDBListGroupItem,
	MDBModal,
	MDBModalBody,
	MDBModalContent,
	MDBModalDialog,
	MDBModalFooter,
	MDBNavbar,
	MDBNavbarBrand,
	MDBSpinner,
	MDBTabs,
} from "mdb-react-ui-kit";
import { useTranslation } from "react-i18next";
import { onAuthStateChanged } from "firebase/auth";
import {
	auth,
	fetchSupportContacts,
	fetchUserData,
	firebaseSignOut,
} from "../firebaseAuth";
import { useLanguage } from "./LanguageContext";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";
import {
	hideError,
	hideSupport,
	modalError,
	toggleDrawer,
} from "../store/appSlice";
import Drawer from "react-modern-drawer";
import { useMobileOrTabletMediaQuery } from "../responsiveHook";
// import { R } from "reactstrap";

const languages = {
	en: { name: "English", flag: "gb.svg" },
	fr: { name: "Français", flag: "fr.svg" },
};

const getFlagUrl = (flagCode) => `https://flagcdn.com/${flagCode}`;

export default function RootLayout() {
	const location = useLocation();
	const navigate = useNavigate();
	const { t, i18n } = useTranslation();
	const [loading, setLoading] = useState(true);
	const [supportContacts, setSupportContacts] = useState({});
	const { language, switchLanguage } = useLanguage();
	const user = useSelector((state) => state.auth.user);
	const supportModal = useSelector((state) => state.app.supportModal);
	const errorModal = useSelector((state) => state.app.errorModal);
	const modalText = useSelector((state) => state.app.modalText);
	const isOpen = useSelector((state) => state.app.drawer);
	const isMobileOrTablet = useMobileOrTabletMediaQuery();
	const dispatch = useDispatch();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				fetchUserData(user.uid).then((userData) => {
					dispatch(
						setUser({
							accessToken: user.accessToken,
							uid: user.uid,
							displayName: userData.username,
							balance: userData.balance,
							currency: userData.currency,
							discount: userData.discount,
							discountUsesLeft: userData.discount_uses_left,
						})
					);
				});
			} else {
				dispatch(setUser(null));
			}

			fetchSupportContacts()
				.then((data) => {
					setSupportContacts(data);
				})
				.catch((error) => {
					dispatch(modalError(error));
				})
				.finally(() => setLoading(false));
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

	const toggleDrawerIn = () => {
		dispatch(toggleDrawer());
	};

	return (
		<>
			<Drawer
				open={isOpen}
				onClose={() => dispatch(toggleDrawer())}
				direction="left"
				style={{ paddingTop: isMobileOrTablet ? "64px" : "83px", width: 200 }}
			>
				<MDBListGroup light small className="mb-4">
					<MDBTabs>
						<MDBListGroupItem
							action
							active={location === "home"}
							noBorders
							className="px-3"
							tag={Link}
							to="/"
							onClick={toggleDrawerIn}
						>
							Home
						</MDBListGroupItem>
						<MDBListGroupItem
							action
							active={location === "settings"}
							noBorders
							className="px-3"
							tag={Link}
							to="/account"
							onClick={toggleDrawerIn}
						>
							My Account
						</MDBListGroupItem>
						<MDBListGroupItem
							action
							active={location === "account"}
							noBorders
							className="px-3"
							tag={Link}
							to="/"
							onClick={toggleDrawerIn}
						>
							My Orders #
						</MDBListGroupItem>
						<MDBListGroupItem
							action
							active={location === "messages"}
							noBorders
							className="px-3"
							tag={Link}
							to="/"
							onClick={toggleDrawerIn}
						>
							Wallet #
						</MDBListGroupItem>
						<MDBListGroupItem
							action
							active={location === "settings"}
							noBorders
							className="px-3"
							tag={Link}
							to="/"
							onClick={toggleDrawerIn}
						>
							Referral program #
						</MDBListGroupItem>
					</MDBTabs>
				</MDBListGroup>
				<MDBContainer>
					<MDBBtn
						color="danger"
						block
						onClick={() => {
							signOut();
							dispatch(toggleDrawer());
						}}
					>
						Sign Out
					</MDBBtn>
				</MDBContainer>
			</Drawer>

			<MDBNavbar
				expand="lg"
				light
				bgColor="white"
				sticky
				className="shadow-none-"
			>
				<MDBContainer>
					<div className="d-flex align-items-center gap-2">
						{user && (
							<MDBBtn floating color="link" size={isMobileOrTablet && "sm"}>
								<MDBIcon
									icon="bars"
									color="primary"
									size="lg"
									onClick={() => dispatch(toggleDrawer())}
								/>
							</MDBBtn>
						)}
						{/* <MDBIcon fas icon="bars" className="me-3" /> */}
						<MDBNavbarBrand tag={Link} to="/">
							<img src="/logopng 1.png" className="logo-img" alt="logo" />
						</MDBNavbarBrand>
					</div>
					<div className="mb-lg-0 d-flex align-items-center flex-grow-0 w-auto gap-4 gap-md-5">
						{user && (
							<span
								className="cursor-pointer"
								// onClick={() => dispatch(toggleDrawer())}
							>
								<MDBBadge pill light color="warning">
									<MDBBtn
										floating
										style={{ margin: "-0.7em" }}
										size="sm"
										color="warning"
										className="me-1"
									>
										<MDBIcon fas icon="plus" color="white" />
									</MDBBtn>
									{user.balance?.toFixed(2)} {user.currency?.toUpperCase()}
								</MDBBadge>
							</span>
						)}
						{/* {user && (
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
						)} */}
						<MDBDropdown>
							<MDBDropdownToggle
								tag="a"
								className="nav-link language-dropdown"
								role="button"
							>
								<MDBBtn floating color="link">
									<img
										src={getFlagUrl(languages[language].flag)}
										alt={languages[language].name}
										width={28}
									/>
									{/* {i18n.language.toUpperCase()} */}
								</MDBBtn>
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

			<MDBModal
				tabIndex="-1"
				open={errorModal}
				onClose={() => dispatch(hideError())}
			>
				<MDBModalDialog centered style={{ maxWidth: 300 }}>
					<MDBModalContent>
						<MDBModalBody className="text-center py-5">
							<img src="/favcon 1.png" className="img-fluid mb-5" alt="logo" />
							<h3 className="mb-0">{t(modalText)}</h3>
						</MDBModalBody>
						<MDBModalFooter>
							<MDBBtn color="primary" onClick={() => dispatch(hideError())}>
								OK
							</MDBBtn>
						</MDBModalFooter>
					</MDBModalContent>
				</MDBModalDialog>
			</MDBModal>

			<MDBModal
				tabIndex="-1"
				open={supportModal}
				onClose={() => dispatch(hideSupport())}
			>
				<MDBModalDialog centered style={{ maxWidth: 400 }}>
					<MDBModalContent>
						<MDBModalBody className="text-center py-5">
							<img src="/favcon 1.png" className="img-fluid mb-5" alt="logo" />
							<h3 className="font-black">Have a problem?</h3>
							<div className="lead">Kindly contact us through email:</div>
							<div className="lead text-primary">
								<a href={`mailto:${supportContacts.email}`} target="_blank">
									{supportContacts.email}
								</a>
							</div>
							<div className="lead">Whatsapp:</div>
							<div className="lead text-primary">
								<a
									href={`https://wa.me/${supportContacts.whatsapp?.replace(
										/[^\d]/g,
										""
									)}`}
									target="_blank"
								>
									{supportContacts.whatsapp}
								</a>
							</div>
							<div className="lead">Or Telegram:</div>
							<div className="lead text-primary">
								<a
									href={`https://t.me/${supportContacts.telegram?.replace(
										/@/g,
										""
									)}`}
									target="_blank"
								>
									{supportContacts.telegram}
								</a>
							</div>
						</MDBModalBody>
						<MDBModalFooter>
							<MDBBtn color="primary" onClick={() => dispatch(hideSupport())}>
								OK
							</MDBBtn>
						</MDBModalFooter>
					</MDBModalContent>
				</MDBModalDialog>
			</MDBModal>
		</>
	);
}
