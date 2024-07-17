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
import { fetchUserData, firebaseChangePassword } from "../firebaseAuth";
import SweetAlert2 from "react-sweetalert2";

const Account = () => {
	const user = useSelector((state) => state.auth.user);
	const [swalProps, setSwalProps] = useState({});
	const { t, i18n } = useTranslation();
	const [visiblePassword, setVisiblePassword] = useState(false);
	const [visiblePassword2, setVisiblePassword2] = useState(false);

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
		firebaseChangePassword(currentPassword, password).then(() => {
			setSwalProps({
				show: true,
				title: "Success",
				text: t("Your password has been changed successfully."),
				icon: "success",
				customClass: {
					confirmButton: "btn btn-primary btn-block",
				},
				preConfirm: () => {
					setSwalProps({ show: false });
				},
			});
			resetForm();
		}).catch((error) => {
			console.log(error);
			setSwalProps({
				show: true,
				title: "Error",
				text: t(error),
				icon: "error",
				customClass: {
					confirmButton: "btn btn-primary btn-block",
				},
				preConfirm: () => {
					setSwalProps({ show: false });
				},
			});
		}).finally(() => {
			setSubmitting(false);
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
		<SweetAlert2 {...swalProps} />
			<MDBCard className="mb-3">
				<MDBCardBody>
					<MDBCardTitle className="font-black">
						{t("Account Details")}
					</MDBCardTitle>
					{/* <MDBCardSubTitle>Card subtitle</MDBCardSubTitle> */}
					<MDBCardText>
						<span className="font-black">
							{t("Username")}:
							</span> {user.displayName}
					</MDBCardText>

					<MDBCard border="2">
						<MDBCardBody>
							<div>
								<span className="font-black-">
									{t("Current Discount Applied")}:
									</span>{" "}
								<span className="text-primary">{user.discount ? `-${user.discount}%` : "None"}</span>
							</div>
							<div>
								<span className="font-black-">
									{t("Discount Uses Left")}:
									</span>{" "}
								<span className="text-primary">{user.discountUsesLeft}</span>
							</div>
						</MDBCardBody>
					</MDBCard>
				</MDBCardBody>
			</MDBCard>
			<MDBCard>
				<MDBCardBody>
					<MDBCardTitle className="font-black">
						{t("Security")}
					</MDBCardTitle>

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
										type="submit" className="w-200"
										size="lg" block
										rounded
										disabled={isSubmitting}
									>
										{isSubmitting ? (
											<MDBSpinner
												style={{ width: 22, height: 22 }}
											>
												<span className="visually-hidden">{t("Loading")}...</span>
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
