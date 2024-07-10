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
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { fetchUserData } from "../firebaseAuth";

const Account = () => {
	const user = useSelector((state) => state.auth.user);

	const { t, i18n } = useTranslation();
	const [visiblePassword, setVisiblePassword] = useState(false);

	useEffect(() => {
		console.log('--')
		fetchUserData(user.uid).then((userData) => {
			console.log(userData);
		});
	}, [user]);

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

	const onSubmit = async (values, { setSubmitting }) => {};

	const togglePasswordVisible = () => {
		setVisiblePassword(!visiblePassword);
	};

	return (
		<MDBContainer className="py-4">
			<MDBCard className="mb-3">
				<MDBCardBody>
					<MDBCardTitle className="font-black">Account Details</MDBCardTitle>
					{/* <MDBCardSubTitle>Card subtitle</MDBCardSubTitle> */}
					<MDBCardText>
						<span className="font-black">Username:</span> {user.displayName}
					</MDBCardText>

					<MDBCard border="2">
						<MDBCardBody className="p-3">
							<div>
								<span className="font-black-">Current Discount Applied:</span>{" "}
								<span className="text-primary">{user.discount}</span>
							</div>
							<div>
								<span className="font-black-">Discount uses left:</span>{" "}
								<span className="text-primary">{user.discountUsesLeft}</span>
							</div>
						</MDBCardBody>
					</MDBCard>
				</MDBCardBody>
			</MDBCard>
			<MDBCard>
				<MDBCardBody>
					<MDBCardTitle className="font-black">Security</MDBCardTitle>

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
									type={visiblePassword ? "text" : "password"}
									className="form-control"
									placeholder={t("Current Password")}
									name="currentPassword"
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
										size="lg"
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
											t("save")
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
