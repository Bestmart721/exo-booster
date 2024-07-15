import {
	MDBBtn,
	MDBCard,
	MDBCardBody,
	MDBCardFooter,
	MDBCardHeader,
	MDBCardImage,
	MDBCardTitle,
	MDBCol,
	MDBContainer,
	MDBIcon,
	MDBRow,
	MDBSpinner,
	MDBTabsContent,
	MDBTabsPane,
	MDBTypography,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Input, InputGroup } from "reactstrap";
import axios from "axios";
import { useLanguage } from "../layouts/LanguageContext";
import { modalError } from "../store/appSlice";
import { useTranslation } from "react-i18next";

const Payment = () => {
	const { t, i18n } = useTranslation();
	const [active, setActive] = useState("chooseMethod");
	const navigate = useNavigate();
	const user = useSelector((state) => state.auth.user);
	const { language } = useLanguage();
	const [paymentProviders, setPaymentProviders] = useState([]);
	const [paymentPlatformId, setPaymentPlatformId] = useState(null);
	const [selectedProvider, setSelectedProvider] = useState({});
	const [formData, setFormData] = useState({});
	const dispatch = useDispatch();
	const [processing, setProcessing] = useState(false);

	useEffect(() => {
		axios
			.post(
				`https://paymentprocessor-l2ugzeb65a-uc.a.run.app/`,
				{
					userId: user.uid,
					userCountry: user.country,
					userLanguage: language,
					step: "providerList",
				},
				{
					headers: {
						Authorization: `Bearer ${user.accessToken}`,
					},
				}
			)
			.then((response) => {
				console.log(response.data);
				setPaymentProviders(response.data.data);
			})
			.catch((error) => {
				console.log(error);
				dispatch(modalError(t(error)));
			});
	}, []);

	useEffect(() => {
		if (paymentPlatformId) {
			setSelectedProvider({});
			axios
				.post(
					`https://paymentprocessor-l2ugzeb65a-uc.a.run.app/`,
					{
						userId: user.uid,
						userCountry: user.country,
						userLanguage: language,
						step: "providerValidator",
						paymentPlatformId: paymentPlatformId,
					},
					{
						headers: {
							Authorization: `Bearer ${user.accessToken}`,
						},
					}
				)
				.then((response) => {
					setSelectedProvider(response.data.data);
					console.log(response.data.data);
					let tmpFormData = {};
					Object.keys(response.data.data.form_data).map((key) => {
						tmpFormData[key] = {
							...response.data.data.form_data[key],
							value: "",
							match: true,
						};
					});
					setFormData(tmpFormData);
				})
				.catch((error) => {
					console.log(error);
					dispatch(modalError(t(error)));
				});
		}
	}, [paymentPlatformId]);

	const goBack = () => {
		navigate(-1);
	};

	const setFieldValue = (event) => {
		const key = event.target.name;
		const value = event.target.value;
		setFormData({
			...formData,
			[key]: {
				...formData[key],
				value: value,
				match: formData[key].regex
					? new RegExp(formData[key].regex).test(value)
					: true,
			},
		});
	};

	const handlePayment = () => {
		let data = {
			userId: user.uid,
			userCountry: user.country,
			userLanguage: language,
			username: user.username,
			link_generator_body_extras: selectedProvider.link_generator_body_extras,
		};
		Object.keys(formData).map((key) => {
			data[key] = formData[key].value;
		});

		setProcessing(true);
		axios
			.post(
				"https://cors-anywhere.herokuapp.com/" +
					selectedProvider.link_generator_url,
				data,
				{
					headers: {
						Authorization: `Bearer ${user.accessToken}`,
					},
				}
			)
			.then((response) => {
				if (response.data.field_error) {
					throw response.data.field_error[language];
				}

				if (selectedProvider.return_type == "payment_link") {
					window.location.href = response.data.data[selectedProvider.return_type];
				} else if (selectedProvider.return_type == "html_text") {
					dispatch(modalError(response.data.data[selectedProvider.return_type]));
				}
			})
			.catch((error) => {
				console.log(error);
				dispatch(modalError(t(error)));
			}).finally(() => {
				setProcessing(false);
			});
	};

	return (
		<MDBContainer className="p-4 pb-0" style={{ maxWidth: 720 }}>
			<MDBTabsContent>
				<MDBTabsPane open={active == "chooseMethod"} id="chooseMethod">
					<div className="d-flex align-items-center mb-2">
						<MDBBtn color="link" floating onClick={goBack}>
							<MDBIcon fas icon="arrow-left" color="primary" size="2x" />
						</MDBBtn>
						<MDBTypography tag="h4" className="font-black mb-0 ms-2">
							Add Funds
						</MDBTypography>
					</div>
					<MDBTypography tag="p" className="text-muted">
						Choose a payment method:
					</MDBTypography>

					<MDBRow>
						{paymentProviders
							.sort((a, b) => a.order_index - b.order_index)
							.map((provider) => (
								<MDBCol md="4" key={provider.order_index}>
									<motion.div
										initial={{ scale: 1 }}
										transition={{ ease: "easeInOut", duration: 0.2 }}
										whileHover={{ scale: 1.05 }}
									>
										<MDBCard
											className="mb-4"
											onClick={() => {
												setActive("paymentInfo");
												setPaymentPlatformId(provider.payment_platform_id);
											}}
										>
											<MDBCardHeader
												style={{ backgroundColor: "#feca05", height: 120 }}
												className="d-flex align-items-center p-2"
											>
												<MDBCardImage
													src={provider.thumbnail_url}
													alt={provider.display_name[language]}
													className="img-fluid mx-auto"
													width={200}
												/>
											</MDBCardHeader>
											<MDBCardFooter>
												<MDBCardTitle
													tag="h5"
													className="font-black mb-0 text-center"
												>
													{provider.display_name[language]}
												</MDBCardTitle>
											</MDBCardFooter>
										</MDBCard>
									</motion.div>
								</MDBCol>
							))}
					</MDBRow>
				</MDBTabsPane>

				<MDBTabsPane open={active == "paymentInfo"} id="paymentInfo">
					<div className="d-flex align-items-center mb-2">
						<MDBBtn
							color="link"
							floating
							onClick={() => setActive("chooseMethod")}
						>
							<MDBIcon fas icon="arrow-left" color="primary" size="2x" />
						</MDBBtn>
						<MDBTypography tag="h4" className="font-black mb-0 ms-2">
							Payment Info
						</MDBTypography>
					</div>
					<MDBTypography tag="p" className="text-muted">
						Fill in the information below and press pay.
					</MDBTypography>

					{selectedProvider?.payment_provider_id ? (
						<>
							<label>Payment method:</label>
							<MDBCard className="mb-4">
								<MDBRow>
									<MDBCol className="align-self-center">
										<MDBCardBody className="pe-0">
											<MDBTypography
												tag="h5"
												className="font-black text-center mb-0"
											>
												{
													paymentProviders.find(
														(provider) =>
															provider.payment_platform_id == paymentPlatformId
													).display_name[language]
												}
											</MDBTypography>
										</MDBCardBody>
									</MDBCol>
									<MDBCol style={{ maxWidth: 150 }}>
										<div
											className="p-2 rounded-5 rounded-start-0 h-100 align-content-center"
											style={{ backgroundColor: "#feca05" }}
										>
											<MDBCardImage
												src={selectedProvider.thumbnail_url}
												alt="mtn mobile money"
												className="img-fluid"
											/>
										</div>
									</MDBCol>
								</MDBRow>
							</MDBCard>

							{Object.keys(formData).map((key) => {
								const field = formData[key];
								if (true) {
									//field.displayed
									return (
										<div key={field.index} className="mb-5 position-relative">
											<label>{field.field_name[language]}</label>
											<InputGroup className="bg-white">
												<Input
													type={field.keyboard_type}
													value={field.value}
													name={key}
													onChange={setFieldValue}
													placeholder={
														field.example_hint[language] &&
														"e.g. " + field.example_hint[language]
													}
												/>
												{field.currency_widget && (
													<MDBBtn outline color="primary">
														{selectedProvider.currency}
													</MDBBtn>
												)}
											</InputGroup>

											<div className="small position-absolute line-height-small-">
												{field.bottom_text[language] && (
													<div>{field.bottom_text[language]}</div>
												)}
												{field.regex && !field.match && (
													<div className="text-danger">
														{field.regex_error[language]}
													</div>
												)}
											</div>
										</div>
									);
								}
							})}

							<div className="w-250 mx-auto">
								<MDBBtn
									color="success"
									size="lg"
									className="font-black"
									block
									disabled={Object.keys(formData).some(
										(key) => !formData[key].match
									) || processing}
									onClick={handlePayment}
								>
									{
										processing ? (
											<MDBSpinner color="light" />
										) : (
											"Pay"
										)
									}
								</MDBBtn>
							</div>
						</>
					) : (
						<div className="text-center">
							<MDBSpinner color="primary" />
						</div>
					)}
				</MDBTabsPane>
			</MDBTabsContent>
		</MDBContainer>
	);
};

export default Payment;
