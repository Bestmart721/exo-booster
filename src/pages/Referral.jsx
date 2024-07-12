import {
	MDBBtn,
	MDBCard,
	MDBCardBody,
	MDBCardImage,
	MDBCardTitle,
	MDBCol,
	MDBContainer,
	MDBInput,
	MDBInputGroup,
	MDBRow,
	MDBTypography,
} from "mdb-react-ui-kit";
import React from "react";

const Referral = () => {
	const refCode = "TESTCODE-CFD";

	return (
		<MDBContainer className="pt-3 mb-4">
			<MDBTypography tag="h4" className="font-black text-center">
				Referral Program
			</MDBTypography>
			<MDBCard className="mb-3 gradient-primary">
				<MDBRow className="g-0">
					<MDBCol className="align-self-center">
						<MDBCardBody className="pe-0">
							<MDBTypography tag="div" className="text-white">
								Get a 3% reward each time you invite a friend to Exo Booster
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
						Invite friends & family
					</MDBCardTitle>
					<MDBTypography tag="small" className="text-secondary">
						Copy your code and share it with your friends
					</MDBTypography>
					<MDBInputGroup>
						<input
							className="form-control"
							placeholder="Recipient's username"
							type="text"
							value={refCode}
							readOnly
						/>
						<MDBBtn>Copy</MDBBtn>
					</MDBInputGroup>
				</MDBCardBody>
			</MDBCard>
			<MDBCard className="mb-3">
				<MDBCardBody>
					<MDBCardTitle className="font-black">How it works?</MDBCardTitle>
					<MDBTypography tag="p" className="mb-1">
						1. Tell friends/family to download the Exo Booster App
					</MDBTypography>
					<MDBTypography tag="p" className="mb-1">
						2. On the sign up page, they should use your referral code
					</MDBTypography>
					<MDBTypography tag="p" className="mb-0">
						3. Your friend gets a 10% discount on his 5 next orders, and you get a
						3% equivalent of any amount he deposits into his Exo balance FOREVER
					</MDBTypography>
				</MDBCardBody>
			</MDBCard>
			<MDBBtn block>Share your Referral code</MDBBtn>
		</MDBContainer>
	);
};

export default Referral;
