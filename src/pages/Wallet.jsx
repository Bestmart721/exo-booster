import {
	MDBBtn,
	MDBCard,
	MDBCardBody,
	MDBContainer,
	MDBIcon,
	MDBTypography,
} from "mdb-react-ui-kit";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function formatNumber(num = 0) {
	return num.toLocaleString();
}

const Wallet = () => {
	const user = useSelector((state) => state.auth.user);

	return (
		<MDBContainer className="pt-3">
			<MDBTypography tag="h4" className="font-black text-center">
				Wallet
			</MDBTypography>

			<div className="position-relative">
				<MDBCard
					className="mb-4 text-light gradient-primary-2 z-3"
					style={{ zIndex: 3 }}
				>
					<MDBCardBody className="text-white text-center">
						<MDBTypography tag="div">Available balance</MDBTypography>
						<MDBTypography tag="h1" className="font-black">
							{formatNumber(user.balance || 0)}{" "}
							{user.currency?.toUpperCase() || "XAF"}
						</MDBTypography>
						<MDBBtn outline color="white" rounded tag={Link} to="/payment">
							Add Funds
						</MDBBtn>
					</MDBCardBody>
				</MDBCard>

				<MDBCard
					className="text-light gradient-primary-2 position-absolute wallet-z-2"
				>
					<MDBCardBody className="text-white text-center"></MDBCardBody>
				</MDBCard>
				<MDBCard
					className="text-light gradient-primary-2 position-absolute wallet-z-1"
				>
					<MDBCardBody className="text-white text-center"></MDBCardBody>
				</MDBCard>
			</div>

			<MDBCard className="mb-3 text-light gradient-primary-2">
				<MDBCardBody className="d-flex align-items-center py-2">
					<MDBTypography tag="div">Affiliate Balance:</MDBTypography>
					<MDBTypography tag="h5" className="font-black mb-0 ms-2">
						{formatNumber(user.balance || 0)}{" "}
						{user.currency?.toUpperCase() || "XAF"}
					</MDBTypography>
					<MDBIcon fas icon="angle-right" className="ms-auto" />
				</MDBCardBody>
			</MDBCard>
		</MDBContainer>
	);
};

export default Wallet;
