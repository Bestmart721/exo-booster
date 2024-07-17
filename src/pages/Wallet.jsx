import axios from "axios";
import {
	MDBBtn,
	MDBCard,
	MDBCardBody,
	MDBCollapse,
	MDBContainer,
	MDBIcon,
	MDBTable,
	MDBTypography,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../layouts/LanguageContext";
import SweetAlert2 from "react-sweetalert2";
import { t } from "i18next";

function formatNumber(num = 0) {
	return num.toLocaleString();
}

const Wallet = () => {
	const user = useSelector((state) => state.auth.user);
	const [payments, setPayments] = useState([]);
	const { language } = useLanguage();
	const [dataLoading, setDataLoading] = useState(false);
	const [error, setError] = useState(null);
	const [page, setPage] = useState(0);
	const [numberOfPages, setNumberOfPages] = useState(0);
	const [openList, setOpenList] = useState([]);

	function timestampToString(timestampInSeconds) {
		if (!timestampInSeconds) return "";
		return new Date(timestampInSeconds * 1000).toLocaleDateString();
	}
	function timestampToTimeString(timestampInSeconds) {
		if (!timestampInSeconds) return "";
		return new Date(timestampInSeconds * 1000).toLocaleString();
	}
	const tryAgain = () => {
		loadData();
	};
	const loadMore = () => {
		setPage(page + 1);
	};

	useEffect(() => {
		loadData();
	}, [page]);

	const loadData = () => {
		setError(null);
		setDataLoading(true);
		axios
			.post(
				`https://getuserspayments-l2ugzeb65a-uc.a.run.app/`,
				{
					userId: user.uid,
					currentPage: page || 1,
					itemsPerPage: page ? 30 : 6,
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
					setPayments(response.data.data);
				} else {
					setPayments([...payments, ...response.data.data]);
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
		<MDBContainer className="pt-4" style={{ maxWidth: 720 }}>

			<div className="position-relative">
				<MDBCard
					className="mb-4 text-light gradient-primary-2 z-3"
					style={{ zIndex: 3 }}
				>
					<MDBCardBody className="text-white text-center">
						<MDBTypography tag="div">{t("Available balance")}</MDBTypography>
						<MDBTypography tag="h1" className="font-black">
							{formatNumber(user.balance || 0)}{" "}
							{user.currency?.toUpperCase() || "XAF"}
						</MDBTypography>
						<MDBBtn outline color="white" rounded tag={Link} to="/payment">
							{t("Add Funds")}
						</MDBBtn>
					</MDBCardBody>
				</MDBCard>

				<MDBCard className="text-light gradient-primary-2 position-absolute wallet-z-2">
					<MDBCardBody className="text-white text-center"></MDBCardBody>
				</MDBCard>
				<MDBCard className="text-light gradient-primary-2 position-absolute wallet-z-1">
					<MDBCardBody className="text-white text-center"></MDBCardBody>
				</MDBCard>
			</div>

			<MDBCard className="mb-3 text-light gradient-primary-2" tag={Link} to="/affiliate">
				<MDBCardBody className="d-flex align-items-center py-2">
					<MDBTypography tag="div">{t("Affiliate balance")}:</MDBTypography>
					<MDBTypography tag="h5" className="font-black mb-0 ms-2">
						{formatNumber(user.affiliate_balance || 0)}{" "}
						{user.currency?.toUpperCase() || "XAF"}
					</MDBTypography>
					<MDBIcon fas icon="angle-right" className="ms-auto" />
				</MDBCardBody>
			</MDBCard>

			<MDBTypography className="font-black text-center mb-2">
				{t("Recent acitivities")}
			</MDBTypography>
			{payments.map((payment) => (
				<React.Fragment key={payment.id}>
					<MDBBtn
						color="light"
						block
						className="d-flex text-start align-items-center text-transform-none mt-2"
						onClick={() => toggleCollapse(payment.id)}
					>
						{payment.type == "payment" && (
							<MDBIcon fas icon="money-bill" className="me-3" size="2x" />
						)}
						{payment.type == "refund" && (
							<MDBIcon fas icon="undo" className="me-3" size="2x" />
						)}
						{payment.type == "referral" && (
							<MDBIcon fas icon="gift" className="me-3" size="2x" />
						)}
						<div className="me-auto">
							<div className="text-transform-capitalize font-black">
								{payment.type}
							</div>
							<div>
								{payment.order_status && payment.order_status[language]}
							</div>
						</div>
						<div className="text-end">
							<div className="text-success text-transform-uppercase">
								{payment.amount && "+"} {formatNumber(payment.amount)}{" "}
								{payment.currency}
							</div>
							<div>{timestampToString(payment.date._seconds)}</div>
						</div>
					</MDBBtn>
					<MDBCollapse open={openList.includes(payment.id)} className="ps-4">
						<div>
							<span className="font-black">Amount</span> :{" "}
							<span className="text-transform-uppercase text-success">
								{formatNumber(payment.amount)} {payment.currency}
							</span>
						</div>
						<div>
							<span className="font-black">Date</span> :{" "}
							<span>
								{timestampToTimeString(
									payment.order_date?._seconds || payment.date._seconds
								) || ""}
							</span>
						</div>
						{(payment.payment_method || payment.type == "referral") && (
							<div>
								<span className="font-black">Payment Method</span> :{" "}
								<span>
									{payment.payment_method
										? payment.payment_method[language]
										: "Referral"}
								</span>
							</div>
						)}
						{payment.type == "refund" && (
							<div>
								<span className="font-black">Refunded order</span> :<br />
								<div className="ps-2 small">
									<span className="font-black">Service name</span> :{" "}
									<span>
										{payment.subservice_name[language]}
									</span>
								</div>
								<div className="ps-2 small">
									<span className="font-black">Quantity</span> :{" "}
									<span>{payment.quantity}</span>
								</div>
								<div className="ps-2 small">
									<span className="font-black">Order status</span> :{" "}
									<span>
										{payment.order_status[language]}
									</span>
								</div>
								<div className="ps-2 small">
									<span className="font-black">Order date</span> :{" "}
									<span>
										{timestampToTimeString(payment.order_date)}
									</span>
								</div>
								<div className="ps-2 small">
									<span className="font-black">Order ID</span> :{" "}
									<span>{payment.order_id}</span>
								</div>
							</div>
						)}
						<div>
							<span className="font-black">ID</span> :{" "}
							<span className="small">{payment.id}</span>
						</div>
					</MDBCollapse>
				</React.Fragment>
			))}

			<div className="text-center py-2">
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
							{t("Try again")}
						</MDBBtn>
					</>
				) : numberOfPages > page ? (
					<MDBBtn color="link" onClick={loadMore}>
						{t("Load More")}
					</MDBBtn>
				) : payments.length > 0 ? (
					t("No more data to load.")
				) : (
					t("No data to load.")
				)}
			</div>

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

export default Wallet;
