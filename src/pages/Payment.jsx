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
import SweetAlert2 from "react-sweetalert2";

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
	const [loading, setLoading] = useState(true);
	const [dirty, setDirty] = useState(false);
	const [swalProps, setSwalProps] = useState({});
	const [providerListError, setProviderListError] = useState("");
	const [providerValidatorError, setProviderValidatorError] = useState("");

	useEffect(() => {
		loadProviders();
	}, []);

	const loadProviders = () => {
		setLoading(true);
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
				setPaymentProviders(response.data.data);
			})
			.catch((error) => {
				// console.log(error);
				setProviderListError(t(error));
				// dispatch(modalError(t(error)));
			})
			.finally(() => {
				setLoading(false);
			});
	};

	console.log(formData);

	useEffect(() => {
		if (paymentPlatformId) {
			loadValidator();
		}
	}, [paymentPlatformId]);

	const loadValidator = () => {
		setProviderValidatorError("");
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
				let tmpFormData = {};
				Object.keys(response.data.data.form_data)
					.filter((key) => response.data.data.form_data[key].displayed)
					.forEach((key) => {
						tmpFormData[key] = {
							...response.data.data.form_data[key],
							value: "",
							match: false,
						};
					});
				setFormData(tmpFormData);
			})
			.catch((error) => {
				setProviderValidatorError(t(error));
			});
	};

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
		setDirty(true);
		if (Object.keys(formData).some((key) => !formData[key].match)) {
			return;
		}
		let data = {
			userId: user.uid,
			userCountry: user.country,
			userLanguage: language,
			username: user.username,
			link_generator_body_extras: selectedProvider.link_generator_body_extras,
			platform: "web",
		};
		Object.keys(formData).map((key) => {
			data[key] = formData[key].value;
		});

		setProcessing(true);
		axios
			.post(selectedProvider.link_generator_url, data, {
				headers: {
					Authorization: `Bearer ${user.accessToken}`,
				},
			})
			.then((response) => {
				if (response.data.error) {
					throw response.data.error[language];
				}

				if (response.data.field_error) {
					throw Object.keys(response.data.field_error)
						.map((key) => response.data.field_error[key][language])
						.join("\n");
				}

				if (selectedProvider.return_type == "payment_link") {
					window.location.href =
						response.data.data[selectedProvider.return_type];
				} else if (selectedProvider.return_type == "html_text") {
					setSwalProps({
						show: true,
						// title: t("Success"),
						// text: response.data.data[selectedProvider.return_type],
						html: response.data.data[selectedProvider.return_type],
						icon: "success",
						customClass: {
							confirmButton: "btn btn-primary btn-block",
						},
					});

					// dispatch(
					// 	modalError(response.data.data[selectedProvider.return_type])
					// );
				}
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
				setProcessing(false);
			});
	};

	return (
		<MDBContainer className="p-4 pb-0" style={{ maxWidth: 720 }}>
			<SweetAlert2
				{...swalProps}
				onResolve={() => setSwalProps({ show: false })}
			/>
			<MDBTabsContent>
				<MDBTabsPane open={active == "chooseMethod"} id="chooseMethod">
					<div className="d-flex align-items-center mb-2">
						<MDBBtn color="link" floating onClick={goBack}>
							<MDBIcon fas icon="arrow-left" color="primary" size="2x" />
						</MDBBtn>
						<MDBTypography tag="h4" className="font-black mb-0 ms-2">
							{t("Add Funds")}
						</MDBTypography>
					</div>
					<MDBTypography tag="p" className="text-muted">
						{t("Choose a payment method:")}
					</MDBTypography>

					{!loading ? (
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
													style={{ height: 120, background: "whitesmoke" }}
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
					) : (
						<div className="text-center mt-5">
							<MDBSpinner color="primary" />
						</div>
					)}

					<MDBTypography tag="p" className="text-center text-danger">
						{providerListError && !loading ? (
							<>
								{providerListError}{" "}
								<MDBTypography tag={Link} onClick={loadProviders}>
									{t("Retry")}
								</MDBTypography>
							</>
						) : (
							!loading &&
							paymentProviders.length == 0 &&
							t("No payment methods available")
						)}
					</MDBTypography>
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
							{t("Payment Info")}
						</MDBTypography>
					</div>
					<MDBTypography tag="p" className="text-muted">
						{t("Fill in the information below and press pay.")}
					</MDBTypography>

					{selectedProvider?.payment_provider_id ? (
						<>
							<label>{t("Payment Method")}:</label>
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
											style={{ background: "whitesmoke" }}
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
								return (
									<div key={field.index} className="mb-5 position-relative">
										<label>{field.field_name[language]}</label>
										<InputGroup className="bg-white">
											<Input
												type={field.keyboard_type}
												value={field.value}
												name={key}
												onChange={setFieldValue}
												placeholder={field.example_hint[language]}
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
													{dirty && field.regex_error[language]}
												</div>
											)}
										</div>
									</div>
								);
							})}

							<div className="w-250 mx-auto">
								<MDBBtn
									color="success"
									size="lg"
									className="font-black"
									block
									disabled={processing}
									onClick={handlePayment}
								>
									{processing ? (
										<MDBSpinner
											style={{ width: 18, height: 18 }}
											color="light"
										/>
									) : (
										t("Pay")
										//  +
										// " " +
										// (dirty ?
										// 	`( ${
										// 		Object.keys(formData).filter(
										// 			(key) => !formData[key].match
										// 		).length
										// 	} ${t("Errors")} )` : "")
									)}
								</MDBBtn>
							</div>
						</>
					) : providerValidatorError ? (
						<MDBTypography tag="p" className="text-center text-danger">
							{providerValidatorError}{" "}
							<MDBTypography tag={Link} onClick={loadValidator}>
								{t("Retry")}
							</MDBTypography>
						</MDBTypography>
					) : (
						<div className="text-center mt-5">
							<MDBSpinner color="primary" />
						</div>
					)}
				</MDBTabsPane>
			</MDBTabsContent>
		</MDBContainer>
	);
};

export default Payment;
