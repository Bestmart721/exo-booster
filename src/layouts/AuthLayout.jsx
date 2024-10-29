import React, { useEffect, useState } from "react";
import {
	Link,
	Outlet,
	useLocation,
	useNavigate,
} from "react-router-dom";
import {
	MDBBtn,
	MDBCard,
	MDBCardBody,
	MDBCol,
	MDBIcon,
	MDBRow,
	MDBTypography,
	MDBContainer
} from "mdb-react-ui-kit";
import {
	useMobileMediaQuery,
	useMobileOrTabletMediaQuery,
} from "../responsiveHook";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageContext";

export default function AuthLayout() {
	const navigate = useNavigate();
	const location = useLocation();
	const { t, i18n } = useTranslation();
	const isMobile = useMobileMediaQuery();
	const isMonileOrTablet = useMobileOrTabletMediaQuery();
	const { language, switchLanguage } = useLanguage();

	return (
		<MDBContainer id="authLayout">
			{location.pathname === "/auth" ? (
				<div>
					<MDBRow className="mt-4 mt-lg-5 pt-0 pt-md-5">
						<MDBCol
							md="12"
							lg="5"
							xxl={4}
							className={isMonileOrTablet ? "text-center" : "text-end"}
						>
							<motion.div
								initial={{ opacity: 0, scale: 2 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ ease: "easeInOut", delay: 0 }}
							>
								<img
									src={language === "fr" ? "/Img.png" : "/Img2.png"}
									width={isMobile ? 300 : 500}
									alt="phone"
									className="img-fluid img-fluid-80 mb-2"
								/>
							</motion.div>
						</MDBCol>
						<MDBCol md="12" lg="7" xxl={8} className="align-self-center">
							<motion.div
								initial={{ opacity: 0, translateY: +100 }}
								animate={{ opacity: 1, translateY: 0 }}
								transition={{ ease: "easeInOut", delay: 0.5 }}
							>
								<MDBTypography
									tag="h1"
									className={`${
										isMobile ? "display-4" : "display-1"
									} font-black text-center text-lg-start`}
								>
									{i18n.language.slice(0, 2) == "fr" ? (
										<div>
											<span className="text-primary">BOOSTEZ</span>{" "}
											<small>VOS</small>
											<br /> <span>MÉDIAS SOCIAUX</span>
										</div>
									) : (
										<div>
											<span className="text-primary">BOOST</span>{" "}
											<small>YOUR</small>
											<br /> <span>SOCIAL MEDIA</span>
										</div>
									)}
								</MDBTypography>
							</motion.div>
							<motion.div
								initial={{ opacity: 0, translateX: -100 }}
								animate={{ opacity: 1, translateX: 0 }}
								transition={{ ease: "easeInOut", delay: 1 }}
							>
								<p
									className={`${!isMobile && "lead"} text-center text-lg-start`}
								>
									{t("cover-letter")}
								</p>
							</motion.div>
						</MDBCol>
					</MDBRow>
					<motion.div
						initial={{ opacity: 0, translateY: 0 }}
						animate={{ opacity: 1, translateY: 0 }}
						transition={{ ease: "easeInOut", delay: 1.5 }}
					>
						<div className="w-400 mx-auto px-5 mt-2 mt-md-5">
							<MDBBtn
								size="lg"
								block
								tag={Link}
								to="/auth/signup"
								rounded
								// size={isMonileOrTablet ? "md" : "lg"}
							>
								{t("Create your account")}
							</MDBBtn>
							<div className="d-flex align-items-center mx-auto my-2 w-25-0 m px-5">
								<hr className="flex-grow-1 opacity-100" />
								<span className="px-3">{t("OR")}</span>
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
								{t("Log in")}
							</MDBBtn>
						</div>
					</motion.div>
				</div>
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

			<div className="auth-footer position-relative pt-80 text-webkit-center">
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
				<MDBCard className="shadow w-600 mx-auto rounded-pill">
					<MDBCardBody className="d-flex">
						<div className="flex-grow-1 border-end black border-1 text-center lead font-black">
							<div>13,000,000+</div>
							<div>{t("Orders")}</div>
						</div>
						<div className="flex-grow-1 text-center lead font-black">
							<div>100,000+</div>
							<div>{t("Users")}</div>
						</div>
					</MDBCardBody>
				</MDBCard>
				<MDBTypography
					tag="h1"
					className="text-center text-primary pt-5 mt-5 mb-5 font-black position-relative"
				>
					{t("Why Exo Booster?")}
				</MDBTypography>
				<div className="d-md-block d-lg-flex justify-content-center gap-5">
					<motion.div
						initial={{ scale: 1 }}
						transition={{ ease: "easeInOut", duration: 0.2 }}
						whileHover={{ scale: 1.05 }}
					>
						<MDBCard className="h-100 text-center w-300 mb-4">
							<MDBCardBody>
								<MDBIcon fas icon="thumbs-up" size="4x" className="my-3" />
								<h3 className="font-black">{t("Easy-to-use interface")}</h3>
								<hr />
								<div className="lead">
									{t(
										"Exo boosters interface is as easy as ABC, from account creation to making your first order"
									)}
								</div>
							</MDBCardBody>
						</MDBCard>
					</motion.div>

					<motion.div
						initial={{ scale: 1 }}
						transition={{ ease: "easeInOut", duration: 0.2 }}
						whileHover={{ scale: 1.05 }}
					>
						<MDBCard className="h-100 text-center w-300 mb-4">
							<MDBCardBody>
								<MDBIcon fas icon="life-ring" size="4x" className="my-3" />
								<h3 className="font-black">{t("Live chat support")}</h3>
								<hr />
								<div className="lead">
									{t(
										"Our friendly and quick response team is available 24/7 for all your inquiries/problems"
									)}
								</div>
							</MDBCardBody>
						</MDBCard>
					</motion.div>

					<motion.div
						initial={{ scale: 1 }}
						transition={{ ease: "easeInOut", duration: 0.2 }}
						whileHover={{ scale: 1.05 }}
					>
						<MDBCard className="h-100 text-center w-300 mb-4">
							<MDBCardBody>
								<MDBIcon fas icon="rocket" size="4x" className="my-3" />
								<h3 className="font-black">{t("Super instant results")}</h3>
								<hr />
								<div className="lead">
									{t(
										"Fast delivery and highly reliable services, this gives you the freedom to focus on other parts of your business"
									)}
								</div>
							</MDBCardBody>
						</MDBCard>
					</motion.div>
				</div>
			</div>
		</MDBContainer>
	);
}
