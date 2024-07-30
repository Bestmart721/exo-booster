import axios from "axios";
import {
	MDBBadge,
	MDBBtn,
	MDBCard,
	MDBCardBody,
	MDBCardHeader,
	MDBCardTitle,
	MDBCollapse,
	MDBContainer,
	MDBFooter,
	MDBIcon,
	MDBSpinner,
	MDBTable,
	MDBTableBody,
	MDBTableHead,
	MDBTypography,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Input, InputGroup } from "reactstrap";
import { useLanguage } from "../layouts/LanguageContext";
import { or } from "firebase/firestore";
import { t, use } from "i18next";
import { Link } from "react-router-dom";
// import { modalError } from "../store/appSlice";

const capitalize = (str) => (str ? str[0].toUpperCase() + str.slice(1) : "");

function formatNumber(num = 0) {
	return num.toLocaleString("en");
}
function timestampToString(timestampInSeconds) {
	return new Date(timestampInSeconds * 1000).toLocaleString("en");
}

const Orders = () => {
	const [status, setStatus] = useState("All");
	const user = useSelector((state) => state.auth.user);
	const [data, setData] = useState([]);
	const [page, setPage] = useState(1);
	const [dataLoading, setDataLoading] = useState(false);
	const { language, switchLanguage } = useLanguage();
	const [error, setError] = useState(null);
	const [numberOfPages, setNumberOfPages] = useState(0);
	const [openList, setOpenList] = useState([]);
	const [showSearch, setShowSearch] = useState(false);
	const [searchItem, setSearchItem] = useState("");
	const [searching, setSearching] = useState(false);
	// const dispatch = useDispatch();
	const options = [
		"All",
		"Completed",
		"Partial",
		"Pending",
		"Processing",
		"In progress",
		"Canceled",
		// "Refunded",
		// "Failed",
	];

	const tryAgain = () => {
		loadData();
	};

	const loadData = () => {
		setError(null);
		setDataLoading(true);
		axios
			.post(
				`https://getusersorders-l2ugzeb65a-uc.a.run.app/`, //https://cors-anywhere.herokuapp.com/
				{
					userId: user.uid,
					currentPage: page,
					status: status,
					itemsPerPage: 30,
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
				if (page == 1) {
					setData(response.data.data);
				} else {
					setData([...data, ...response.data.data]);
				}
				setNumberOfPages(response.data.numberOfPages);
			})
			.catch((error) => {
				setError(error.message);
				// page = page - 1;
			})
			.finally(() => {
				setDataLoading(false);
			});
	};

	const loadMore = () => {
		setPage(page + 1);
	};

	const changeStatus = (event) => {
		setPage(1);
		setOpenList([]);
		setStatus(event.target.value);
		setData([]);
	};

	useEffect(() => {
		loadData();
	}, [status, page, user]);

	const viewport = document.getElementById("root");
	let mybutton;

	useEffect(() => {
		viewport.onscroll = function () {
			mybutton = document.getElementById("btn-back-to-top");
			scrollFunction(mybutton);
		};

		return () => {
			viewport.onscroll = null;
		};
	}, []);

	function scrollFunction(mybutton) {
		if (document.body.scrollTop > 100 || viewport.scrollTop > 100) {
			mybutton.style.display = "block";
		} else {
			mybutton.style.display = "none";
		}
	}

	function backToTop() {
		document.body.scrollTop = 0;
		viewport.scrollTop = 0;
	}

	const toggleCollapse = (index) => {
		if (openList.includes(index)) {
			setOpenList(openList.filter((item) => item !== index));
		} else {
			setOpenList([...openList, index]);
		}
	};

	const toggleSearch = () => {
		setShowSearch(!showSearch);
		if (showSearch) {
			// setStatus("All");
			setData([]);
			setPage(1);
			setError(null);
			loadData();
		}
	};

	const doSearch = () => {
		setSearching(true);
		setData([]);
		setPage(1);
		setError(null);
		// setStatus("All");
		axios
			.post(
				`https://searchuserorder-l2ugzeb65a-uc.a.run.app/`,
				{
					userId: user.uid,
					currentPage: 1,
					searchItem,
					itemsPerPage: 30,
				},
				{
					headers: {
						Authorization: `Bearer ${user.accessToken}`,
					},
				}
			)
			.then((response) => {
				if (response.data.error) {
					throw new Error(response.data.error[language]);
				}
				setData(response.data.data);
				setNumberOfPages(response.data.numberOfPages);
			})
			.catch((error) => {
				setError(error.message);
			})
			.finally(() => {
				setSearching(false);
			});
	};

	return (
		<MDBContainer
			className="pt-4"
			style={{
				maxWidth: 720,
			}}
		>
			<MDBCard>
				<MDBCardHeader className="px-3">
					<div className="d-flex align-items-center gap-2">
						<MDBTypography tag="h5" className="font-black mb-0 flex-grow-1">
							{t("Orders History")}
						</MDBTypography>

						<Input
							id="service"
							type="select"
							value={status}
							name="service"
							className="form-control w-auto ms-auto pe-5"
							onChange={changeStatus}
							disabled={showSearch}
						>
							{options.map((option) => (
								<option key={option} value={option}>
									{capitalize(t(option))}
								</option>
							))}
						</Input>
						<div>
							<MDBBtn
								floating
								color="tertiary"
								outline={showSearch}
								onClick={toggleSearch}
							>
								<MDBIcon fas icon={showSearch ? "times" : "search"} size="xl" />
							</MDBBtn>
						</div>
					</div>
					<MDBCollapse open={showSearch}>
						<div className="pt-2">
							<InputGroup>
								<Input
									placeholder={t("Order index or link")}
									type="text"
									value={searchItem}
									onChange={(e) => setSearchItem(e.target.value)}
									autoFocus
								/>
								<MDBBtn
									color="success"
									disabled={searchItem == "" || searching}
									onClick={doSearch}
								>
									{searching ? (
										<MDBSpinner color="white" style={{ width: 18, height: 18 }}>
											<span className="visually-hidden">{t("Loading")}...</span>
										</MDBSpinner>
									) : (
										<MDBIcon fas icon="search" size="xl" />
									)}
								</MDBBtn>
							</InputGroup>
						</div>
					</MDBCollapse>
					{/* <MDBIcon fas icon="search" /> */}
				</MDBCardHeader>
				<MDBTable align="middle" className="text-center">
					<MDBTableHead className="font-black border-top">
						<tr>
							<th className="py-1 px-2">{t("ID")}</th>
							<th className="py-1 px-1">{t("Service")}</th>
							<th className="py-1 px-2">{t("Qty")}</th>
							<th className="py-1 px-1">{t("Status")}</th>
							<th className="py-1 px-2"></th>
						</tr>
					</MDBTableHead>
					<MDBTableBody>
						{data.map((order) => (
							<React.Fragment key={order.order_index}>
								<tr
									onClick={() => toggleCollapse(order.order_index)}
									className="cursor-pointer"
								>
									<td className="py-1 px-2 border-bottom-0">
										{order.order_index}
									</td>
									<td className="py-1 px-1 border-bottom-0">
										{order.service_display_name[language]} -{" "}
										<span className="text-capitalize">
											{order.service_category}
										</span>
									</td>
									<td align="right" className="py-1 px-2 border-bottom-0">
										{order.quantity}
									</td>
									<td className="py-1 px-1 border-bottom-0">
										<MDBBadge
											className="text-uppercase-"
											pill
											color={
												order.statusCodeName === "Completed"
													? "success"
													: order.statusCodeName === "Pending" ||
													  order.statusCodeName === "Processing" ||
													  order.statusCodeName === "In progress"
													? "info"
													: "danger"
											}
										>
											{t(order.statusCodeName)}
										</MDBBadge>
									</td>
									<td className="py-1 ps-0 pe-2 border-bottom-0">
										{openList.includes(order.order_index) ? (
											<MDBIcon fas icon="angle-up" />
										) : (
											<MDBIcon fas icon="angle-down" />
										)}
									</td>
								</tr>
								<tr>
									<td className="py-0 px-3" colSpan="5" align="left">
										<MDBCollapse
											open={openList.includes(order.order_index)}
											className="wrap-anywhere"
										>
											<div className="py-1">
												<div>
													<span className="font-black">{t("Price")}</span> :{" "}
													<span className="text-transform-uppercase">
														{formatNumber(order.charge)} {order.currency}
													</span>
												</div>
												<div>
													<span className="font-black">{t("Link")}</span> :{" "}
													{order.link?.includes("/") ? (
														<Link to={order.link} target="_blank">
															{order.link}
														</Link>
													) : (
														<span>{order.link}</span>
													)}
												</div>
												<div>
													<span className="font-black">
														{t("Category name")}
													</span>{" "}
													:{" "}
													<span>
														{order.sub_service_display_name[language]}
													</span>
												</div>
												<div>
													<span className="font-black">{t("Start Count")}</span>{" "}
													: <span>{order.start_count}</span>
												</div>
												<div>
													<span className="font-black">{t("Remains")}</span> :{" "}
													<span>{order.remains}</span>
												</div>
												<div>
													<span className="font-black">{t("Date")}</span> :{" "}
													<span>
														{timestampToString(order.timestamp._seconds) || ""}
													</span>
												</div>
												<div>
													<span className="font-black">
														{t("Completed in")}
													</span>{" "}
													: <span>{order.completionTime}</span>
												</div>
											</div>
										</MDBCollapse>
									</td>
								</tr>
							</React.Fragment>
						))}
					</MDBTableBody>
				</MDBTable>
				<MDBFooter className="text-center pb-2">
					{dataLoading ? (
						<MDBBtn color="link" disabled>
							{t("Loading")}...
						</MDBBtn>
					) : error ? (
						<>
							<MDBTypography color="danger" tag="div">
								{t(error)}
							</MDBTypography>
							<MDBBtn color="link" onClick={tryAgain}>
								{t("Try Again")}
							</MDBBtn>
						</>
					) : numberOfPages > page ? (
						<MDBBtn color="link" onClick={loadMore}>
							{t("Load More")}
						</MDBBtn>
					) : data.length > 0 ? (
						t("No more data to load.")
					) : (
						t("No data to load.")
					)}
				</MDBFooter>
			</MDBCard>

			<MDBBtn
				onClick={backToTop}
				id="btn-back-to-top"
				style={{
					bottom: 0,
					left: "50%",
					transform: "translateX(-50%)",
					display: "none",
				}}
				className="btn-floating- position-fixed rounded-top-pill pb-1 px-4"
				color="primary"
				size="lg"
			>
				<MDBIcon fas icon="arrow-up" />
			</MDBBtn>
		</MDBContainer>
	);
};

export default Orders;
