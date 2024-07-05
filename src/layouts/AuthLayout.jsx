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

export default function AuthLayout() {
	const location = useLocation();
	const { t, i18n } = useTranslation();
	const isMobile = useMobileMediaQuery();
	const isMonileOrTablet = useMobileOrTabletMediaQuery();
	const [showBasic, setShowBasic] = useState(false);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

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
						<img src="/logopng.png" className="logo-img" alt="logo" />
					</MDBNavbarBrand>
					<div className="mb-lg-0 flex-grow-0 w-auto">
						{user ? (
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
						) : (
							<>
								{location.pathname !== "/auth/signin" && (
									<MDBBtn
										tag={Link}
										to="/auth/signin"
										rounded
										size={isMonileOrTablet ? "md" : "lg"}
									>
										Sign In
									</MDBBtn>
								)}
								{location.pathname !== "/auth/signup" && (
									<MDBBtn
										tag={Link}
										to="/auth/signup"
										rounded
										outline
										className="ms-2"
										size={isMonileOrTablet ? "md" : "lg"}
									>
										Sign Up
									</MDBBtn>
								)}
							</>
						)}
					</div>
					{/* <MDBNavbarToggler
						aria-controls="navbarExample01"
						aria-expanded="false"
						aria-label="Toggle navigation"
						onClick={() => setShowBasic(!showBasic)}
					>
						<MDBIcon fas icon="bars" />
					</MDBNavbarToggler>
					<MDBCollapse navbar open={showBasic} className="flex-grow-0">
						<MDBNavbarNav right className="mb-2 mb-lg-0">
							<MDBNavbarItem active>
								<MDBNavbarLink aria-current="page" href="#">
									Home
								</MDBNavbarLink>
							</MDBNavbarItem>
							<MDBNavbarItem>
								<MDBNavbarLink href="#">Features</MDBNavbarLink>
							</MDBNavbarItem>
							<MDBNavbarItem>
								<MDBNavbarLink href="#">Pricing</MDBNavbarLink>
							</MDBNavbarItem>
							<MDBNavbarItem>
								<MDBNavbarLink href="#">About</MDBNavbarLink>
							</MDBNavbarItem>
						</MDBNavbarNav>
					</MDBCollapse> */}
				</MDBContainer>
			</MDBNavbar>

			<MDBContainer>
				{location.pathname === "/" && (
					<MDBRow className="mt-5 pt-sm-4 pt-md-5">
						<MDBCol md="12" lg="7" xxl={8} className="align-self-center">
							<motion.div
								initial={{ opacity: 0, translateY: +100 }}
								animate={{ opacity: 1, translateY: 0 }}
								transition={{ ease: "easeInOut" }}
							>
								<MDBTypography
									tag="h1"
									className={`display-1 font-black ${
										isMonileOrTablet ? "text-center" : ""
									}`}
								>
									{(navigator.language || navigator.userLanguage).slice(0, 2) ==
									"fr" ? (
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
								<p className="lead">{t("cover-letter")}</p>
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
									src="/image 2.png"
									width={360}
									alt="phone"
									className="img-fluid img-fluid-80"
								/>
							</motion.div>
						</MDBCol>
					</MDBRow>
				)}

				<div className="auth-main mt-80 mb-200 position-relative">
					<img
						src="/cloud-svgrepo-com.svg"
						width={200}
						className="cloud"
						id="cloud-3"
					/>
					<Outlet />
				</div>

				<div className="auth-footer position-relative pt-100 pb-5 text-webkit-center">
					<img
						src="/cloud-svgrepo-com.svg"
						width={180}
						className="cloud"
						id="cloud-2"
					/>{" "}
					<img
						src="/cloud-svgrepo-com.svg"
						width={200}
						className="cloud"
						id="cloud-1"
					/>
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
						className="text-center text-primary pt-5 mt-5 mb-5 font-black"
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
