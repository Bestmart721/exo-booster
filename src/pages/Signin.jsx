import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

export default function Signin() {
	const { t, i18n } = useTranslation();
	const [visiblePassword, setVisiblePassword] = useState(false);
	
	const togglePasswordVisible = () => {	
		setVisiblePassword(!visiblePassword);
	}

	const SignInSchema = Yup.object().shape({
		username: Yup.string()
			.matches(
				/^[a-zA-Z0-9.@]+$/,
				t(
					"Invalid username, should not contain any spaces , or special characters (eg: $ é # â .....)"
				)
			)
			.min(3, t("Username must be at least 3 characters long."))
			.max(20, t("Username must be at most 20 characters long."))
			.required(t("Username is required.")),
		password: Yup.string()
			.min(6, t("Password must be at least 6 characters long."))
			.required(t("Password is required.")),
	});

	return (
		<>
			<h1 className="display-4 text-center Nunito-Black mb-5">Log in</h1>
			<Formik
				initialValues={{
					username: "",
					password: "",
				}}
				validationSchema={SignInSchema}
				onSubmit={(values) => {
					// submit form values to your server
					console.log(values);
				}}
			>
				{({ errors, touched }) => (
					<Form className="w-465 mx-auto">
						<div className="input-group m-input-group">
							<span className="input-group-text full-radius">
								<img src="/icons/user.svg" alt="user" />
							</span>
							<Field
								name="username"
								type="text"
								className="form-control full-radius"
								placeholder="Username"
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
								<img src="/icons/lock1.svg" alt="user" />
							</span>
							<Field
								name="password"
								type={visiblePassword?"text":"password"}
								className="form-control full-radius"
								placeholder="Password"
							/>
							<span className="input-group-text full-radius">
							<img src={`/icons/eye${visiblePassword?"":"-slash"}-svgrepo-com.svg`} onClick={togglePasswordVisible} alt="fonticon" width={24} />
							</span>
						</div>
						<div className="error-message-wrapper text-danger px-4 py-1">
							<ErrorMessage
								name="password"
								component="div"
								className="error-message"
							/>
						</div>
						<div className="text-center mt-5">
							<button
								type="submit"
								className="btn btn-primary full-radius btn-purple w-250"
							>
								LOGIN
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
				Don't have an account ?{" "}
				<Link to="/auth/signup" className="ms-3 Nunito-Black color-purple">
					CREATE
				</Link>
			</div>
		</>
	);
}
