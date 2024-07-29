import {
	MDBBtn,
	MDBCard,
	MDBCardBody,
	MDBCardImage,
	MDBCardTitle,
	MDBCol,
	MDBContainer,
	MDBRow,
	MDBTypography,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { fetchReferralInfo } from "../firebaseAPI";
import { modalError } from "../store/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { Input, InputGroup } from "reactstrap";
import { t } from "i18next";
import { useLanguage } from "../layouts/LanguageContext";

const Referral = () => {
	const dispatch = useDispatch();
	const [data, setData] = useState({});
	const user = useSelector((state) => state.auth.user);
	const { language } = useLanguage();

	useEffect(() => {
		fetchReferralInfo()
			.then((data) => {
				setData(data);
			})
			.catch((error) => {
				dispatch(modalError(t("Check your internet connection and reload the page.")));
			});
	}, [dispatch]);

	return (
		<MDBContainer className="pt-3">
			<MDBTypography tag="h4" className="font-black text-center">
				{t("Referral Program")}
			</MDBTypography>
			<MDBCard className="mb-3 gradient-primary">
				<MDBRow className="g-0">
					<MDBCol className="align-self-center">
						<MDBCardBody className="pe-0">
							<MDBTypography tag="div" className="text-white">
								{data[language]?.bannerText}
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
			<MDBCard className="mb-3">
				<MDBCardBody>
					<MDBCardTitle className="font-black">
						{t("Invite friends & family")}
					</MDBCardTitle>
					<MDBTypography tag="small" className="text-secondary">
						{t("Share your referral code with friends and family")}
					</MDBTypography>
					<InputGroup>
						<Input
							placeholder={t("Referral code")}
							type="text"
							defaultValue={user.referralCode}
							readOnly
						/>
						<MDBBtn
							onClick={() => {
								navigator.clipboard.writeText(user.referralCode);
							}}
						>
							{t("Copy")}
						</MDBBtn>
					</InputGroup>
				</MDBCardBody>
			</MDBCard>
			<MDBCard className="mb-3">
				<MDBCardBody>
					<MDBCardTitle className="font-black">
						{t("How it works?")}
					</MDBCardTitle>
					{data[language]?.refSteps?.map((item, index) => (
						<MDBTypography tag="p" className="mb-1" key={index}>
							<span className="font-black">{index + 1}.</span> {item}
						</MDBTypography>
					))}
				</MDBCardBody>
			</MDBCard>
			{/* <MDBBtn block>Share your Referral code</MDBBtn> */}
		</MDBContainer>
	);
};

export default Referral;
