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
	MDBTable,
	MDBTableBody,
	MDBTableHead,
	MDBTypography,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Input } from "reactstrap";
import { useLanguage } from "../layouts/LanguageContext";
import { or } from "firebase/firestore";
import { t, use } from "i18next";
// import { modalError } from "../store/appSlice";

const capitalize = (str) => (str ? str[0].toUpperCase() + str.slice(1) : "");

function formatNumber(num = 0) {
	return num.toLocaleString();
}
function timestampToString(timestampInSeconds) {
	return new Date(timestampInSeconds * 1000).toLocaleDateString();
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
		setStatus(event.target.value);
		setData([]);
	};

	useEffect(() => {
		loadData();
	}, [status, page]);

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

	return (
		<MDBContainer
			className="pt-4"
			style={{
				maxWidth: 720,
			}}
		>
			<MDBCard>
				<MDBCardHeader className="d-flex align-items-center gap-2 px-3">
					<MDBTypography tag="h5" className="font-black mb-0">
						{t("Orders History")}
					</MDBTypography>

					<Input
						id="service"
						type="select"
						value={status}
						name="service"
						className="form-control w-auto ms-auto pe-5"
						onChange={changeStatus}
					>
						{options.map((option) => (
							<option key={option} value={option}>
								{capitalize(option)}
							</option>
						))}
					</Input>
				</MDBCardHeader>
				<MDBTable align="middle" className="text-center">
					<MDBTableHead className="font-black border-top">
						<tr>
							<th className="py-1 px-2">{t("ID")}</th>
							<th className="py-1 px-2">{t("Service")}</th>
							<th className="py-1 px-2">{t("Qty")}</th>
							<th className="py-1 px-2">{t("Status")}</th>
						</tr>
					</MDBTableHead>
					<MDBTableBody>
						{data.map((order) => (
							<>
								<tr
									key={order.order_index}
									onClick={() => toggleCollapse(order.order_index)}
									className="cursor-pointer"
								>
									<td className="py-1 px-2 border-bottom-0">
										{order.order_index}
									</td>
									<td className="py-1 px-2 border-bottom-0">
										{order.service_display_name[language]}
									</td>
									<td align="right" className="py-1 px-2 border-bottom-0">
										{order.quantity}
									</td>
									<td className="py-1 px-2 border-bottom-0">
										<MDBBadge
											pill
											color={
												order.statusCodeName === "Completed"
													? "success"
													: order.statusCodeName === "Pending" ||
													  order.statusCodeName === "Processing" ||
													  order.statusCodeName === "In progress"
													? "warning"
													: order.statusCodeName === "Partial"
													? "info"
													: "danger"
											}
										>
											{order.statusCodeName}
										</MDBBadge>
									</td>
								</tr>
								<tr>
									<td className="py-1 " colSpan="4" align="left">
										<MDBCollapse open={openList.includes(order.order_index)}>
											<div>
												<span className="font-black">Price</span> :{" "}
												<span className="text-transform-uppercase">
													{formatNumber(order.charge)} {order.currency}
												</span>
											</div>
											<div>
												<span className="font-black">Link</span> :{" "}
												<span>{order.link}</span>
											</div>
											<div>
												<span className="font-black">Start Count</span> :{" "}
												<span>{order.start_count}</span>
											</div>
											<div>
												<span className="font-black">Remains</span> :{" "}
												<span>{order.remains}</span>
											</div>
											<div>
												<span className="font-black">Date</span> :{" "}
												<span>
													{timestampToString(order.timestamp._seconds)}
												</span>
											</div>
											<div>
												<span className="font-black">Completed in</span> :{" "}
												<span>{order.completionTime}</span>
											</div>
										</MDBCollapse>
									</td>
								</tr>
							</>
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
								{error}
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
