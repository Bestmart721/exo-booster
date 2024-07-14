import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "react-modern-drawer/dist/index.css";
import { Link, useNavigate } from "react-router-dom";
import {
	MDBBtn,
	MDBContainer,
	MDBTabs,
	MDBTabsItem,
	MDBTabsLink,
	MDBTextArea,
	MDBSpinner,
	MDBCard,
	MDBCardBody,
	MDBRow,
	MDBCol,
	MDBIcon,
	MDBTypography,
} from "mdb-react-ui-kit";
import { Input } from "reactstrap";
import { useTranslation } from "react-i18next";
import { modalError, showSupport } from "../store/appSlice";
import { useLanguage } from "../layouts/LanguageContext";
import Select, { components } from "react-select";
import SweetAlert2 from "react-sweetalert2";
// import { Select } from "reactstrap";

const Home = () => {
	const { t, i18n } = useTranslation();
	const { language, switchLanguage } = useLanguage();
	const user = useSelector((state) => state.auth.user);
	const [isOpen, setIsOpen] = React.useState(false);
	const data = useSelector((state) => state.app.services);
	const [selectedOption, setSelectedOption] = useState();
	const totalOrdersCount = useSelector((state) => state.app.totalOrdersCount);
	const [purchaseLoading, setPurchaseLoading] = useState(false);
	const dispatch = useDispatch();
	const [swalProps, setSwalProps] = useState({});
	const navigate = useNavigate();
	const [selected, setSelected] = useState({
		website: "",
		service: "",
		subService: "",
		link: "",
		quantity: "",
		comments: "",
		price: "",
		time: "",
		note: "",
	});

	useEffect(() => {
		if (Object.keys(data).length === 0) {
			return;
		}
		const website = getFirstValue(data);
		const service = getFirstValue(website.services);
		const subService = getFirstValue(service.subservices);
		setSelected((prev) => ({
			...prev,
			website: getFirstKey(data),
			service: getFirstKey(website.services),
			subService: getFirstKey(service.subservices),
		}));
		setSelectedOption({
			...subService,
			label: subService.display_name[language],
			value: subService.subservice_id,
		});
	}, [data]);

	const handleTabClick = (value) => {
		setSelected({
			website: value,
			service: getFirstKey(data[value].services),
			subService: getFirstKey(getFirstValue(data[value].services).subservices),
			link: "",
			quantity: "",
			comments: "",
		});
		const firstSubServices = getFirstValue(
			data[value].services[getFirstKey(data[value].services)].subservices
		);
		setSelectedOption({
			...firstSubServices,
			label: firstSubServices.display_name[language],
			value: firstSubServices.subservice_id,
		});
	};

	const purchase = () => {
		if (!selected.website || !selected.service || !selected.subService) {
			dispatch(modalError("Please select a service."));
			return;
		}
		if (!selected.link) {
			dispatch(modalError("Please enter a link."));
			return;
		}
		
		const type =
			data[selected.website].services[selected.service].subservices[
				selected.subService
			]?.type;
		if (type == 'default' && !selected.quantity) {
			dispatch(modalError("Please enter a quantity."));
			return;
		}
		if (type == 'custom_comments' && !selected.comments) {
			dispatch(modalError("Please enter comments."));
			return
		}
		if (
			selected.quantity <
				data[selected.website].services[selected.service].subservices[
					selected.subService
				]?.min ||
			selected.quantity >
				data[selected.website].services[selected.service].subservices[
					selected.subService
				]?.max
		) {
			dispatch(
				modalError(
					`Please enter a quantity between ${
						data[selected.website].services[selected.service].subservices[
							selected.subService
						]?.min
					} and ${
						data[selected.website].services[selected.service].subservices[
							selected.subService
						]?.max
					}.`
				)
			);
			return;
		}

		setPurchaseLoading(true);
		axios
			.post(
				`https://purchaseserviceglobal-l2ugzeb65a-uc.a.run.app/`,
				{
					userId: user.uid,
					service_id: selected.service,
					sub_service_id: selected.subService,
					type: type,
					link: selected.link,
					quantity: type == 'default' ? Number(selected.quantity) : undefined,
					comments: type == 'custom_comments' ? selected.comments : undefined,
				},
				{
					headers: {
						// "Content-Type": "application/json",
						Authorization: `Bearer ${user.accessToken}`,
					},
				}
			)
			.then((response) => {
				if (response.data.error) {
					throw new Error(response.data.error[language]);
				}
				setSwalProps({
					show: true,
					title: response.data.message[language],
					text: "Purchase Successful!\nYour order has been placed successfully.",
					icon: "success",
					showDenyButton: true,
					customClass: {
						confirmButton: "btn btn-primary btn-block",
						denyButton: "btn btn-primary btn-block",
					},
					confirmButtonText: "View My Order",
					denyButtonText: "Ok",
					preConfirm: () => {
						setSwalProps({ show: false });
						navigate("/orders");
					},
					preDeny: () => {
						setSwalProps({ show: false });
					},
				});
			})
			.catch((error) => {
				// dispatch(modalError(error.message));
				console.log(error.message);
				setSwalProps({
					show: true,
					title: "Purchase failed!",
					text: error.message,
					icon: "error",
					showDenyButton: true,
					customClass: {
						confirmButton: "btn btn-primary btn-block",
						denyButton: "btn btn-primary btn-block",
					},
					confirmButtonText: "View My Order",
					denyButtonText: "Ok",
					preConfirm: () => {
						setSwalProps({ show: false });
						navigate("/orders");
					},
					preDeny: () => {
						setSwalProps({ show: false });
					},
				});
			})
			.finally(() => {
				setPurchaseLoading(false);
			});
	};

	const handleChange = (e) => {
		let overwrite = {};
		switch (e.target.name) {
			case "service":
				const firstSubServices = getFirstValue(
					data[selected.website].services[e.target.value].subservices
				);
				setSelectedOption({
					...firstSubServices,
					label: firstSubServices.display_name[language],
					value: firstSubServices.subservice_id,
				});
				overwrite = {
					subService: firstSubServices.subservice_id,
					link: "",
					quantity: "",
					comments: "",
				};
				break;
			case "subService":
				overwrite = {
					link: "",
					quantity: "",
					comments: "",
				};
				break;
		}
		setSelected({ ...selected, [e.target.name]: e.target.value, ...overwrite });
	};

	function countLines(str) {
		if (str === "") return 0; // Handle empty string case
		return str.trim().split("\n").length;
	}

	function getFirstValue(obj) {
		const keys = Object.keys(obj);
		return keys.length ? obj[keys[0]] : undefined;
	}
	function getFirstKey(obj) {
		const keys = Object.keys(obj);
		return keys.length ? keys[0] : undefined;
	}

	function formatNumber(num = 0) {
		return num.toLocaleString();
	}

	return (
		user.username && (
			<div className="bg-primary-light flex-grow-1 d-flex flex-column">
				<SweetAlert2 {...swalProps} />
				<MDBContainer className="mt-4 d-none d-sm-block w-600">
					<MDBCard className="bg-pink shadow rounded-pill">
						<MDBCardBody className="row px-4">
							<MDBCol className="border-end border-1 d-flex align-items-center px-4">
								<MDBIcon
									color="primary"
									fas
									icon="cart-plus"
									size="2x"
									className="me-3"
								/>
								<div>
									<div className="small" style={{ lineHeight: 1.2 }}>
										Total Orders
									</div>
									<MDBTypography tag="h5" className="mb-0 font-black">
										{formatNumber(totalOrdersCount)}
									</MDBTypography>
									<div className="small" style={{ lineHeight: 1.2 }}>
										3+ years of experience providing SMM services!
									</div>
								</div>
							</MDBCol>
							<MDBCol className=" d-flex align-items-center px-4">
								<MDBIcon
									color="primary"
									fas
									icon="dollar-sign"
									size="2x"
									className="me-3"
								/>
								<div>
									<div className="small" style={{ lineHeight: 1.2 }}>
										You Have Spent
									</div>
									<MDBTypography tag="h5" className="mb-0 font-black">
										{formatNumber(user.amount_spent)}{" "}
										<span className="text-transform-uppercase">
											{user.currency}
										</span>
									</MDBTypography>
									<div className="small" style={{ lineHeight: 1.2 }}>
										You have currently
										<br />
										<span className="font-black">
											{formatNumber(user.balance)}{" "}
											<span className="text-transform-uppercase">
												{user.currency}
											</span>
										</span>
										<br />
										<Link to="/payment">Deposit more here</Link>
									</div>
								</div>
							</MDBCol>
						</MDBCardBody>
					</MDBCard>
				</MDBContainer>

				<MDBTabs className="mt-3 justify-content-center border-2 border-bottom border-primary ">
					{Object.entries(data).length ? (
						Object.entries(data).map(([website, service]) => (
							<MDBTabsItem
								key={website}
								className=" media-tab align-self-center"
							>
								<MDBTabsLink
									onClick={() => handleTabClick(website)}
									active={selected.website === website}
									className="rounded-top-4"
								>
									<img width={32} src={service.thumbnail_url} alt={website} />
									{/* <MDBIcon
									fab
									icon={website}
									color="primary"
									style={{ width: 32, fontSize: 28 }}
								/> */}
								</MDBTabsLink>
							</MDBTabsItem>
						))
					) : (
						<MDBSpinner
							color="primary"
							style={{ height: 32, margin: "calc(0.7em - 1px)" }}
						/>
					)}
				</MDBTabs>
				<div className="py-4 shadow bg-white">
					<MDBContainer>
						{Object.keys(data).length === 0 && (
							<div className="font-black text-center py-2 mb-2">
								{Object.entries(data).length
									? "PICK YOUR TARGET SOCIAL MEDIA"
									: "Loading services..."}
							</div>
						)}
						<MDBRow>
							<MDBCol sm={12} lg={6} xl={7} xxl={8}>
								<MDBRow>
									{Object.keys(data).length > 0 && selected.website && (
										<MDBCol className="mb-4" sm={12}>
											<label
												htmlFor="service"
												className="form-label font-black mb-0"
											>
												Service:
											</label>
											<Input
												id="service"
												type="select"
												value={selected.service}
												name="service"
												onChange={handleChange}
											>
												<option value="" disabled>
													Select a service.
												</option>
												{Object.entries(data[selected.website].services).map(
													([key, value]) => {
														return (
															<option key={key} value={key}>
																{value.display_name[language]}
															</option>
														);
													}
												)}
											</Input>
										</MDBCol>
									)}

									{Object.keys(data).length > 0 &&
										selected.website &&
										selected.service && (
											<MDBCol className="mb-4" sm={12}>
												<label
													// htmlFor="subService"
													className="form-label font-black mb-0"
												>
													Type:
												</label>

												<Select
													isSearchable={false}
													className="input-group-lg "
													placeholder={t("Choose your country")}
													id="subService"
													name="subService"
													value={selectedOption}
													options={Object.entries(
														data[selected.website].services[selected.service]
															.subservices
													).map(([key, value]) => ({
														value: key,
														label: value.display_name[language],
														...value,
													}))}
													onChange={(obj) => {
														setSelectedOption(obj);
														setSelected({ ...selected, subService: obj.value });
													}}
													styles={{
														valueContainer: (provided) => ({
															...provided,
															display: "flex",
														}),
													}}
													components={{
														Option: (props) => (
															<components.Option
																{...props}
																className="country-option"
															>
																<div>{props.data.label}</div>
																<div
																	style={{ lineHeight: 1.2 }}
																	className="small text-secondary"
																>
																	{props.data.sub_display_name[user.currency][
																		language
																	]
																		.split("|")
																		.map((str, index) => (
																			<div key={index}>{str}</div>
																		))}
																</div>
															</components.Option>
														),
														// SingleValue: ({ children, ...props }) => (
														// 	<components.SingleValue {...props}>
														// 		<MDBIcon fas icon="globe" size="lg" className="me-4" />
														// 	</components.SingleValue>
														// ),
														Placeholder: () => (
															<div
																style={{
																	display: "flex",
																	alignItems: "center",
																}}
															>
																<span>{t("Select a service")}...</span>
															</div>
														),
													}}
												/>
											</MDBCol>
										)}

									{Object.keys(data).length > 0 &&
										selected.website &&
										selected.service &&
										selected.subService && (
											<>
												<MDBCol className="mb-4" sm={12}>
													<label
														htmlFor="link"
														className="form-label font-black mb-0"
													>
														{
															data[selected.website].services[selected.service]
																.subservices[selected.subService]
																?.link_field_text[language]
														}
													</label>
													<Input
														id="link"
														type="text"
														value={selected.link}
														name="link"
														onChange={handleChange}
													/>
												</MDBCol>
												{data[selected.website].services[selected.service]
													.subservices[selected.subService]?.type ==
													"default" && (
													<MDBCol className="mb-4 position-relative" sm={12}>
														<label
															htmlFor="quantity"
															className="form-label font-black mb-0"
														>
															{" "}
															Quantity:
														</label>{" "}
														<Input
															id="quantity"
															type="number"
															value={selected.quantity}
															name="quantity"
															className="bg-white"
															onChange={handleChange}
															min={
																data[selected.website].services[
																	selected.service
																].subservices[selected.subService]?.min
															}
															max={
																data[selected.website].services[
																	selected.service
																].subservices[selected.subService]?.max
															}
														/>
														<small className=" position-absolute">
															(Min:
															{
																data[selected.website].services[
																	selected.service
																].subservices[selected.subService]?.min
															}{" "}
															- Max:
															{
																data[selected.website].services[
																	selected.service
																].subservices[selected.subService]?.max
															}
															)
														</small>
													</MDBCol>
												)}
												{data[selected.website].services[selected.service]
													.subservices[selected.subService]?.type ==
													"custom_comments" && (
													<MDBCol className="mb-4" sm={12}>
														<label
															htmlFor="comments"
															className="form-label font-black mb-0"
														>
															Comments:
														</label>
														<MDBTextArea
															rows={4}
															id="comments"
															value={selected.comments}
															name="comments"
															className="bg-white"
															onChange={handleChange}
														/>
													</MDBCol>
												)}
												<MDBCol
													className="mb-4 position-relative"
													sm={12}
													md={6}
												>
													<label
														htmlFor="price"
														className="form-label font-black mb-0"
													>
														Price:
													</label>
													<Input
														id="price"
														type="text"
														value={
															(
																(((data[selected.website].services[
																	selected.service
																].subservices[selected.subService]?.type ==
																	"default" &&
																	(selected.quantity || 0)) ||
																	(data[selected.website].services[
																		selected.service
																	].subservices[selected.subService]?.type ==
																		"custom_comments" &&
																		countLines(selected.comments)) ||
																	0) /
																	1000) *
																data[selected.website].services[
																	selected.service
																].subservices[selected.subService]?.rate[
																	user.currency
																]
															).toLocaleString() +
															" " +
															user.currency?.toUpperCase()
														}
														name="price"
														disabled
														onChange={handleChange}
													/>
													<small className="position-absolute">
														{
															data[selected.website].services[selected.service]
																.subservices[selected.subService]?.price_text[
																user.currency
															][language]
														}
													</small>
												</MDBCol>

												<MDBCol className="mb-4" sm={12} md={6}>
													<label
														htmlFor="average_time"
														className="form-label font-black mb-0"
													>
														Average completion time:
													</label>
													<Input
														id="average_time"
														type="text"
														value={
															data[selected.website].services[selected.service]
																.subservices[selected.subService]?.average_time[
																language
															]
														}
														name="average_time"
														disabled
														onChange={handleChange}
													/>
												</MDBCol>
											</>
										)}
								</MDBRow>
							</MDBCol>
							<MDBCol sm={12} lg={6} xl={5} xxl={4}>
								<MDBRow>
									{Object.keys(data).length > 0 &&
										selected.website &&
										selected.service &&
										selected.subService && (
											<>
												<MDBCol className="mb-4" sm={12}>
													<label className="form-label font-black mb-0">
														Note:
													</label>
													<MDBCard border="1">
														<MDBCardBody>
															{data[selected.website].services[
																selected.service
															].subservices[selected.subService]?.description[
																language
															]
																.split("|")
																.map((str, index) => (
																	<div key={index}>
																		{index + 1}. {str}
																	</div>
																))}
														</MDBCardBody>
													</MDBCard>
												</MDBCol>

												{data[selected.website].services[selected.service]
													.subservices[selected.subService]?.youtube_tutorial[
													language
												] && (
													<div className="text-center mb-3">
														Don’t know how to use this service?
														<br />
														Watch this video:{" "}
														<a
															href={
																data[selected.website].services[
																	selected.service
																].subservices[selected.subService]
																	?.youtube_tutorial[language]
															}
															target="_blank"
															className="font-black text-primary"
														>
															Tutorial
														</a>
													</div>
												)}
											</>
										)}
								</MDBRow>
							</MDBCol>
							{Object.keys(data).length > 0 &&
								selected.website &&
								selected.service &&
								selected.subService && (
									<div className="w-250 mx-auto">
										<MDBBtn
											color="success"
											size="lg"
											className="font-black"
											block
											onClick={purchase}
											disabled={purchaseLoading}
										>
											{purchaseLoading ? (
												<MDBSpinner
													style={{ width: 18, height: 18 }}
													color="light"
												>
													<span className="visually-hidden">Loading...</span>
												</MDBSpinner>
											) : (
												"Purchase"
											)}
										</MDBBtn>
									</div>
								)}
						</MDBRow>
					</MDBContainer>
				</div>
			</div>
		)
	);
};

export default Home;
