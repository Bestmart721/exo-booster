import { t } from "i18next";
import {
	MDBBtn,
	MDBCard,
	MDBCardBody,
	MDBCardImage,
	MDBCol,
	MDBContainer,
	MDBIcon,
	MDBRow,
	MDBTypography,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchReferralInfo } from "../firebaseAuth";
import axios from "axios";
import { modalError } from "../store/appSlice";
import { useLanguage } from "../layouts/LanguageContext";
import SweetAlert2 from "react-sweetalert2";

function formatNumber(num = 0) {
	return num.toLocaleString();
}

const Affiliate = () => {
	const navigate = useNavigate();
	const [data, setData] = useState({});
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();
	const { language } = useLanguage();
	const [swalProps, setSwalProps] = useState({});

	useEffect(() => {
		fetchReferralInfo()
			.then((data) => {
				setData(data);
			})
			.catch((error) => {
				dispatch(modalError("Check your internet connection and try again."));
			});
	}, [dispatch]);

	const transferBalance = () => {
		axios
			.post(
				`https://convertaffiliatebalance-l2ugzeb65a-uc.a.run.app/`,
				{
					userId: user.uid,
				},
				{
					headers: {
						Authorization: `Bearer ${user.accessToken}`,
					},
				}
			)
			.then((response) => {
				if (response.data.error) {
					return setSwalProps({
						show: true,
						title: "Error",
						text: response.data.error[language],
						icon: "error",
						customClass: {
							confirmButton: "btn btn-primary btn-block",
						},
						preConfirm: () => {
							setSwalProps({ show: false });
						},
					});
				}
				setSwalProps({
					show: true,
					title:
						response.data.en ==
						"Your affiliate balance is empty, invite people to the Exo Booster App and earn !"
							? "Inform"
							: "Success",
					text: response.data[language],
					icon:
						response.data.en ==
						"Your affiliate balance is empty, invite people to the Exo Booster App and earn !"
							? "info"
							: "success",
					customClass: {
						confirmButton: "btn btn-primary btn-block",
					},
					preConfirm: () => {
						setSwalProps({ show: false });
					},
				});
			});
	};

	const goBack = () => {
		navigate(-1);
	};

	return (
		<MDBContainer className="p-4 pb-0" style={{ maxWidth: 720 }}>
			<SweetAlert2 {...swalProps} />
			<div className="d-flex align-items-center mb-2">
				<MDBBtn color="link" floating onClick={goBack}>
					<MDBIcon fas icon="arrow-left" color="primary" size="2x" />
				</MDBBtn>
				<MDBTypography tag="h4" className="font-black mb-0 ms-2">
					{t("Affiliate Balance")}
				</MDBTypography>
			</div>

			<MDBCard
				className="mb-4 text-light gradient-primary-2 z-3"
				style={{ zIndex: 3 }}
			>
				<MDBCardBody className="text-white text-center py-4">
					<MDBTypography tag="h1" className="font-black">
						{formatNumber(user.affiliate_balance || 0)}{" "}
						{user.currency?.toUpperCase() || "XAF"}
					</MDBTypography>
					<MDBBtn outline color="white" rounded onClick={transferBalance}>
						{t("Transfer to wallet balance")}
					</MDBBtn>
				</MDBCardBody>
			</MDBCard>

			<MDBCard className="mb-3 gradient-primary">
				<MDBRow className="g-0">
					<MDBCol className="align-self-center">
						<MDBCardBody className="pe-0">
							<MDBTypography tag="div" className="text-white">
								{data.bannerText}
							</MDBTypography>
						</MDBCardBody>
					</MDBCol>
					<MDBCol style={{ maxWidth: 150 }} className="align-self-center">
						<MDBCardImage
							src="/marketing strategy concept businessman shout_7303120 1.png"
							alt="marketing strategy concept businessman shout"
							className="img-fluid"
						/>
					</MDBCol>
				</MDBRow>
			</MDBCard>
		</MDBContainer>
	);
};

export default Affiliate;