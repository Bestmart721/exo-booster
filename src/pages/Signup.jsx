import axios from "axios";
import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

export async function loadSignupData() {
	let response = await axios.get(
		`https://cors-anywhere.herokuapp.com/https://getsupportedcountries-l2ugzeb65a-uc.a.run.app/`
	);
	let countries = Object.keys(response.data).map((key) => response.data[key]);
	countries = [
		{ enabled: false, name: "", label: "Choose your country" },
		...countries,
	];
	return { countries };
}

export default function Signup() {
	const { countries } = useLoaderData();
	const { t, i18n } = useTranslation();
	const [curCountry, setCurCountry] = useState("");
	const initialValues = {
		country: "",
		currency: "",
		username: "",
		password: "",
		confirm: "",
		whatsapp_number: "",
		device: { os: "web", userAgent: navigator.userAgent },
		language: (navigator.language || navigator.userLanguage).slice(0, 2) == 'fr' ? 'fr' : 'en',
		referralCode: "",
	};

	const validationSchema = Yup.object().shape({
		username: Yup.string()
			.required(t("Username is required."))
			.min(3, t("Your username should be a minimum of 3 characters."))
			.max(20, t("Your username should be a maximum of 20 characters."))
			.matches(/^[a-zA-Z0-9]+$/, t("Only alphanumeric characters are allowed.")),

		whatsapp_number: Yup.string()
			.required(t("Your Whatsapp number is required."))
			.matches(/^[0-9()+]+$/, t("Only numbers, +, (, and ) are allowed.")),

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
		console.log("-----", values);
		let response = await axios.post(
			`https://cors-anywhere.herokuapp.com/https://createuser-l2ugzeb65a-uc.a.run.app/`,
			values
		);
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
						<div className="position-relative">
							<div className="input-group mb-4 m-input-group">
								<span className="input-group-text full-radius">
									<img src="/icons/user.svg" alt="user" />
								</span>
								<Field
									type="text"
									className="form-control full-radius"
									placeholder="Username"
									name="username"
								/>
							</div>
							<ErrorMessage
								name="username"
								component="span"
								className="error-message"
							/>
						</div>
						<div className="position-relative">
							<div className="input-group mb-4 m-input-group">
								<span className="input-group-text full-radius">
									<img src="/icons/user.svg" alt="user" />
								</span>
								<Field
									type="text"
									className="form-control full-radius"
									placeholder="Whatsapp number"
									name="whatsapp_number"
								/>
							</div>
							<ErrorMessage
								name="whatsapp_number"
								component="span"
								className="error-message"
							/>
						</div>
						<div className="position-relative">
							<div className="input-group mb-4 m-input-group">
								<span className="input-group-text full-radius">
									<img
										src={
											(countries.find((c) => c.name == curCountry) &&
												countries.find((c) => c.name == curCountry)
													.flag_img_link) ||
											"/icons/user.svg"
										}
										width="24"
										alt="user"
									/>
								</span>
								<Field
									as="select"
									className="form-control full-radius"
									placeholder="Choose your country"
									name="country"
									value={curCountry}
									onChange={(e) => {
										setCurCountry(e.target.value);
										handleChange(e);
										setFieldValue(
											"currency",
											countries.find((c) => c.name == e.target.value) &&
												countries.find((c) => c.name == e.target.value).currency
										);
									}}
								>
									{countries.map((c) => (
										<option value={c.name} key={c.name} disabled={!c.enabled}>
											{c.name || c.label}
										</option>
									))}
								</Field>
							</div>
							<ErrorMessage
								name="country"
								component="span"
								className="error-message"
							/>
						</div>
						<div className="position-relative">
							<div className="input-group mb-4 m-input-group">
								<span className="input-group-text full-radius">
									<img src="/icons/lock1.svg" alt="user" />
								</span>
								<Field
									type="password"
									className="form-control full-radius"
									placeholder="Password"
									name="password"
								/>
								<span className="input-group-text full-radius">
									<img src="/icons/eye.svg" alt="user" />
								</span>
							</div>
							<ErrorMessage
								name="password"
								component="span"
								className="error-message"
							/>
						</div>
						<div className="position-relative">
							<div className="input-group mb-4 m-input-group">
								<span className="input-group-text full-radius">
									<img src="/icons/lock1.svg" alt="user" />
								</span>
								<Field
									type="text"
									className="form-control full-radius"
									placeholder="Confirm your password"
									name="confirm"
								/>
								<span className="input-group-text full-radius">
									<img src="/icons/eye.svg" alt="user" />
								</span>
							</div>
							<ErrorMessage
								name="confirm"
								component="span"
								className="error-message"
							/>
						</div>
						<div className="position-relative">
							<div className="input-group mb-4 m-input-group">
								<span className="input-group-text full-radius">
									<img src="/icons/user.svg" alt="user" />
								</span>
								<Field
									type="text"
									className="form-control full-radius"
									placeholder="Referral code (Optional)"
									name="referralCode"
								/>
							</div>
							<ErrorMessage
								name="referralCode"
								component="span"
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
