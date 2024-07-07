import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { db, fetchSupportContacts, firebaseConfig, firebaseSignIn2 } from "../firebaseAuth";
import {
	MDBBtn,
	MDBIcon,
	MDBModal,
	MDBModalBody,
	MDBModalContent,
	MDBModalDialog,
	MDBModalFooter,
	MDBModalHeader,
	MDBModalTitle,
	MDBSpinner,
} from "mdb-react-ui-kit";
import { motion, AnimatePresence } from "framer-motion";
// import "./styles.css";

export default function Signin() {
	const { t, i18n } = useTranslation();
	const navigate = useNavigate();
	const [visiblePassword, setVisiblePassword] = useState(false);
	const [centredModal, setCentredModal] = useState(false);
	const [supportModal, setSupportModal] = useState(false);
	const [supportContacts, setSupportContacts] = useState({});
	const [loading, setLoading] = useState(true);
	const [modalText, setModalText] = useState("");
	const [user, setUser] = useState(null);
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		setVisible(true);
		fetchSupportContacts().then((data) => {
			setSupportContacts(data);
		}
		).catch((error) => {
			setModalText(error);
			setCentredModal(true);
			setLoading(false);
		});

		// setSupportContacts({
		// 	email: "supportemail@exobooster.com",
		// 	telegram: "@exobooster",
		// 	whatsapp: "+237 674349485",
		// });
		setLoading(false);
	}, []);

	const togglePasswordVisible = () => {
		setVisiblePassword(!visiblePassword);
	};

	const toggleOpen = () => {
		setCentredModal(!centredModal);
	};

	const toggleSupportOpen = () => {
		setSupportModal(!supportModal);
	};

	const SignInSchema = Yup.object().shape({
		username: Yup.string()
			.matches(
				/^[a-zA-Z0-9.@]+$/,
				t(
					"Invalid username, should not contain any spaces, or special characters (eg: $ é # â .....)"
				)
			)
			.test(
				"username-length",
				t("Username must be at least 3 characters long."),
				function (value) {
					if (!value) return false; // If there's no value, it fails the required test later
					const strippedUsername = value.split("@")[0];
					return strippedUsername.length >= 3;
				}
			)
			.test(
				"username-max-length",
				t("Username must be at most 20 characters long."),
				function (value) {
					if (!value) return true; // If there's no value, it fails the required test later
					const strippedUsername = value.split("@")[0];
					return strippedUsername.length <= 20;
				}
			)
			.required(t("Username is required.")),
		password: Yup.string()
			.min(6, t("Password must be at least 6 characters long."))
			.required(t("Password is required.")),
	});

	const handleSubmit = (values, { setSubmitting }) => {
		firebaseSignIn2(values.username, values.password)
			.then((response) => {
				setUser(response.user);
				navigate("/home");
			})
			.catch((error, a, b) => {
				console.log(error, a, b);
				setModalText(error);
				setCentredModal(true);
				setSubmitting(false);
			});
	};

	return (
		// <AnimatePresence>
		<motion.div
			initial={{ opacity: 0, translateY: -100 }}
			animate={{ opacity: 1, translateY: 0 }}
			// exit={{ opacity: 0 }}
			transition={{ duration: 0.3, ease: "easeInOut" }}
			// whileInView={{ scale: 1 }}
			// whileHover={{ scale: 1.1 }}
		>
			<div className="position-relative">
				<h1 className="text-center font-black mb-4 hover-animate">{t("Log in")}</h1>
				<Formik
					initialValues={{
						username: "",
						password: "",
					}}
					validationSchema={SignInSchema}
					onSubmit={handleSubmit}
				>
					{({ isSubmitting, errors, setFieldValue }) => (
						<Form className="w-465 mx-auto">
							<div className="input-group input-group-lg rounded-pill shadow">
								<span className="input-group-text rounded-start-pill bg-white">
									<MDBIcon far icon="user" size="lg" />
								</span>
								<Field
									name="username"
									type="text"
									className="form-control full-radius rounded-end-pill"
									placeholder={t("Username")}
									onChange={(event) => {
										setFieldValue(
											event.target.name,
											event.target.value.replace(/ /g, "")
										);
									}}
								/>
							</div>
							<div className="error-message-wrapper text-danger px-4">
								<ErrorMessage
									name="username"
									component="small"
									className="error-message"
								/>
							</div>
							<div className="input-group input-group-lg rounded-pill shadow">
								<span className="input-group-text rounded-start-pill bg-white">
									<MDBIcon fas icon="unlock" size="lg" />
								</span>
								<Field
									name="password"
									type={visiblePassword ? "text" : "password"}
									className="form-control full-radius"
									placeholder={t("Password")}
								/>
								<span className="input-group-text rounded-end-pill bg-white">
									<MDBIcon
										far
										icon={visiblePassword ? "eye" : "eye-slash"}
										onClick={togglePasswordVisible}
										size="lg"
									/>
								</span>
							</div>
							<div className="error-message-wrapper text-danger px-4">
								<ErrorMessage
									name="password"
									component="small"
									className="error-message"
								/>
							</div>
							<div className="text-center mt-4 w-250 mx-auto">
								<MDBBtn
									type="submit"
									size="lg"
									block
									rounded
									disabled={isSubmitting}
								>
									{isSubmitting ? (
											<MDBSpinner
												style={{ width: 22, height: 22 }}
											>
												<span className="visually-hidden">Loading...</span>
											</MDBSpinner>
										) : (
											t("LOGIN")
										)}
								</MDBBtn>
							</div>
						</Form>
					)}
				</Formik>
				<div className="d-flex align-items-center mt-2 w-250 mx-auto">
					<hr className="flex-grow-1 opacity-100" />
					<span className="px-3">{t("OR")}</span>
					<hr className="flex-grow-1 opacity-100" />
				</div>
				<div className="d-sm-flex text-center justify-content-center mt-4 font-black lead">
					<div>{t("Don't have an account?")}</div>
					<Link to="/auth/signup" className="ms-3 font-black text-primary">
					{t("CREATE")}
					</Link>
				</div>
				<div className="d-sm-flex text-center justify-content-center mt-4 font-black lead">
					<div>{t("Have a problem?")}</div>
					<Link
						className="ms-3 font-black text-primary"
						onClick={toggleSupportOpen}
					>
						{t("Contact Us")}
					</Link>
				</div>

				<MDBModal
					tabIndex="-1"
					open={centredModal}
					onClose={() => setCentredModal(false)}
				>
					<MDBModalDialog centered style={{ maxWidth: 300 }}>
						<MDBModalContent>
							<MDBModalBody className="text-center py-5">
								<img
									src="/favcon 1.png"
									className="img-fluid mb-5"
									alt="logo"
								/>
								<h3 className="mb-0">{t(modalText)}</h3>
							</MDBModalBody>
							<MDBModalFooter>
								<MDBBtn color="primary" onClick={toggleOpen}>
									OK
								</MDBBtn>
							</MDBModalFooter>
						</MDBModalContent>
					</MDBModalDialog>
				</MDBModal>

				<MDBModal
					tabIndex="-1"
					open={supportModal}
					onClose={() => setSupportModal(false)}
				>
					<MDBModalDialog centered style={{ maxWidth: 400 }}>
						<MDBModalContent>
							<MDBModalBody className="text-center py-5">
								<img
									src="/favcon 1.png"
									className="img-fluid mb-5"
									alt="logo"
								/>
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
										href={`https://wa.me/${supportContacts.whatsapp?.replace(/[^\d]/g, "")}`}
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
								<MDBBtn color="primary" onClick={toggleSupportOpen}>
									OK
								</MDBBtn>
							</MDBModalFooter>
						</MDBModalContent>
					</MDBModalDialog>
				</MDBModal>
			</div>
		</motion.div>
		// </AnimatePresence>
	);
}
