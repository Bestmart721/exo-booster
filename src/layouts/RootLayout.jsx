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
	MDBCardLink,
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
import { onAuthStateChanged, onIdTokenChanged } from "firebase/auth";
import {
	auth,
	docRef,
	fetchTotalOrders,
	fetchUserData,
	firebaseSignOut,
} from "../firebaseAPI";
import { useLanguage } from "./LanguageContext";
import { useSelector, useDispatch } from "react-redux";
import { setTmpUser, setUser, unsetUser } from "../store/authSlice";
import {
	fetchSupportContactsThunk,
	hideError,
	hideSupport,
	modalError,
	setServices,
	setTotalOrdersCount,
	showSupport,
	toggleDrawer,
} from "../store/appSlice";
import Drawer from "react-modern-drawer";
import { useMobileOrTabletMediaQuery } from "../responsiveHook";
import { onSnapshot } from "firebase/firestore";
import axios from "axios";
import { useToaster } from "./ToasterContext";

const languages = {
	en: { name: "English", flag: "gb" },
	fr: { name: "Français", flag: "fr" },
};

export default function RootLayout() {
	const { loading: appLoading, contactInfo } = useSelector(({ app }) => app);

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
	const tmpUser = useSelector((state) => state.auth.tmpUser);
	const dispatch = useDispatch();
	const { notify } = useToaster();

	useEffect(() => {
		const viewport = document.getElementById("root");
		document.body.scrollTop = 0;
		viewport.scrollTop = 0;
	}, [location.pathname]);

	useEffect(() => {
		if (JSON.parse(localStorage.getItem("user"))) {
			dispatch(setTmpUser(JSON.parse(localStorage.getItem("user"))));
		} else {
			dispatch(unsetUser());
		}

		dispatch(fetchSupportContactsThunk());
	}, [dispatch]);

	useEffect(() => {
		if (tmpUser) {
			setLoading(true);
			// setUser(tmpUser);
			const unsubscribe = onAuthStateChanged(auth, (user) => {
				if (user) {
					fetchUserData(user.uid)
						.then((userData) => {
							dispatch(
								setUser({
									...userData,
									accessToken: user.accessToken,
									uid: user.uid,
									last_auth: userData.last_auth?.toDate().toISOString(),
									latest_purchase_date: userData.latest_purchase_date
										?.toDate()
										.toISOString(),
									created_at: userData.created_at.toDate().toISOString(),
								})
							);

							axios
								.post(
									`https://getcategoriesandservices-l2ugzeb65a-uc.a.run.app/`,
									{
										userId: user.uid,
										userCurrency: userData.currency,
									},
									{
										headers: {
											Authorization: `Bearer ${user.accessToken}`,
										},
									}
								)
								.then((response) => {
									dispatch(setServices(response.data.data));
								})
								.catch((error) => {
									// dispatch(
									// 	modalError(
									// 		t("Check your internet connection and reload the page.")
									// 	)
									// );
									dispatch(
										setServices({
											error: t(
												"Check your internet connection and reload the page."
											),
										})
									);
								})
								.finally(() => {
									setLoading(false);
								});
						})
						.catch((error) => {
							dispatch(modalError(t(error)));
						})
						.finally(() => {
							setLoading(false);
						});

					fetchTotalOrders().then((data) => {
						dispatch(setTotalOrdersCount(data.count));
					});
				} else {
					dispatch(unsetUser());
					setLoading(false);
				}
			});
			// Cleanup subscription on unmount
			return unsubscribe;
		} else {
			setLoading(false);
		}
	}, [tmpUser]);

	useEffect(() => {
		if (user?.uid) {
			const unsubscribe1 = onIdTokenChanged(auth, (tokenUser) => {
				if (tokenUser) {
					tokenUser.getIdToken().then((accessToken) => {
						dispatch(
							setUser({
								...user,
								accessToken,
							})
						);
					});
				} else {
					dispatch(unsetUser());
				}
			});
			const unsubscribe2 = onSnapshot(docRef(user.uid), (doc) => {
				const userData = doc.data();
				dispatch(
					setUser({
						displayName: userData.username,
						balance: userData.balance,
						affiliate_balance: userData.affiliate_balance,
						currency: userData.currency,
						discount: userData.discount,
						discountUsesLeft: userData.discount_uses_left,
					})
				);
			});
			return () => {
				unsubscribe1();
				unsubscribe2();
			};
		}
	}, [user?.uid]);

	const signOut = () => {
		firebaseSignOut().then(() => {
			dispatch(unsetUser());
			// navigate("/auth");
		});
	};

	const toggleDrawerIn = () => {
		dispatch(toggleDrawer());
	};

	function formatNumber(num = 0) {
		return num.toLocaleString("en");
		// if (num >= 1e12) {
		// 	return (num / 1e12).toFixed(2) + "T";
		// } else if (num >= 1e9) {
		// 	return (num / 1e9).toFixed(2) + "B";
		// } else if (num >= 1e6) {
		// 	return (num / 1e6).toFixed(2) + "M";
		// } else if (num >= 1e3) {
		// 	return (num / 1e3).toFixed(2) + "K";
		// } else {
		// 	return num.toFixed(2);
		// }
	}

	return (
		<>
			<Drawer
				open={isOpen}
				onClose={() => dispatch(toggleDrawer())}
				direction="left"
				style={{ paddingTop: isMobileOrTablet ? "64px" : "83px", width: 200 }}
			>
				<MDBListGroup light small className="mb-2">
					<MDBTabs>
						<hr className="w-100 my-2" />
						<MDBListGroupItem
							action
							active={location.pathname === "/"}
							noBorders
							className="px-3 mx-2"
							tag={Link}
							to="/"
							onClick={toggleDrawerIn}
						>
							{t("Home")}
						</MDBListGroupItem>
						<hr className="w-100 my-2" />
						<MDBListGroupItem
							action
							active={location.pathname === "/orders"}
							noBorders
							className="px-3 mx-2"
							tag={Link}
							to="/orders"
							onClick={toggleDrawerIn}
						>
							{t("Orders")}
						</MDBListGroupItem>
						<hr className="w-100 my-2" />
						<MDBListGroupItem
							action
							active={location.pathname === "/wallet"}
							noBorders
							className="px-3 mx-2"
							tag={Link}
							to="/wallet"
							onClick={toggleDrawerIn}
						>
							{t("Wallet")}
						</MDBListGroupItem>
						<hr className="w-100 my-2" />
						<MDBListGroupItem
							action
							active={location.pathname === "/referral"}
							noBorders
							className="px-3 mx-2"
							tag={Link}
							to="/referral"
							onClick={toggleDrawerIn}
						>
							{t("Referral Program")}
						</MDBListGroupItem>
						<hr className="w-100 my-2" />
						<MDBListGroupItem
							action
							active={location.pathname === "/account"}
							noBorders
							className="px-3 mx-2"
							tag={Link}
							to="/account"
							onClick={toggleDrawerIn}
						>
							{t("Account")}
						</MDBListGroupItem>
						<hr className="w-100 my-2" />
						<MDBListGroupItem
							action
							active={location.pathname === "/privacy-policy"}
							noBorders
							className="px-3 mx-2"
							tag={Link}
							to="/privacy-policy"
							onClick={toggleDrawerIn}
						>
							{t("Privacy Policy")}
						</MDBListGroupItem>
						<hr className="w-100 my-2" />
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
						{t("Sign Out")}
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
							<MDBBtn
								floating
								color="link"
								size={isMobileOrTablet ? "sm" : "lg"}
								onClick={() => dispatch(toggleDrawer())}
							>
								<MDBIcon icon="bars" color="primary" size="lg" />
							</MDBBtn>
						)}
						{/* <MDBIcon fas icon="bars" className="me-3" /> */}
						<MDBNavbarBrand tag={Link} to="/">
							<img src="/logopng 1.png" className="logo-img" alt="logo" />
						</MDBNavbarBrand>
					</div>
					<div className="mb-lg-0 d-flex align-items-center flex-grow-0 w-auto gap-2 gap-md-4">
						{user && (
							<span
								className="cursor-pointer"
								// onClick={() => dispatch(toggleDrawer())}
							>
								<MDBBadge pill light color="secondary" tag={Link} to="/payment">
									<MDBBtn
										floating
										style={{ margin: "-0.7em" }}
										size="sm"
										color="success"
										className="me-1"
									>
										<MDBIcon fas icon="plus" color="white" />
									</MDBBtn>
									{formatNumber(user.balance || 0)}{" "}
									{user.currency?.toUpperCase() || ""}
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
								className="language-dropdown- nav-link"
								role="button"
							>
								{i18n.language.toUpperCase()}
								{/* </MDBBtn> */}
							</MDBDropdownToggle>
							<MDBDropdownMenu responsive="end">
								{Object.entries(languages).map(([code, { name, flag }]) => (
									<MDBDropdownItem
										key={code}
										link
										onClick={(e) => {
											// e.preventDefault();
											switchLanguage(code);
											i18n.changeLanguage(code);
										}}
									>
										<span className={`me-4 fi fi-${flag} fs-6`}></span>
										{name}
									</MDBDropdownItem>
								))}
							</MDBDropdownMenu>
						</MDBDropdown>
					</div>
				</MDBContainer>
			</MDBNavbar>

			{loading && (
				<div className="d-flex justify-content-center align-items-start spinner-wrapper">
					<MDBSpinner
						color="primary"
						style={{ width: 32, height: 32, marginTop: "2.3rem" }}
					>
						<span className="visually-hidden">{t("Loading")}...</span>
					</MDBSpinner>
				</div>
			)}
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
			<div className="flex-grow-1 align-content-center pt-4 pb-5">
				<div className="gap-3 d-block d-sm-flex align-items-center justify-content-center text-center">
					<div>{t("Have an issue/question?")}</div>
					<span
						className="text-primary font-black cursor-pointer"
						onClick={() => dispatch(showSupport())}
					>
						{t("Contact Us")}
					</span>
				</div>
				<div className=" text-center justify-content-center mt-2 px-5">
					<div className="">{t("Have an android phone?")}</div>
					<div className="gap-3 d-block d-sm-flex align-items-center justify-content-center">
						<div>{t("Checkout the Exo Booster app:")}</div>
						<MDBBtn
							color="primary"
							size="sm"
							tag={Link}
							to="https://www.exobooster.com/"
							target="_blank"
						>
							<MDBIcon fas icon="download" className="me-2" />
							{t("Download")}
						</MDBBtn>
					</div>
				</div>
			</div>
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
								{t("OK")}
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

							{contactInfo ? (
								<>
									<h3 className="font-black">{t("Have a problem?")}</h3>
									<div className="lead">
										{t("Kindly contact us through email:")}
									</div>
									<div className="lead text-primary">
										<a href={contactInfo.Email[language].link} target="_blank">
											{contactInfo.Email[language].name}
										</a>
									</div>
									<div className="lead">{t("Whatsapp")}:</div>
									<div className="lead text-primary">
										<a
											href={contactInfo.Whatsapp[language].link}
											target="_blank"
										>
											{contactInfo.Whatsapp[language].name}
										</a>
									</div>
									<div className="lead">{t("Or Telegram")}:</div>
									<div className="lead text-primary">
										<a
											href={contactInfo.Telegram[language].link}
											target="_blank"
										>
											{contactInfo.Telegram[language].name}
										</a>
									</div>
								</>
							) : (
								<div>
									<MDBSpinner color="primary" />
								</div>
							)}
						</MDBModalBody>
						<MDBModalFooter>
							<MDBBtn color="primary" onClick={() => dispatch(hideSupport())}>
								{t("OK")}
							</MDBBtn>
						</MDBModalFooter>
					</MDBModalContent>
				</MDBModalDialog>
			</MDBModal>
		</>
	);
}
