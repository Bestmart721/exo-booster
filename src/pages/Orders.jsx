import axios from "axios";
import {
	MDBBadge,
	MDBBtn,
	MDBCard,
	MDBCardBody,
	MDBCardHeader,
	MDBCardTitle,
	MDBContainer,
	MDBFooter,
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
import { use } from "i18next";
// import { modalError } from "../store/appSlice";

const capitalize = (str) => (str ? str[0].toUpperCase() + str.slice(1) : "");

const Orders = () => {
	const [status, setStatus] = useState("All");
	const user = useSelector((state) => state.auth.user);
	const [data, setData] = useState([]);
	const [page, setPage] = useState(1);
	const [dataLoading, setDataLoading] = useState(false);
	const { language, switchLanguage } = useLanguage();
	const [error, setError] = useState(null);
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
				`https://cors-anywhere.herokuapp.com/https://getusersorders-l2ugzeb65a-uc.a.run.app/`, //https://cors-anywhere.herokuapp.com/
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

	return (
		<MDBContainer className="pt-4">
			<MDBCard>
				<MDBCardHeader className="d-flex align-items-center gap-2 px-3">
					<MDBTypography tag="h5" className="font-black mb-0">
						Orders History
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
							<th className="py-1 px-2">ID</th>
							<th className="py-1 px-2">Service</th>
							<th className="py-1 px-2">Qty</th>
							<th className="py-1 px-2">Status</th>
						</tr>
					</MDBTableHead>
					<MDBTableBody>
						{data.map((order) => (
							<tr key={order.order_index}>
								<td className="py-1 px-2">{order.order_index}</td>
								<td className="py-1 px-2">
									{order.service_display_name[language]}
								</td>
								<td align="right" className="py-1 px-2">
									{order.quantity}
								</td>
								<td className="py-1 px-2">
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
						))}
					</MDBTableBody>
				</MDBTable>
				<MDBFooter className="text-center pb-2">
					{dataLoading ? (
						<MDBBtn color="link" disabled>
							Loading...
						</MDBBtn>
					) : error ? (
						<>
							<MDBTypography color="danger" tag="div">
								{error}
							</MDBTypography>
							<MDBBtn color="link" onClick={tryAgain}>
								Try Again
							</MDBBtn>
						</>
					) : (
						<MDBBtn color="link" onClick={loadMore}>
							Load More
						</MDBBtn>
					)}
				</MDBFooter>
			</MDBCard>
		</MDBContainer>
	);
};

export default Orders;
