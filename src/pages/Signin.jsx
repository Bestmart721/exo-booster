import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { firebaseSignIn2 } from "../firebaseAuth";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";

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

	const handleSubmit = (values) => {
		firebaseSignIn2(values.username, values.password)
		.then(() => {
			navigate("/home");
		})
	}

	return (
		<div className="pt-100 position-relative">
			<h1 className="text-center font-black mb-4">Log in</h1>
			<Formik
				initialValues={{
					username: "",
					password: "",
				}}
				validationSchema={SignInSchema}
				onSubmit={handleSubmit}
			>
				{({ isSubmitting, errors, touched }) => (
					<Form className="w-465 mx-auto">
						<div className="input-group input-group-lg rounded-pill shadow">
							<span className="input-group-text rounded-start-pill bg-white">
							<MDBIcon far icon="user" size="lg" />
							</span>
							<Field
								name="username"
								type="text"
								className="form-control full-radius rounded-end-pill"
								placeholder="Username"
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
							<MDBIcon fab icon="whatsapp" size="lg" />
							</span>
							<Field
								name="password"
								type={visiblePassword?"text":"password"}
								className="form-control full-radius"
								placeholder="Password"
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
						<MDBBtn type="submit" size="lg" block rounded disabled={isSubmitting}>LOGIN</MDBBtn>
						</div>
					</Form>
				)}
			</Formik>
			<div className="d-flex align-items-center mt-2 w-250 mx-auto">
				<hr className="flex-grow-1 opacity-100" />
				<span className="px-3">OR</span>
				<hr className="flex-grow-1 opacity-100" />
			</div>
			<div className="d-flex justify-content-center mt-4 font-black lead">
				Don't have an account ?{" "}
				<Link to="/auth/signup" className="ms-3 font-black text-primary">
					CREATE
				</Link>
			</div>
		</div>
	);
}
