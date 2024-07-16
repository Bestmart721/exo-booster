import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import Select, { components } from "react-select";
import { firebaseSignIn1 } from "../firebaseAuth";
import { motion, AnimatePresence } from "framer-motion";
import {
	MDBBtn,
	MDBIcon,
	MDBTypography,
	MDBSpinner,
	MDBModal,
	MDBModalDialog,
	MDBModalContent,
	MDBModalBody,
	MDBModalFooter,
} from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { setTmpUser } from "../store/authSlice";
import { modalError } from "../store/appSlice";
import { useLanguage } from "../layouts/LanguageContext";

const capitalize = (str) => (str ? str[0].toUpperCase() + str.slice(1) : "");

const customStyles = {
	control: (provided, state) => ({
		...provided,
		borderRadius: "50px", // Full radius
		padding: "4px 8px", // Custom padding
		color: "#555",
	}),
	singleValue: (provided) => ({
		...provided,
	}),
	valueContainer: (provided) => ({
		...provided,
		display: "flex",
		alignItems: "center",
	}),
	menu: (provided) => ({
		...provided,
		marginTop: "2px",
	}),
};

const Option = (props) => (
	<components.Option {...props} className="country-option">
		<img
			src={props.data.flag_img_link}
			width={24}
			alt="logo"
			className="country-logo"
		/>
		{props.data.label}
	</components.Option>
);

