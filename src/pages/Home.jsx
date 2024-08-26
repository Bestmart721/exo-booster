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
	const [swalProps, setSwalProps] = useState({ show: false });
	const navigate = useNavigate();
	const [countInvalid, setCountInvalid] = useState(0);
	const [linkErrorMsg, setLinkErrorMsg] = useState("");
	const [qtyErrorMsg, setQtyErrorMsg] = useState("");
	const [dirty, setDirty] = useState(false);
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
		} else if (data.error) {
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
		clearDirty();
	};

	const checkValidation = () => {
		setDirty(true);

		let count = 0;

		if (!selected.website || !selected.service || !selected.subService) {
			dispatch(modalError(t("Please select a service.")));
			count++;
		}

		const validity_regex = new RegExp(
			data[selected.website]?.services[selected.service]?.subservices[
				selected.subService
			]?.validity_regex
		);
		if (!selected.link) {
			setLinkErrorMsg(t("Please enter a link."));
			count++;
		} else if (
			validity_regex &&
			selected.link &&
			!validity_regex.test(selected.link)
		) {
			setLinkErrorMsg(t("Invalid link."));
			count++;
		} else {
			setLinkErrorMsg("");
		}

		const type =
			data[selected.website].services[selected.service].subservices[
				selected.subService
			]?.type;
		const quantity =
			type == "default"
				? Number(selected.quantity)
				: type == "custom_comments"
					? countLines(selected.comments)
					: 0;
		if (type == "default" && !selected.quantity) {
			setQtyErrorMsg(t("Please enter a quantity."));
			count++;
		} else if (type == "custom_comments" && !selected.comments) {
			setQtyErrorMsg(t("Please enter comments."));
			count++;
		} else if (
			quantity &&
			(quantity <
				data[selected.website].services[selected.service].subservices[
					selected.subService
				]?.min ||
				quantity >
				data[selected.website].services[selected.service].subservices[
					selected.subService
				]?.max)
		) {
			setQtyErrorMsg(
				`${type == "default"
					? t("Please enter a quantity between")
					: t("Number of comments should be between")
				} ${data[selected.website].services[selected.service].subservices[
					selected.subService
				]?.min
				} ${t("and")} ${data[selected.website].services[selected.service].subservices[
					selected.subService
				]?.max
				}.`
			);
			count++;
		} else {
			setQtyErrorMsg("");
		}

		setCountInvalid(count);
		return count === 0;
	};

	useEffect(() => {
		if (dirty) {
			checkValidation();
		}
	}, [selected.link, selected.quantity, selected.comments, dirty]);

	const purchase = async () => {
		if (!checkValidation()) {
			return;
		}

		if (data[selected.website].services[selected.service].subservices[
			selected.subService
		]?.purchase_notice[language]) {
			setSwalProps({
				show: true,
				heightAuto: false,
				// title: t("Notice"),
				html: "<img src='/favcon 1.png' style='width: 40px' class='img-fluid my-4' alt='logo' />"+ data[selected.website].services[selected.service].subservices[
					selected.subService
				]?.purchase_notice[language],
				showDenyButton: true,
				customClass: {
					htmlContainer: "border-pink",
					confirmButton: "btn btn-success btn-block",
					denyButton: "btn btn-primary btn-block",
				},
				confirmButtonText: t("Purchase"),
				denyButtonText: t("Cancel"),
				onResolve: (result) => {
					console.log('-----------')
					setSwalProps({ show: false });
					if (result.isConfirmed) {
						proceedPurchase();
					}
				},
			});
		} else {
			proceedPurchase();
		}

	};

	const proceedPurchase = () => {
		setPurchaseLoading(true);
		const type =
			data[selected.website].services[selected.service].subservices[
				selected.subService
			]?.type;
		axios
			.post(
				`https://purchaseserviceglobal-l2ugzeb65a-uc.a.run.app/`,
				{
					userId: user.uid,
					service_id: selected.service,
					sub_service_id: selected.subService,
					type: type,
					link: selected.link,
					quantity: type == "default" ? Number(selected.quantity) : undefined,
					comments: type == "custom_comments" ? selected.comments : undefined,
					appVersion: "web",
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
					heightAuto: false,
					title: response.data.message[language],
					html: `<div>${data[selected.website].services[selected.service].subservices[
						selected.subService
					].purchase_success_text[language]}</div>
					<h4 class="text-center mt-3"><span class="badge rounded-pill text-dark" style="
						background: #eee;
					">${t("Order ID")}: ${response.data.order_index}</span></h4>`,
					icon: "success",
					showDenyButton: true,
					customClass: {
						confirmButton: "btn btn-primary btn-block",
						denyButton: "btn btn-primary btn-block",
					},
					confirmButtonText: t("View My Order"),
					denyButtonText: "Ok",
					preConfirm: () => {
						navigate("/orders");
					},
					onResolve: () => {
						setSwalProps({ show: false });
					},
				});
			})
			.catch((error) => {
				// dispatch(modalError(error.message));
				console.log(error.message);
				const isInsufficient =
					error.message == "Insufficient balance" ||
					error.message == "Solde insuffisant";
				setSwalProps({
					show: true,
					heightAuto: false,
					title: t("Purchase failed!"),
					text: t(error.message),
					icon: "error",
					confirmButtonText: isInsufficient ? t("Add Funds") : "Ok",
					customClass: {
						confirmButton: "btn btn-success btn-block",
						denyButton: "btn btn-primary btn-block",
					},
					preConfirm: () => {
						if (isInsufficient) {
							navigate("/wallet");
						}
					},
					onResolve: () => {
						setSwalProps({ show: false });
					},
				});
			})
			.finally(() => {
				setPurchaseLoading(false);
			});
	};

	const clearDirty = () => {
		setCountInvalid(0);
		setLinkErrorMsg("");
		setQtyErrorMsg("");
		setDirty(false);
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
				clearDirty();
				break;
			case "subService":
				overwrite = {
					link: "",
					quantity: "",
					comments: "",
				};
				clearDirty();
				break;
		}
		setSelected({ ...selected, [e.target.name]: e.target.value, ...overwrite });
	};

	function countLines(str) {
		if (str === "") return 0; // Handle empty string case
		return str.trim().split("\n").length;
	}

	function getFirstValue(obj) {
		const lowestOrderPositionKey = getFirstKey(obj);
		return lowestOrderPositionKey ? obj[lowestOrderPositionKey] : undefined;
	}

	function getFirstKey(obj) {
		const keys = Object.keys(obj);
		const lowestOrderPosition = Math.min(
			...keys.map((key) => obj[key].order_position)
		);
		const lowestOrderPositionKey = keys.find(
			(key) => obj[key].order_position === lowestOrderPosition
		);
		return lowestOrderPositionKey;
	}

	function formatNumber(num = 0) {
		return num.toLocaleString("en", {
			minimumFractionDigits: 0,
			maximumFractionDigits: 2,
		});
	}

	return (
		user.username && (
			<div className="bg-primary-light flex-grow-1 d-flex flex-column">
				<SweetAlert2
					onResolve={() =>
						setSwalProps({
							show: false,
						})
					}
					{...swalProps}
				/>
				<MDBContainer className="mt-4 d-none d-sm-block w-600">
					<MDBCard className="bg-pink shadow rounded-pill">
						<MDBCardBody className="row px-4">
							<MDBCol className="border-end border-1 d-flex align-items-center ps-4">
								<MDBIcon
									color="primary"
									fas
									icon="cart-plus"
									size="2x"
									className="me-3"
								/>
								<div>
									<div className="small line-height-small">
										{t("Total Orders")}
									</div>
									<MDBTypography tag="h5" className="mb-0 font-black">
										{formatNumber(totalOrdersCount)}
									</MDBTypography>
									<div className="small line-height-small">
										{t("3+ years of experience providing SMM services!")}
									</div>
								</div>
							</MDBCol>
							<MDBCol className=" d-flex align-items-center pe-4">
								<MDBIcon
									color="primary"
									fas
									icon="dollar-sign"
									size="2x"
									className="me-3"
								/>
								<div>
									<div className="small line-height-small">
										{t("You Have Spent")}
									</div>
									<MDBTypography tag="h5" className="mb-0 font-black">
										{formatNumber(user.amount_spent)}{" "}
										<span className="text-transform-uppercase">
											{user.currency}
										</span>
									</MDBTypography>
									<div className="small line-height-small">
										{t("You currently have")}
										<br />
										<span className="font-black">
											{formatNumber(user.balance)}{" "}
											<span className="text-transform-uppercase">
												{user.currency}
											</span>
										</span>
									</div>
								</div>
							</MDBCol>
						</MDBCardBody>
					</MDBCard>
				</MDBContainer>

				<MDBTypography className="font-black text-center mt-3 mb-0" tag="h6">
					{t("PICK YOUR TARGET SOCIAL MEDIA")}:
				</MDBTypography>

				<MDBTabs className="mt-3 justify-content-center border-2 border-bottom border-primary ">
					{Object.entries(data).length == 0 ? (
						<MDBSpinner
							color="primary"
							style={{ height: 32, margin: "calc(0.7em - 1px)" }}
						/>
					) : Object.entries(data).length == 1 && data.error ? (
						""
					) : (
						Object.entries(data)
							.sort(
								([website1], [website2]) =>
									data[website1].order_position - data[website2].order_position
							)
							.map(([website, service]) => (
								<MDBTabsItem
									key={website}
									className=" media-tab align-self-center"
								>
									<MDBTabsLink
										onClick={() => handleTabClick(website)}
										active={selected.website === website}
										className="rounded-top-4 align-content-center"
										style={{ width: 58, height: 58 }}
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
					)}
				</MDBTabs>
				<div className="py-4 shadow bg-white">
					<MDBContainer>
						{(Object.keys(data).length === 0 || data.error) && (
							<div
								className="font-black justify-content-center d-flex align-items-center"
								style={{ height: 300 }}
							>
								{Object.entries(data).length == 0 ? (
									t("Loading services...")
								) : (
									<div className="text-center">
										<p>{t(data.error)}</p>
										<MDBBtn
											onClick={() => {
												window.location.reload();
											}}
										>
											{t("Reload this page.")}
										</MDBBtn>
									</div>
								)}
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
												{t("Service")}:
											</label>
											<Input
												id="service"
												type="select"
												value={selected.service}
												name="service"
												onChange={handleChange}
											>
												<option value="" disabled>
													{t("Select a service.")}
												</option>
												{Object.entries(data[selected.website].services)
													.sort(
														([key1], [key2]) =>
															data[selected.website].services[key1]
																.order_position -
															data[selected.website].services[key2]
																.order_position
													)
													.map(([key, value]) => {
														return (
															<option key={key} value={key}>
																{value.display_name[language]}
															</option>
														);
													})}
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
													{t("Type")}:
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
													)
														.sort(
															([key1], [key2]) =>
																data[selected.website].services[
																	selected.service
																].subservices[key1].order_position -
																data[selected.website].services[
																	selected.service
																].subservices[key2].order_position
														)
														.map(([key, value]) => ({
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
														option: (provided, { isFocused, isSelected }) => ({
															...provided,
															backgroundColor: isSelected
																? "#ff00f7"
																: isFocused
																	? "#ffe9fe"
																	: "white",
															color: isSelected
																? "white !important"
																: isFocused
																	? "black !important"
																	: "black !important",
														}),
													}}
													components={{
														Option: (props) => (
															<components.Option
																{...props}
																className="country-option text-secondary"
															>
																<div>{props.data.label}</div>
																<div className="small line-height-small text-secondary">
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
												<MDBCol className="mb-4- position-relative" sm={12}>
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
													<div className="small error-msg-wrapper text-danger">
														{dirty && linkErrorMsg}
													</div>
												</MDBCol>
												{data[selected.website].services[selected.service]
													.subservices[selected.subService]?.type ==
													"default" && (
														<MDBCol className="mb-4- position-relative" sm={12}>
															<label
																htmlFor="quantity"
																className="form-label font-black mb-0"
															>
																{t("Quantity")}:
															</label>{" "}
															<Input
																id="quantity"
																type="number"
																inputMode="numeric"
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
															<div className="small error-msg-wrapper">
																(Min:{" "}
																{formatNumber(
																	data[selected.website].services[
																		selected.service
																	].subservices[selected.subService]?.min
																)}{" "}
																- Max:{" "}
																{formatNumber(
																	data[selected.website].services[
																		selected.service
																	].subservices[selected.subService]?.max
																)}
																){" "}
																<span className="text-danger">{qtyErrorMsg}</span>
															</div>
														</MDBCol>
													)}
												{data[selected.website].services[selected.service]
													.subservices[selected.subService]?.type ==
													"custom_comments" && (
														<MDBCol className="mb-4- position-relative" sm={12}>
															<label
																htmlFor="comments"
																className="form-label font-black mb-0"
															>
																{t("Comments")}:
															</label>
															<div className="small">{data[selected.website].services[
																selected.service
															].subservices[selected.subService]?.comments_seperator_text[language]}</div>
															<MDBTextArea
																rows={4}
																id="comments"
																value={selected.comments}
																name="comments"
																className="bg-white"
																onChange={handleChange}
															/>
															<div className="small error-msg-wrapper">
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
																){" "}
																<span className="text-danger">{qtyErrorMsg}</span>
															</div>
														</MDBCol>
													)}
												<MDBCol
													className="mb-4 position-relative"
													sm={12}
													md={6}
												>
													{/* <label
														htmlFor="price"
														className="form-label font-black mb-0"
													>
														{t("Price")}:
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
													/> */}
													<div className="mt-3 d-flex">
														<label
															htmlFor="price"
															className="form-label font-black mb-0 pt-1"
														>
															{t("Price")}:
														</label>
														<div className="ms-2">
															{user.discount && selected.quantity ? (
																<span className="text-deleted text-danger ms-2">
																	{(
																		(((data[selected.website].services[
																			selected.service
																		].subservices[selected.subService]?.type ==
																			"default" &&
																			(selected.quantity || 0)) ||
																			(data[selected.website].services[
																				selected.service
																			].subservices[selected.subService]
																				?.type == "custom_comments" &&
																				countLines(selected.comments)) ||
																			0) /
																			1000) *
																		data[selected.website].services[
																			selected.service
																		].subservices[selected.subService]?.rate[
																		user.currency
																		]
																	).toLocaleString("en") +
																		" " +
																		user.currency?.toUpperCase()}
																</span>
															) : (
																""
															)}
															<MDBCard
																className="d-inline-block text-white ms-2"
																background="success"
															>
																<MDBCardBody className="p-1">
																	{(
																		(((data[selected.website].services[
																			selected.service
																		].subservices[selected.subService]?.type ==
																			"default" &&
																			(selected.quantity || 0)) ||
																			(data[selected.website].services[
																				selected.service
																			].subservices[selected.subService]
																				?.type == "custom_comments" &&
																				countLines(selected.comments)) ||
																			0) /
																			1000) *
																		data[selected.website].services[
																			selected.service
																		].subservices[selected.subService]?.rate[
																		user.currency
																		] *
																		((100 - (user.discount || 0)) / 100)
																	).toLocaleString("en") +
																		" " +
																		user.currency?.toUpperCase()}
																</MDBCardBody>
															</MDBCard>
														</div>
													</div>
													<div className="small error-msg-wrapper">
														{data[selected.website].services[selected.service]
															.subservices[selected.subService]?.price_text[
															user.currency
														] &&
															data[selected.website].services[selected.service]
																.subservices[selected.subService]?.price_text[
															user.currency
															][language]}
													</div>
												</MDBCol>

												<MDBCol className="mb-4" sm={12} md={6}>
													<label
														htmlFor="average_time"
														className="form-label font-black mb-0"
													>
														{t("Average completion time")}:
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
														{t("Note")}:
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
																		<span className="font-black">
																			{index + 1}.
																		</span>{" "}
																		{str}
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
															{t("Don’t know how to use this service?")}
															<br />
															{t("Watch this video:")}
															<a
																href={
																	data[selected.website].services[
																		selected.service
																	].subservices[selected.subService]
																		?.youtube_tutorial[language]
																}
																target="_blank"
																className="font-black text-primary ms-2"
															>
																{t("Tutorial")}
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
											disabled={purchaseLoading || countInvalid > 0}
										>
											{purchaseLoading ? (
												<MDBSpinner
													style={{ width: 18, height: 18 }}
													color="light"
												>
													<span className="visually-hidden">
														{t("Loading")}...
													</span>
												</MDBSpinner>
											) : (
												t("Purchase")
											)}{" "}
											{countInvalid ? `(${countInvalid} ${t("Errors")})` : ""}
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
