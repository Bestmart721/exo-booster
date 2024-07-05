import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import Select, { components } from "react-select";
import { firbaseSignUp, firebaseSignIn1 } from "../firebaseAuth";
import { motion, AnimatePresence } from "framer-motion";
import {
	MDBBtn,
	MDBIcon,
	MDBInput,
	MDBInputGroup,
	MDBTypography,
	MDBModal,
	MDBModalBody,
	MDBModalContent,
	MDBModalDialog,
	MDBModalFooter,
	MDBModalHeader,
	MDBModalTitle,
} from "mdb-react-ui-kit";
import { use } from "i18next";

const capitalize = (str) => (str ? str[0].toUpperCase() + str.slice(1) : "");

export async function loadSignupData() {
	let response = await axios.get(
		`https://getsupportedcountries-l2ugzeb65a-uc.a.run.app/`
	);
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
	let countries = Object.keys(response.data).map((key) => response.data[key]);
	countries = countries.map((country) => ({
		...country,
		value: country.name,
		label: capitalize(country.name),
	}));
	return { countries };
}

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
	const { countries } = useLoaderData();
	const { t, i18n } = useTranslation();
	const [curCountry, setCurCountry] = useState("");
	const [visiblePassword, setVisiblePassword] = useState(false);
	const [centredModal, setCentredModal] = useState(false);
	const [modalText, setModalText] = useState("");

	useEffect(() => {
		window.scrollTo(0, 0);
	});

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

	const onSubmit = async (values, { setSubmitting }) => {
		let response = await axios.post(
			`https://createuser-l2ugzeb65a-uc.a.run.app/`,
			values
		);

		if (response.data.error) {
			setModalText(response.data.error[values.language]);
			setCentredModal(true);
			setSubmitting(false);
			return;
		}

		firebaseSignIn1(response.data.data.auth_token).then((res) => {
			navigate("/home");
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

	const toggleOpen = () => {
		setCentredModal(!centredModal);
	};

	return (
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
									placeholder="Username"
									name="username"
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
									placeholder="Whatsapp number"
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
								placeholder="Choose your country"
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
											<span>Select a country...</span>
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
									placeholder="Password"
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
									placeholder="Confirm your password"
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
									placeholder="Referral code (Optional)"
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
									CREATE
								</MDBBtn>
							</div>
						</Form>
					)}
				</Formik>
				<div className="d-flex align-items-center mt-4 w-250 mx-auto">
					<hr className="flex-grow-1 opacity-100" />
					<span className="px-3">OR</span>
					<hr className="flex-grow-1 opacity-100" />
				</div>
				<div className="d-sm-flex text-center justify-content-center mt-4 font-black lead">
					<div>Already have an account?</div>
					<Link to="/auth/signin" className="ms-3 font-black text-primary">
						LOGIN
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
								<h3 className="mb-0">{modalText}</h3>
							</MDBModalBody>
							<MDBModalFooter>
								<MDBBtn color="primary" onClick={toggleOpen}>
									OK
								</MDBBtn>
							</MDBModalFooter>
						</MDBModalContent>
					</MDBModalDialog>
				</MDBModal>
			</div>
		</motion.div>
	);
}
