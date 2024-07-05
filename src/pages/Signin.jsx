import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { firebaseSignIn2 } from "../firebaseAuth";
import {
	MDBBtn,
	MDBIcon,
	MDBModal,
	MDBModalBody,
	MDBModalContent,
	MDBModalDialog,
	MDBModalFooter,
	MDBModalHeader,
	MDBModalTitle,
} from "mdb-react-ui-kit";
import { set } from "firebase/database";
// import { getFirestore } from "firebase-admin/firestore";
// import { initializeApp } from "firebase-admin/app";

export default function Signin() {
	const { t, i18n } = useTranslation();
	const [visiblePassword, setVisiblePassword] = useState(false);
	const [centredModal, setCentredModal] = useState(false);
	const [supportModal, setSupportModal] = useState(false);
	const [supportContacts, setSupportContacts] = useState({});
	const [loading, setLoading] = useState(true);
	const [modalText, setModalText] = useState("");
	const [user, setUser] = useState(null);

	useEffect(() => {
		// fetchSupportContacts();
		setSupportContacts({
			email: "supportemail@exobooster.com",
			telegram: "@exobooster",
			whatsapp: "+237 674349485",
		});
		setLoading(false);
	}, []);

	const fetchSupportContacts = () => {
		initializeApp();
		const db = getFirestore();
		db.collection("Admin")
			.doc("SupportContacts")
			.get()
			.then((doc) => {
				if (doc.exists) {
					setSupportContacts(doc.data().contacts);
				}
				setLoading(false);
			})
			.catch((error) => {
				console.log("Error getting document:", error);
				setLoading(false);
			});
	};

	const togglePasswordVisible = () => {
		setVisiblePassword(!visiblePassword);
	};

	const toggleOpen = () => {
		setCentredModal(!centredModal);
	};

	const toggleSupportOpen = () => {
		setSupportModal(!supportModal);
	};

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

	const handleSubmit = (values, { setSubmitting }) => {
		firebaseSignIn2(values.username, values.password)
			.then((response) => {
				setUser(response.user);
				navigate("/home");
			})
			.catch((error, a, b) => {
				console.log(error, a, b);
				setModalText(error);
				setCentredModal(true);
				setSubmitting(false);
			});
	};

	if (loading) {
		return <div>Loading...</div>;
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
								<MDBIcon fas icon="unlock" size="lg" />
							</span>
							<Field
								name="password"
								type={visiblePassword ? "text" : "password"}
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
							<MDBBtn
								type="submit"
								size="lg"
								block
								rounded
								disabled={isSubmitting}
							>
								LOGIN
							</MDBBtn>
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
				Don't have an account ?
				<Link to="/auth/signup" className="ms-3 font-black text-primary">
					CREATE
				</Link>
			</div>
			<div className="d-flex justify-content-center mt-4 font-black lead">
				Have a problem?
				<Link className="ms-3 font-black text-primary" onClick={toggleSupportOpen}>
					Contact Us
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
							<img src="/favcon 2.png" className="img-fluid mb-5" alt="logo" />
							<h3 className="mb-0">{t(modalText)}</h3>
						</MDBModalBody>
						<MDBModalFooter>
							<MDBBtn color="primary" onClick={toggleOpen}>
								OK
							</MDBBtn>
						</MDBModalFooter>
					</MDBModalContent>
				</MDBModalDialog>
			</MDBModal>

			<MDBModal
				tabIndex="-1"
				open={supportModal}
				onClose={() => setSupportModal(false)}
			>
				<MDBModalDialog centered style={{ maxWidth: 400 }}>
					<MDBModalContent>
						<MDBModalBody className="text-center py-5">
							<img src="/favcon 2.png" className="img-fluid mb-5" alt="logo" />
							<h3 className="font-black">Have a problem?</h3>
							<div className="lead">Kindly contact us through email:</div>
							<div className="lead text-primary">
								<a href={`mailto:${supportContacts.email}`} target="_blank">
									{supportContacts.email}
								</a>
							</div>
							<div className="lead">Whatsapp:</div>
							<div className="lead text-primary">
								<a
									href={`https://wa.me/${supportContacts.whatsapp}`}
									target="_blank"
								>
									{supportContacts.whatsapp}
								</a>
							</div>
							<div className="lead">Or Telegram:</div>
							<div className="lead text-primary">
								<a
									href={`https://t.me/${supportContacts.telegram.replace(
										/@/g,
										""
									)}`}
									target="_blank"
								>
									{supportContacts.telegram}
								</a>
							</div>
						</MDBModalBody>
						<MDBModalFooter>
							<MDBBtn color="primary" onClick={toggleSupportOpen}>
								OK
							</MDBBtn>
						</MDBModalFooter>
					</MDBModalContent>
				</MDBModalDialog>
			</MDBModal>
		</div>
	);
}
