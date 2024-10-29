import React, { useEffect, useState } from "react";
import {
	MDBCard,
	MDBCardBody,
	MDBCardTitle,
	MDBCardSubTitle,
	MDBCardText,
	MDBCardLink,
	MDBContainer,
	MDBIcon,
	MDBBtn,
	MDBSpinner,
	MDBTypography,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { fetchUserData, firebaseChangePassword } from "../firebaseAPI";
import SweetAlert2 from "react-sweetalert2";
import Select, { components } from "react-select";
import axios from "axios";
import { useLanguage } from "../layouts/LanguageContext";
import { setUser } from "../store/authSlice";

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

const Account = () => {
	const user = useSelector((state) => state.auth.user);
	const [swalProps, setSwalProps] = useState({});
	const { t, i18n } = useTranslation();
	const [visiblePassword, setVisiblePassword] = useState(false);
	const [visiblePassword2, setVisiblePassword2] = useState(false);
	const [countries, setCountries] = useState([]);
	const [curCountry, setCurCountry] = useState("");
	const [processing, setProcessing] = useState(false);
	const { language } = useLanguage();
	const dispatch = useDispatch();
	const [countryPlaceHolder, setCountryPlaceHolder] = useState(
		t("Loading available countries...")
	);

	const retry = () => {
		hideErrorLocal();
		loadSignupData();
	};

	const loadSignupData = async () => {
		setCountryPlaceHolder(t("Loading available countries..."));
		axios
			.post(`https://getsupportedcountries-l2ugzeb65a-uc.a.run.app/`, {
				userId: user.uid,
			})
			.then((response) => {
				const global = response.data.global;
				delete response.data.global;
				response.data.global = global;

				let cs = Object.keys(response.data).map((key) => response.data[key]);
				cs = cs.map((country) => ({
					...country,
					value: country.id,
					label: country.display_name[language],
				}));
				setCountries(cs);
				setCountryPlaceHolder(t("Choose your country"));
				setCurCountry(cs.find((c) => c.name == user.country));
			})
			.catch((error) => {
				setCountryPlaceHolder(t("Could not get available countries."));
			});
	};

	useEffect(() => {
		loadSignupData();
	}, []);

	const initialValues = {
		country: "",
		currency: "",
		username: "",
		currentPassword: "",
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
		currentPassword: Yup.string().required(t("Current password is required.")),
		password: Yup.string()
			.required(t("Password cannot be empty."))
			.min(6, t("Password must be at least 6 characters.")),
		confirm: Yup.string().oneOf(
			[Yup.ref("password"), null],
			t("Passwords must match.")
		),
	});

	const onSubmit = (values, { setSubmitting, resetForm }) => {
		const { currentPassword, password } = values;

		setSubmitting(true);
		firebaseChangePassword(currentPassword, password)
			.then(() => {
				setSwalProps({
					show: true,
					title: t("Success"),
					text: t("Your password has been changed successfully."),
					icon: "success",
					customClass: {
						confirmButton: "btn btn-primary btn-block",
					},
				});
				resetForm();
			})
			.catch((error) => {
				console.log(error);
				setSwalProps({
					show: true,
					title: t("Error"),
					text: t(error),
					icon: "error",
					customClass: {
						confirmButton: "btn btn-primary btn-block",
					},
				});
			})
			.finally(() => {
				setSubmitting(false);
			});
	};

	const selectNewCountry = (country) => {
		setProcessing(true);
		axios
			.post(
				`https://changeusercountry-l2ugzeb65a-uc.a.run.app/`,
				{
					userId: user.uid,
					newCountry: country,
				},
				{
					headers: {
						Authorization: `Bearer ${user.accessToken}`,
					},
				}
			)
			.then((response) => {
				if (response.data.error) {
					throw response.data.error[language];
				}

				const {
					new_country,
					new_country_currency,
					affiliate_balance,
					balance,
				} = response.data;
				dispatch(
					setUser({
						...user,
						country: new_country,
						currency: new_country_currency,
						affiliate_balance,
						balance,
					})
				);

				setSwalProps({
					show: true,
					title: t("Success"),
					text: t("Your country has been changed successfully."),
					icon: "success",
					customClass: {
						confirmButton: "btn btn-primary btn-block",
					},
					onResolve: () => {
						console.log("reloading...");
						window.location.reload();
					},
				});
			})
			.catch((error) => {
				setSwalProps({
					show: true,
					title: t("Error"),
					text: t(error),
					icon: "error",
					customClass: {
						confirmButton: "btn btn-primary btn-block",
					},
				});
			})
			.finally(() => {
				setProcessing(false);
			});
	};

	const togglePasswordVisible = () => {
		setVisiblePassword(!visiblePassword);
	};
	const togglePasswordVisible2 = () => {
		setVisiblePassword2(!visiblePassword2);
	};

	return (
		<MDBContainer className="py-4">
			<SweetAlert2
				onResolve={() =>
					setSwalProps({
						show: false,
					})
				}
				{...swalProps}
			/>
			<MDBCard className="mb-3">
				<MDBCardBody>
					<MDBCardTitle className="font-black">
						{t("Account Details")}
					</MDBCardTitle>
					{/* <MDBCardSubTitle>Card subtitle</MDBCardSubTitle> */}
					<MDBCardText>
						<span className="font-black">{t("Username")}:</span>{" "}
						{user.displayName}
					</MDBCardText>

					<MDBCard border="2">
						<MDBCardBody>
							<div>
								<span className="font-black-">
									{t("Current Discount Applied")}:
								</span>{" "}
								<span className="text-primary">
									{user.discount ? `-${user.discount}%` : t("None")}
								</span>
							</div>
							<div>
								<span className="font-black-">{t("Discount Uses Left")}:</span>{" "}
								<span className="text-primary">{user.discountUsesLeft}</span>
							</div>
						</MDBCardBody>
					</MDBCard>
				</MDBCardBody>
			</MDBCard>

			<MDBCard className="mb-3">
				<MDBCardBody>
					<MDBCardTitle className="font-black">
						{t("Current Country")}:
					</MDBCardTitle>
					<div className="w-465 mx-auto">
						<Select
							isSearchable={false}
							className="input-group-lg rounded-pill shadow"
							placeholder={t("Choose your country")}
							name="country"
							value={curCountry}
							options={countries}
							onChange={(value) => {
								if (value.name == curCountry.name) {
									return;
								}
								setCurCountry(value);
								selectNewCountry(value.name);
							}}
							isDisabled={
								countryPlaceHolder == t("Loading available countries...") ||
								processing
							}
							styles={customStyles}
							components={{
								Option: (props) => (
									<components.Option {...props} className="country-option">
										{props.data.name == "global" ? (
											<MDBIcon
												fas
												icon="globe"
												size="lg"
												className="country-logo px-1"
											/>
										) : (
											<span
												className={`country-logo fi fi-${props.data.country_code?.toLowerCase()} fs-5`}
											></span>
										)}
										{props.data.label}
									</components.Option>
								),
								SingleValue: ({ children, ...props }) => (
									<components.SingleValue {...props}>
										<MDBIcon fas icon="globe" size="lg" className="me-4" />
										{props.data.name != "global" && (
											<span
												className={`selected-logo fi fi-${props.data.country_code?.toLowerCase()} fs-5`}
											></span>
										)}
										{children}
										{processing && (
											<MDBSpinner size="sm" className="ms-2" color="primary" />
										)}
									</components.SingleValue>
								),
								Placeholder: () => (
									<div style={{ display: "flex", alignItems: "center" }}>
										<MDBIcon fas icon="globe" size="lg" className="me-4" />
										<MDBTypography
											tag="span"
											color={
												countryPlaceHolder == t("Choose your country")
													? "black"
													: countryPlaceHolder ==
														t("Could not get available countries.")
														? "danger"
														: "secondary"
											}
										>
											{countryPlaceHolder}
											{countryPlaceHolder ==
												t("Could not get available countries.") && (
													<MDBIcon
														fas
														icon="refresh"
														size="lg"
														className="ms-2 cursor-pointer"
														onClick={loadSignupData}
													/>
												)}
										</MDBTypography>
									</div>
								),
							}}
						/>
					</div>
				</MDBCardBody>
			</MDBCard>

			<MDBCard>
				<MDBCardBody>
					<MDBCardTitle className="font-black">{t("Security")}</MDBCardTitle>

					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={onSubmit}
					>
						{({ isSubmitting, handleChange, setFieldValue }) => (
							<Form className="w-465 mx-auto">
								<div className="input-group input-group-lg rounded-pill shadow">
									<span className="input-group-text rounded-start-pill bg-white">
										<MDBIcon fas icon="lock-open" size="lg" />
									</span>
									<Field
										type={visiblePassword2 ? "text" : "password"}
										className="form-control"
										placeholder={t("Current Password")}
										name="currentPassword"
									/>
									<span className="input-group-text rounded-end-pill bg-white">
										<MDBIcon
											far
											icon={visiblePassword2 ? "eye" : "eye-slash"}
											onClick={togglePasswordVisible2}
											size="lg"
										/>
									</span>
								</div>
								<div className="error-message-wrapper text-danger px-4">
									<ErrorMessage
										name="currentPassword"
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

								<div className="text-end mt-2 mx-auto">
									<MDBBtn
										type="submit"
										className="w-200"
										size="lg"
										block
										rounded
										disabled={isSubmitting}
									>
										{isSubmitting ? (
											<MDBSpinner style={{ width: 22, height: 22 }}>
												<span className="visually-hidden">
													{t("Loading")}...
												</span>
											</MDBSpinner>
										) : (
											<span>{t("save")}</span>
										)}
									</MDBBtn>
								</div>
							</Form>
						)}
					</Formik>
				</MDBCardBody>
			</MDBCard>
		</MDBContainer>
	);
};

export default Account;
