import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { firebaseSignIn2 } from "../firebaseAPI";
import { MDBBtn, MDBIcon, MDBSpinner } from "mdb-react-ui-kit";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { modalError, showSupport } from "../store/appSlice";
import { setTmpUser } from "../store/authSlice";
// import "./styles.css";

export default function Signin() {
	const { t, i18n } = useTranslation();
	const navigate = useNavigate();
	const [visiblePassword, setVisiblePassword] = useState(false);
	const dispatch = useDispatch();

	const togglePasswordVisible = () => {
		setVisiblePassword(!visiblePassword);
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
			.then((user) => {
				const { accessToken, displayName, email, uid } = user;
				dispatch(setTmpUser({ accessToken, displayName, email, uid }));
				// navigate("/");
			})
			.catch((error) => {
				dispatch(modalError(t(error)));
			})
			.finally(() => {
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
				<h1 className="text-center font-black mb-4 hover-animate">
					{t("Log in")}
				</h1>
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
											event.target.value.replace(/ /g, "").trim()
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
										<MDBSpinner style={{ width: 22, height: 22 }}>
											<span className="visually-hidden">Loading...</span>
										</MDBSpinner>
									) : (
										<span>t("LOGIN")</span>
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
					<span
						className="ms-3 font-black text-primary cursor-pointer"
						onClick={() => dispatch(showSupport())}
					>
						{t("Contact Us")}
					</span>
				</div>
			</div>
		</motion.div>
		// </AnimatePresence>
	);
}
