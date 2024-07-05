import React, { useEffect, useState } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import {
	MDBBtn,
	MDBCard,
	MDBCardBody,
	MDBCol,
	MDBCollapse,
	MDBContainer,
	MDBDropdown,
	MDBDropdownItem,
	MDBDropdownMenu,
	MDBDropdownToggle,
	MDBIcon,
	MDBNavbar,
	MDBNavbarBrand,
	MDBNavbarItem,
	MDBNavbarLink,
	MDBNavbarNav,
	MDBNavbarToggler,
	MDBRow,
	MDBTypography,
} from "mdb-react-ui-kit";
import {
	useMobileMediaQuery,
	useMobileOrTabletMediaQuery,
} from "../responsiveHook";
import { useTranslation } from "react-i18next";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firebaseSignOut } from "../firebaseAuth";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageContext";

const languages = {
	en: { name: "English", flag: "gb.svg" },
	fr: { name: "Français", flag: "fr.svg" },
};

const getFlagUrl = (flagCode) => `https://flagcdn.com/${flagCode}`;

export default function AuthLayout() {
	const location = useLocation();
	const { t, i18n } = useTranslation();
	const isMobile = useMobileMediaQuery();
	const isMonileOrTablet = useMobileOrTabletMediaQuery();
	const [showBasic, setShowBasic] = useState(false);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const { language, switchLanguage } = useLanguage();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				user.displayName = user.email.split("@")[0];
				setUser(user);
			} else {
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
			Navigate("/");
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
										Sign Out
									</MDBDropdownItem>
								</MDBDropdownMenu>
							</MDBDropdown>
						)}
					</div>
				</MDBContainer>
			</MDBNavbar>

			<MDBContainer>
				{location.pathname === "/" ? (
					<>
						<MDBRow className="mt-4 mt-lg-5 pt-0 pt-md-5">
							<MDBCol md="12" lg="7" xxl={8} className="align-self-center">
								<motion.div
									initial={{ opacity: 0, translateY: +100 }}
									animate={{ opacity: 1, translateY: 0 }}
									transition={{ ease: "easeInOut" }}
								>
									<MDBTypography
										tag="h1"
										className={`${
											isMobile ? "display-4" : "display-1"
										} font-black text-center text-lg-start`}
									>
										{i18n.language.slice(0, 2) == "fr" ? (
											<>
												<span className="text-primary">BOOSTEZ</span>{" "}
												<small>VOS</small>
												<br /> <span>RÉSEAUX SOCIAUX</span>
											</>
										) : (
											<>
												<span className="text-primary">BOOST</span>{" "}
												<small>YOUR</small>
												<br /> <span>SOCIAL MEDIA</span>
											</>
										)}
									</MDBTypography>
								</motion.div>
								<motion.div
									initial={{ opacity: 0, translateX: -100 }}
									animate={{ opacity: 1, translateX: 0 }}
									transition={{ ease: "easeInOut", delay: 0.5 }}
								>
									<p
										className={`${
											!isMobile && "lead"
										} text-center text-lg-start`}
									>
										{t("cover-letter")}
									</p>
								</motion.div>
							</MDBCol>
							<MDBCol
								md="12"
								lg="5"
								xxl={4}
								className={isMonileOrTablet ? "text-center" : "text-end"}
							>
								<motion.div
									initial={{ opacity: 0, scale: 2 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ ease: "easeInOut", delay: 1 }}
								>
									<img
										src="/Img.png"
										width={isMobile ? 300 : 500}
										alt="phone"
										className="img-fluid img-fluid-80"
									/>
								</motion.div>
							</MDBCol>
						</MDBRow>
						<motion.div
							initial={{ opacity: 0, translateY: -100 }}
							animate={{ opacity: 1, translateY: 0 }}
							transition={{ ease: "easeInOut", delay: 1.5 }}
						>
							<div className="w-400 mx-auto px-5 mt-5">
								<MDBBtn
									size="lg"
									block
									tag={Link}
									to="/auth/signup"
									rounded
									// size={isMonileOrTablet ? "md" : "lg"}
								>
									Create your account
								</MDBBtn>
								<div className="d-flex align-items-center mx-auto my-2 w-25-0 m px-5">
									<hr className="flex-grow-1 opacity-100" />
									<span className="px-3">OR</span>
									<hr className="flex-grow-1 opacity-100" />
								</div>
								<MDBBtn
									size="lg"
									block
									tag={Link}
									to="/auth/signin"
									rounded
									outline
									// size={isMonileOrTablet ? "md" : "lg"}
								>
									Log in
								</MDBBtn>
							</div>
						</motion.div>
					</>
				) : (
					<div className="auth-main mt-80 mb-200 position-relative pt-80">
						<img
							src="/cloud-svgrepo-com.svg"
							width={isMobile ? 100 : isMonileOrTablet ? 120 : 140}
							className="cloud"
							id="cloud-3"
						/>
						<Outlet />
					</div>
				)}

				<div className="auth-footer position-relative pt-80 pb-5 text-webkit-center">
					<div className="position-relative w-1000">
						<img
							src="/cloud-svgrepo-com.svg"
							width={isMobile ? 120 : isMonileOrTablet ? 140 : 180}
							className="cloud"
							id="cloud-1"
						/>
						<img
							src="/cloud-svgrepo-com.svg"
							width={isMobile ? 80 : isMonileOrTablet ? 100 : 120}
							className="cloud"
							id="cloud-2"
						/>
					</div>
					<MDBCard className="bg-pink shadow w-600 mx-auto rounded-pill">
						<MDBCardBody className="d-flex">
							<div className="flex-grow-1 border-end black border-1 text-center lead font-black">
								<div>5,000,000+</div>
								<div>Orders</div>
							</div>
							<div className="flex-grow-1 text-center lead font-black">
								<div>50,000+</div>
								<div>Users</div>
							</div>
						</MDBCardBody>
					</MDBCard>
					<MDBTypography
						tag="h1"
						className="text-center text-primary pt-5 mt-5 mb-5 font-black position-relative"
					>
						Why Exo Booster?
					</MDBTypography>
					<div className="d-md-block d-lg-flex justify-content-center gap-5 mb-5">
						<motion.div
							initial={{ scale: 1 }}
							transition={{ ease: "easeInOut", duration: 0.2 }}
							whileHover={{ scale: 1.1 }}
						>
							<MDBCard className="bg-pink text-center w-300 mb-4">
								<MDBCardBody>
									<MDBIcon fas icon="thumbs-up" size="4x" className="mb-3" />
									<h3 className="font-black">Easy-to-use interface</h3>
									<hr />
									<p className="lead">
										Exo boosters interface is as easy as ABC, from account
										creation to making your first order
									</p>
								</MDBCardBody>
							</MDBCard>
						</motion.div>

						<motion.div
							initial={{ scale: 1 }}
							transition={{ ease: "easeInOut", duration: 0.2 }}
							whileHover={{ scale: 1.1 }}
						>
							<MDBCard className="bg-pink text-center w-300 mb-4">
								<MDBCardBody>
									<MDBIcon fas icon="life-ring" size="4x" className="mb-3" />
									<h3 className="font-black">
										Live chat
										<br /> support
									</h3>
									<hr />
									<p className="lead">
										Exo boosters interface is as easy as ABC, from account
										creation to making your first order
									</p>
								</MDBCardBody>
							</MDBCard>
						</motion.div>

						<motion.div
							initial={{ scale: 1 }}
							transition={{ ease: "easeInOut", duration: 0.2 }}
							whileHover={{ scale: 1.1 }}
						>
							<MDBCard className="bg-pink text-center w-300 mb-4">
								<MDBCardBody>
									<MDBIcon fas icon="rocket" size="4x" className="mb-3" />
									<h3 className="font-black">Super instant results</h3>
									<hr />
									<p className="lead">
										Exo boosters interface is as easy as ABC, from account
										creation to making your first order
									</p>
								</MDBCardBody>
							</MDBCard>
						</motion.div>
					</div>
				</div>
			</MDBContainer>
		</>
	);
}
