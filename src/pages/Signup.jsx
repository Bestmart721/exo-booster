import axios from "axios";
import React, { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import Select, { components } from "react-select";
import { firbaseSignUp, firebaseSignIn1 } from "../firebaseAuth";

const capitalize = (str) => (str ? str[0].toUpperCase() + str.slice(1) : "");

export async function loadSignupData() {
	// let response = await axios.get(
	// 	`https://getsupportedcountries-l2ugzeb65a-uc.a.run.app/`
	// );
	let response = {
		data: {
			cameroon: {
				name: "cameroon",
				currency: "xaf",
				flag_img_link:
					"https://firebasestorage.googleapis.com/v0/b/exobooster-59de3.appspot.com/o/flag_thumbnails%2FFlag-Cameroon.webp?alt=media&token=2d2a1fa2-946f-4d54-a56d-15385eb9fb8e",
				enabled: true,
			},
		},
	};
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
		padding: "8px 12px", // Custom padding
		fontSize: "23px",
		color: "#555",
	}),
	singleValue: (provided) => ({
		...provided,
		fontSize: "23px",
	}),
	valueContainer: (provided) => ({
		...provided,
		fontSize: "23px",
		display: "flex",
		alignItems: "center",
	}),
	menu: (provided) => ({
		...provided,
		marginTop: "2px",
		fontSize: "23px",
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
		firebaseSignIn1(response.data.data.auth_token)
		.then(() => {
			navigate("/home");
		})
	};

	const SingleValue = ({ children, ...props }) => (
		<components.SingleValue {...props}>
			<img
				src="/icons/globe-web-svgrepo-com.svg"
				width="24"
				className="me-5"
				alt="fonticon"
			/>
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
			<h1 className="display-4 text-center Nunito-Black mb-5">
				Create your account
			</h1>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				{({ isSubmitting, handleChange, setFieldValue }) => (
					<Form className="w-465 mx-auto">
						<div className="input-group m-input-group">
							<span className="input-group-text full-radius">
								<img src="/icons/user.svg" alt="fonticon" width={24} />
							</span>
							<Field
								type="text"
								className="form-control full-radius"
								placeholder="Username"
								name="username"
							/>
						</div>
						<div className="error-message-wrapper text-danger px-4 py-1">
							<ErrorMessage
								name="username"
								component="div"
								className="error-message"
							/>
						</div>
						<div className="input-group m-input-group">
							<span className="input-group-text full-radius">
								<img src="/icons/user.svg" alt="fonticon" width={24} />
							</span>
							<Field
								type="text"
								className="form-control full-radius"
								placeholder="Whatsapp number"
								name="whatsapp_number"
							/>
						</div>
						<div className="error-message-wrapper text-danger px-4 py-1">
							<ErrorMessage
								name="whatsapp_number"
								component="div"
								className="error-message"
							/>
						</div>

						<Select
							className="m-input-group"
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
										<img
											src="/icons/globe-web-svgrepo-com.svg"
											width="24"
											className="me-5"
											alt="fonticon"
										/>
										<span>Select a country...</span>
									</div>
								),
							}}
						/>
						<div className="error-message-wrapper text-danger px-4 py-1">
							<ErrorMessage
								name="country"
								component="div"
								className="error-message"
							/>
						</div>
						<div className="input-group m-input-group">
							<span className="input-group-text full-radius">
								<img src="/icons/lock1.svg" alt="fonticon" width={24} />
							</span>
							<Field
								type={visiblePassword ? "text" : "password"}
								className="form-control full-radius"
								placeholder="Password"
								name="password"
							/>
							<span className="input-group-text full-radius">
								<img
									src={`/icons/eye${
										visiblePassword ? "" : "-slash"
									}-svgrepo-com.svg`}
									onClick={togglePasswordVisible}
									alt="fonticon"
									width={24}
								/>
							</span>
						</div>
						<div className="error-message-wrapper text-danger px-4 py-1">
							<ErrorMessage
								name="password"
								component="div"
								className="error-message"
							/>
						</div>
						<div className="input-group m-input-group">
							<span className="input-group-text full-radius">
								<img src="/icons/lock1.svg" alt="fonticon" width={24} />
							</span>
							<Field
								type={visiblePassword ? "text" : "password"}
								className="form-control full-radius"
								placeholder="Confirm your password"
								name="confirm"
							/>
							<span className="input-group-text full-radius">
								<img
									src={`/icons/eye${
										visiblePassword ? "" : "-slash"
									}-svgrepo-com.svg`}
									onClick={togglePasswordVisible}
									alt="fonticon"
									width={24}
								/>
							</span>
						</div>
						<div className="error-message-wrapper text-danger px-4 py-1">
							<ErrorMessage
								name="confirm"
								component="div"
								className="error-message"
							/>
						</div>
						<div className="input-group m-input-group">
							<span className="input-group-text full-radius">
								<img
									src="/icons/giftbox-gift-svgrepo-com.svg"
									alt="fonticon"
									width={24}
								/>
							</span>
							<Field
								type="text"
								className="form-control full-radius"
								placeholder="Referral code (Optional)"
								name="referralCode"
							/>
						</div>
						<div className="error-message-wrapper text-danger px-4 py-1">
							<ErrorMessage
								name="referralCode"
								component="div"
								className="error-message"
							/>
						</div>
						<div className="text-center mt-5">
							<button
								type="submit"
								disabled={isSubmitting}
								className="btn btn-primary full-radius btn-purple w-250"
							>
								CREATE
							</button>
						</div>
					</Form>
				)}
			</Formik>
			<div className="d-flex align-items-center mt-4 w-250 mx-auto">
				<hr className="flex-grow-1 opacity-100" />
				<span className="px-3">OR</span>
				<hr className="flex-grow-1 opacity-100" />
			</div>
			<div className="d-flex justify-content-center mt-4 Nunito-Black lead">
				Already have an account?
				<Link to="/auth/signin" className="ms-3 Nunito-Black color-purple">
					LOGIN
				</Link>
			</div>
		</>
	);
}