export default function Signup() {
	const navigate = useNavigate();
	const [countries, setCountries] = useState([]);
	const { t, i18n } = useTranslation();
	const [curCountry, setCurCountry] = useState("");
	const [visiblePassword, setVisiblePassword] = useState(false);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [errorModalLocal, setErrorModalLocal] = useState(false);
	const [modalTextLocal, setModalTextLocal] = useState("");
	const { language, switchLanguage } = useLanguage();

	const initialValues = {
		country: "",
		currency: "",
		username: "",
		password: "",
		confirm: "",
		whatsapp_number: "",
		device: { os: "web", userAgent: navigator.userAgent },
		language:
			(navigator.language || navigator.userLanguage).slice(0, 2) == "fr"
				? "fr"
				: "en",
		referralCode: "",
	};

	const modalErrorLocal = (text) => {
		setModalTextLocal(text);
		setErrorModalLocal(true);
	};

	const hideErrorLocal = () => {
		setErrorModalLocal(false);
	};

	const retry = () => {
		hideErrorLocal();
		loadSignupData();
	};

	const loadSignupData = async () => {
		setLoading(true);
		axios
			.get(`https://getsupportedcountries-l2ugzeb65a-uc.a.run.app/`)
			.then((response) => {
				let cs = Object.keys(response.data).map((key) => response.data[key]);
				cs = cs.map((country) => ({
					...country,
					value: country.name,
					label: capitalize(country.name),
				}));
				setCountries(cs);
				setLoading(false);
			})
			.catch((error) => {
				modalErrorLocal(t("Could not get available countries."));
				setLoading(false);
			});
		// let response = {
		// 	data: {
		// 		cameroon: {
		// 			name: "cameroon",
		// 			currency: "xaf",
		// 			flag_img_link:
		// 				"https://firebasestorage.googleapis.com/v0/b/exobooster-59de3.appspot.com/o/flag_thumbnails%2FFlag-Cameroon.webp?alt=media&token=2d2a1fa2-946f-4d54-a56d-15385eb9fb8e",
		// 			enabled: true,
		// 		},
		// 	},
		// };
	};

	useEffect(() => {
		loadSignupData();
	}, []);

	const validationSchema = Yup.object().shape({
		username: Yup.string()
			.required(t("Username is required."))
			.min(3, t("Your username should be a minimum of 3 characters."))
			.max(20, t("Your username should be a maximum of 20 characters."))
			.matches(
				/^[a-zA-Z0-9]+$/,
				t("Only alphanumeric characters are allowed.")
			),
		whatsapp_number: Yup.string()
			.required(t("Your Whatsapp number is required."))
			.matches(
				/^[0-9]+$/,
				t("Only numbers are allowed, no spaces or letters.")
			),
		country: Yup.string().required(t("Country cannot be empty.")),
		password: Yup.string()
			.required(t("Password cannot be empty."))
			.min(6, t("Password must be at least 6 characters.")),
		confirm: Yup.string().oneOf(
			[Yup.ref("password"), null],
			t("Passwords must match.")
		),
		referralCode: Yup.string(), // Optional field, no validation required
	});

	const onSubmit = (values, { setSubmitting }) => {
		axios
			.post(`https://createuser-l2ugzeb65a-uc.a.run.app/`, values)
			.then((response) => {
				if (response.data.error) {
					dispatch(modalError(t(response.data.error[language])));
					return;
				}

				setSubmitting(true);
				firebaseSignIn1(response.data.data.auth_token)
					.then((user) => {
						const { accessToken, displayName, email, uid } = user;
						dispatch(setTmpUser({ accessToken, displayName, email, uid }));
						// navigate("/");
					})
					.finally(() => {
						setSubmitting(false);
					});
			})
			.catch((error) => {
				dispatch(
					modalError(t(error))
				);
			})
			.finally(() => {
				setSubmitting(false);
			});
	};

	const SingleValue = ({ children, ...props }) => (
		<components.SingleValue {...props}>
			<MDBIcon fas icon="globe" size="lg" className="me-4" />
			<img
				src={curCountry.flag_img_link}
				alt="s-logo"
				className="selected-logo"
			/>
			{children}
		</components.SingleValue>
	);

	const togglePasswordVisible = () => {
		setVisiblePassword(!visiblePassword);
	};

	return (
		<>
			<motion.div
				initial={{ opacity: 0, translateY: -100 }}
				animate={{ opacity: 1, translateY: 0 }}
				transition={{ duration: 0.3, ease: "easeInOut" }}
			>
				<div className="position-relative">
					<MDBTypography tag="h1" className="text-center font-black mb-4">
						{t("Create your account")}
					</MDBTypography>

					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={onSubmit}
					>
						{({ isSubmitting, handleChange, setFieldValue }) => (
							<Form className="w-465 mx-auto">
								<div className="input-group input-group-lg rounded-pill shadow">
									<div className="input-group-text rounded-start-pill bg-white">
										<MDBIcon far icon="user" size="lg" />
									</div>
									<Field
										type="text"
										className="form-control rounded-end-pill"
										placeholder={t("Username")}
										name="username"
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
										<MDBIcon fab icon="whatsapp" size="xl" />
									</span>
									<Field
										type="text"
										className="form-control rounded-end-pill"
										placeholder={t("Whatsapp number")}
										name="whatsapp_number"
									/>
								</div>
								<div className="error-message-wrapper text-danger px-4">
									<ErrorMessage
										name="whatsapp_number"
										component="small"
										className="error-message"
									/>
								</div>

								<Select
									className="input-group-lg rounded-pill shadow"
									placeholder={t("Choose your country")}
									name="country"
									value={curCountry}
									options={countries}
									onChange={(value) => {
										setCurCountry(value);
										setFieldValue("country", value.name);
										setFieldValue("currency", value.currency);
									}}
									styles={customStyles}
									components={{
										Option,
										SingleValue,
										Placeholder: () => (
											<div style={{ display: "flex", alignItems: "center" }}>
												<MDBIcon fas icon="globe" size="lg" className="me-4" />
												<span>{t("Select a country")}...</span>
											</div>
										),
									}}
								/>
								<div className="error-message-wrapper text-danger px-4">
									<ErrorMessage
										name="country"
										component="small"
										className="error-message"
									/>
								</div>

								<div className="input-group input-group-lg rounded-pill shadow">
									<span className="input-group-text rounded-start-pill bg-white">
										<MDBIcon fas icon="unlock" size="lg" />
									</span>
									<Field
										type={visiblePassword ? "text" : "password"}
										className="form-control"
										placeholder={t("Password")}
										name="password"
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

								<div className="input-group input-group-lg rounded-pill shadow">
									<span className="input-group-text rounded-start-pill bg-white">
										<MDBIcon fas icon="lock" size="lg" />
									</span>
									<Field
										type={visiblePassword ? "text" : "password"}
										className="form-control"
										placeholder={t("Confirm your password")}
										name="confirm"
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
										name="confirm"
										component="small"
										className="error-message"
									/>
								</div>

								<div className="input-group input-group-lg rounded-pill shadow">
									<span className="input-group-text rounded-start-pill bg-white">
										<MDBIcon fas icon="gift" size="lg" />
									</span>
									<Field
										type="text"
										className="form-control rounded-end-pill"
										placeholder={t("Referral code (Optional)")}
										name="referralCode"
									/>
								</div>
								<div className="error-message-wrapper text-danger px-4">
									<ErrorMessage
										name="referralCode"
										component="small"
										className="error-message"
									/>
								</div>

								<div className="text-center mt-2 w-250 mx-auto">
									<MDBBtn
										type="submit"
										size="lg"
										block
										rounded
										disabled={isSubmitting}
									>
										{isSubmitting ? (
											<MDBSpinner style={{ width: 22, height: 22 }}>
												<span className="visually-hidden">Loading...</span>
											</MDBSpinner>
										) : (
											t("CREATE")
										)}
									</MDBBtn>
								</div>
							</Form>
						)}
					</Formik>
					<div className="d-flex align-items-center mt-4 w-250 mx-auto">
						<hr className="flex-grow-1 opacity-100" />
						<span className="px-3">{t("OR")}</span>
						<hr className="flex-grow-1 opacity-100" />
					</div>
					<div className="d-sm-flex text-center justify-content-center mt-4 font-black lead">
						<div>{t("Already have an account?")}</div>
						<Link to="/auth/signin" className="ms-3 font-black text-primary">
							{t("LOGIN")}
						</Link>
					</div>
				</div>
			</motion.div>

			<MDBModal tabIndex="-1" open={errorModalLocal} onClose={hideErrorLocal}>
				<MDBModalDialog centered style={{ maxWidth: 300 }}>
					<MDBModalContent>
						<MDBModalBody className="text-center py-5">
							<img src="/favcon 1.png" className="img-fluid mb-5" alt="logo" />
							<h3 className="mb-0">{t(modalTextLocal)}</h3>
						</MDBModalBody>
						<MDBModalFooter>
							<MDBBtn color="warning" onClick={retry}>
								{t("Retry")}
							</MDBBtn>
							<MDBBtn color="primary" onClick={hideErrorLocal}>
								{t("OK")}
							</MDBBtn>
						</MDBModalFooter>
					</MDBModalContent>
				</MDBModalDialog>
			</MDBModal>

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
