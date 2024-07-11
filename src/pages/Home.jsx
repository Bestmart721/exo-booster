import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "react-modern-drawer/dist/index.css";
import { Link } from "react-router-dom";
import {
	MDBBtn,
	MDBContainer,
	MDBTabs,
	MDBTabsItem,
	MDBTabsLink,
	MDBIcon,
	MDBInput,
	MDBTextArea,
	MDBSpinner,
	MDBCard,
	MDBCardBody,
	MDBRow,
	MDBCol,
} from "mdb-react-ui-kit";
import { Input } from "reactstrap";
import { useTranslation } from "react-i18next";
import { modalError, showSupport } from "../store/appSlice";
import { useLanguage } from "../layouts/LanguageContext";
import Select, { components } from "react-select";
// import { Select } from "reactstrap";

const Home = () => {
	const { t, i18n } = useTranslation();
	const dispatch = useDispatch();
	const { language, switchLanguage } = useLanguage();
	const user = useSelector((state) => state.auth.user);
	const [isOpen, setIsOpen] = React.useState(false);
	const [data, setData] = useState({});
	const [selectedOption, setSelectedOption] = useState(null);
	const [selected, setSelected] = useState({
		website: "youtube",
		service: "youtube_custom_comments",
		subService: "youtube_custom_comments_avg_quality",
		link: "",
		quantity: "",
		comments: "",
		price: "",
		time: "",
		note: "",
	});

	const toggleDrawer = () => {
		setIsOpen((prevState) => !prevState);
	};

	const handleTabClick = (value) => {
		setSelected({
			website: value,
			service: "",
			subService: "",
			link: "",
			quantity: "",
		});
	};

	// const handleServiceSelect = (value) => {
	// 	setSelected({ ...selected, service: value, subService: "", link: "", quantity: "" });
	// };

	const handleChange = (e) => {
		let overwrite = {};
		switch (e.target.name) {
			case "service":
				overwrite = {
					subService: "",
					link: "",
					quantity: "",
				};
				break;
			case "subService":
				overwrite = {
					link: "",
					quantity: "",
				};
				break;
		}
		setSelected({ ...selected, [e.target.name]: e.target.value, ...overwrite });
	};

	function countLines(str) {
		if (str === "") return 0; // Handle empty string case
		return str.trim().split("\n").length;
	}

	useEffect(() => {
		// console.log(data);
		axios
			.post(
				`https://getcategoriesandservices-l2ugzeb65a-uc.a.run.app/`,
				{
					userId: user.uid,
				},
				{
					headers: {
						// "Content-Type": "application/json",
						Authorization: `Bearer ${user.accessToken}`,
					},
				}
			)
			.then((response) => {
				console.log(response.data.data);
				setData(response.data.data);
			})
			.catch((error) => {
				console.log(error);
				modalError(error);
			});
	}, [axios]);

	return (
		<div className="bg-primary-light flex-grow-1 d-flex flex-column">
			<MDBTabs className="mt-3 justify-content-center border-2 border-bottom border-primary ">
				{Object.entries(data).length ? (
					Object.entries(data).map(([website, service]) => (
						<MDBTabsItem key={website} className=" media-tab">
							<MDBTabsLink
								onClick={() => handleTabClick(website)}
								active={selected.website === website}
								className="rounded-top-4"
							>
								{/* <img width={32} src={service.thumbnail_url} alt={website} /> */}
								<MDBIcon
									fab
									icon={website}
									color="primary"
									style={{ width: 32, fontSize: 28 }}
								/>
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
			<div className="pb-4 shadow bg-white">
				<MDBContainer style={{ maxWidth: 720 }}>
					<MDBRow>
						{Object.keys(data).length > 0 && selected.website ? (
							<MDBCol sm={12} md={6}>
								<label
									htmlFor="service"
									className="form-label font-black mb-0 mt-2"
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
						) : (
							<div className="font-black text-center mt-4 py-2 mb-2">
								PICK YOUR TARGET SOCIAL MEDIA
							</div>
						)}

						{Object.keys(data).length > 0 &&
							selected.website &&
							selected.service && (
								<MDBCol sm={12} md={6}>
									<label
										// htmlFor="subService"
										className="form-label font-black mb-0 mt-2"
									>
										Type:
									</label>

									<Select
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
												<div style={{ display: "flex", alignItems: "center" }}>
													<span>{t("Select a country")}...</span>
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
									<MDBCol sm={12}>
										<label
											htmlFor="link"
											className="form-label font-black mb-0 mt-2"
										>
											{
												data[selected.website].services[selected.service]
													.subservices[selected.subService]?.link_field_text[
													language
												]
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
										.subservices[selected.subService]?.type == "default" && (
										<MDBCol sm={12}>
											<label
												htmlFor="quantity"
												className="form-label font-black mb-0 mt-2"
											>
												{" "}
												Quantity:
											</label>{" "}
											<small>
												Min:
												{
													data[selected.website].services[selected.service]
														.subservices[selected.subService]?.min
												}{" "}
												- Max:
												{
													data[selected.website].services[selected.service]
														.subservices[selected.subService]?.max
												}
											</small>
											<MDBInput
												id="quantity"
												type="number"
												value={selected.quantity}
												name="quantity"
												className="bg-white"
												onChange={handleChange}
												min={
													data[selected.website].services[selected.service]
														.subservices[selected.subService]?.min
												}
												max={
													data[selected.website].services[selected.service]
														.subservices[selected.subService]?.max
												}
											/>
										</MDBCol>
									)}
									{data[selected.website].services[selected.service]
										.subservices[selected.subService]?.type ==
										"custom_comments" && (
										<MDBCol sm={12}>
											<label
												htmlFor="comments"
												className="form-label font-black mb-0 mt-2"
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
									<MDBCol sm={12} md={6}>
										<label
											htmlFor="price"
											className="form-label font-black mb-0 mt-2"
										>
											Price
										</label>
										<Input
											id="price"
											type="text"
											value={
												(
													(((data[selected.website].services[selected.service]
														.subservices[selected.subService]?.type ==
														"default" &&
														(selected.quantity || 0)) ||
														(data[selected.website].services[selected.service]
															.subservices[selected.subService]?.type ==
															"custom_comments" &&
															countLines(selected.comments)) ||
														0) /
														1000) *
													data[selected.website].services[selected.service]
														.subservices[selected.subService]?.rate[
														user.currency
													]
												).toFixed(2) +
												" " +
												user.currency.toUpperCase() +
												" " +
												data[selected.website].services[selected.service]
													.subservices[selected.subService]?.price_text[
													user.currency
												][language]
											}
											name="price"
											disabled
											onChange={handleChange}
										/>
									</MDBCol>

									<MDBCol sm={12} md={6}>
										<label
											htmlFor="average_time"
											className="form-label font-black mb-0 mt-2"
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

									<MDBCol sm={12}>
										<label className="form-label font-black mb-0 mt-2">
											Note
										</label>
										<MDBCard border="1">
											<MDBCardBody
												className="p-3"
												style={{ whiteSpace: "pre-wrap" }}
											>
												{data[selected.website].services[
													selected.service
												].subservices[selected.subService]?.description[
													language
												].replace(/\|/g, "\n") +
													"\n" +
													data[selected.website].services[selected.service]
														.subservices[selected.subService]?.price_text[
														user.currency
													][language]}
											</MDBCardBody>
										</MDBCard>
									</MDBCol>
									{/* <MDBTextArea
								id="note"
								type="text"
								value={data[selected.website].services[
									selected.service
								].subservices[selected.subService]?.description[language].replace(
									/\|/g,
									"\n"
								)}
								name="note"
								style={{ height: 120 }}
								disabled
								onChange={handleChange}
								className="mb-2"
							/> */}
									{data[selected.website].services[selected.service]
										.subservices[selected.subService]?.youtube_tutorial && (
										<div className="text-center mt-2">
											Don’t know how to use this service?
											<br />
											Watch this video:{" "}
											<a
												href={
													data[selected.website].services[selected.service]
														.subservices[selected.subService]?.youtube_tutorial[
														language
													]
												}
												target="_blank"
												className="font-black text-primary"
											>
												Tutorial
											</a>
										</div>
									)}
									<div className="w-250 mx-auto pt-3">
										<MDBBtn
											color="success"
											size="lg"
											className="font-black"
											block
										>
											Purchase
										</MDBBtn>
									</div>
								</>
							)}
					</MDBRow>
				</MDBContainer>
			</div>
			<div className="flex-grow-1 align-content-center pt-4 pb-5">
				<div className="d-sm-flex text-center justify-content-center">
					<div>{t("Have an issue/question?")}</div>
					<Link
						className="ms-3 text-primary font-black"
						onClick={() => dispatch(showSupport())}
					>
						{t("Contact Us")}
					</Link>
				</div>
				<div className=" text-center justify-content-center mt-2 px-4">
					<div className="">{t("Have an android phone?")}</div>
					<div>
						<span className="">{t("checkout the Exo Booster app:")}</span>
						<MDBBtn
							color="primary"
							size="sm"
							className="ms-3"
							tag={Link}
							to="https://www.exobooster.com/"
							target="_blank"
						>
							<MDBIcon fas icon="download" className="me-2" />
							Download
						</MDBBtn>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
