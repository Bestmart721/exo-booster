import {
	MDBBtn,
	MDBCard,
	MDBCardBody,
	MDBCardFooter,
	MDBCardHeader,
	MDBCardImage,
	MDBCardTitle,
	MDBCol,
	MDBContainer,
	MDBIcon,
	MDBRow,
	MDBTabsContent,
	MDBTabsPane,
	MDBTypography,
} from "mdb-react-ui-kit";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { Input, InputGroup } from "reactstrap";

const Payment = () => {
	const [active, setActive] = useState("chooseMethod");
	const navigate = useNavigate();
	const [amount, setAmount] = useState(0);
	const [phoneNumber, setPhoneNumber] = useState("");
	const user = useSelector((state) => state.auth.user);

	const selectMothod = () => {
		setActive("paymentInfo");
	};

	const goBack = () => {
		navigate(-1);
	};

	return (
		<MDBContainer className="p-4 pb-0" style={{ maxWidth: 720 }}>
			<MDBTabsContent>
				<MDBTabsPane open={active == "chooseMethod"} id="chooseMethod">
					<div className="d-flex align-items-center mb-2">
						<MDBBtn color="link" floating onClick={goBack}>
							<MDBIcon fas icon="arrow-left" color="primary" size="2x" />
						</MDBBtn>
						<MDBTypography tag="h4" className="font-black mb-0 ms-2">
							Add Funds
						</MDBTypography>
					</div>
					<MDBTypography tag="p" className="text-muted">
						Choose a payment method:
					</MDBTypography>

					<MDBRow>
						<MDBCol md="4">
							<motion.div
								initial={{ scale: 1 }}
								transition={{ ease: "easeInOut", duration: 0.2 }}
								whileHover={{ scale: 1.05 }}
							>
								<MDBCard className="mb-4" onClick={() => selectMothod()}>
									<MDBCardHeader
										style={{ backgroundColor: "#feca05" }}
										className="d-flex"
									>
										<MDBCardImage
											src="/mtn.png"
											alt="mtn mobile money"
											className="img-fluid mx-auto"
											width={180}
										/>
									</MDBCardHeader>
									<MDBCardFooter>
										<MDBCardTitle tag="h6" className="font-black mb-0 text-center">
											MTN / ORANGE MONEY
										</MDBCardTitle>
									</MDBCardFooter>
								</MDBCard>
							</motion.div>
						</MDBCol>
						<MDBCol md="4">
							<motion.div
								initial={{ scale: 1 }}
								transition={{ ease: "easeInOut", duration: 0.2 }}
								whileHover={{ scale: 1.05 }}
							>
								<MDBCard className="mb-4" onClick={() => selectMothod()}>
									<MDBCardHeader
										style={{ backgroundColor: "#feca05" }}
										className="d-flex"
									>
										<MDBCardImage
											src="/mtn.png"
											alt="mtn mobile money"
											className="img-fluid mx-auto"
											width={180}
										/>
									</MDBCardHeader>
									<MDBCardFooter>
										<MDBCardTitle tag="h6" className="font-black mb-0 text-center">
											MTN / ORANGE MONEY
										</MDBCardTitle>
									</MDBCardFooter>
								</MDBCard>
							</motion.div>
						</MDBCol>
						<MDBCol md="4">
							<motion.div
								initial={{ scale: 1 }}
								transition={{ ease: "easeInOut", duration: 0.2 }}
								whileHover={{ scale: 1.05 }}
							>
								<MDBCard className="mb-4" onClick={() => selectMothod()}>
									<MDBCardHeader
										style={{ backgroundColor: "#feca05" }}
										className="d-flex"
									>
										<MDBCardImage
											src="/mtn.png"
											alt="mtn mobile money"
											className="img-fluid mx-auto"
											width={180}
										/>
									</MDBCardHeader>
									<MDBCardFooter>
										<MDBCardTitle tag="h6" className="font-black mb-0 text-center">
											MTN / ORANGE MONEY
										</MDBCardTitle>
									</MDBCardFooter>
								</MDBCard>
							</motion.div>
						</MDBCol>
					</MDBRow>
				</MDBTabsPane>

				<MDBTabsPane open={active == "paymentInfo"} id="paymentInfo">
					<div className="d-flex align-items-center mb-2">
						<MDBBtn
							color="link"
							floating
							onClick={() => setActive("chooseMethod")}
						>
							<MDBIcon fas icon="arrow-left" color="primary" size="2x" />
						</MDBBtn>
						<MDBTypography tag="h4" className="font-black mb-0 ms-2">
							Payment Info
						</MDBTypography>
					</div>
					<MDBTypography tag="p" className="text-muted">
						Fill in the information below and press pay.
					</MDBTypography>

					<label>Payment method:</label>
					<MDBCard className="mb-4">
						<MDBRow>
							<MDBCol className="align-self-center">
								<MDBCardBody className="pe-0">
									<MDBTypography tag="div">MTN / ORANGE MONEY</MDBTypography>
								</MDBCardBody>
							</MDBCol>
							<MDBCol style={{ maxWidth: 120 }}>
								<div
									className="p-2 rounded-5 rounded-start-0 h-100 align-content-center"
									style={{ backgroundColor: "#feca05" }}
								>
									<MDBCardImage
										src="/mtn.png"
										alt="mtn mobile money"
										className="img-fluid"
									/>
								</div>
							</MDBCol>
						</MDBRow>
					</MDBCard>

					<label>Amount:</label>
					<InputGroup className="mb-4 bg-white">
						<Input
							type="number"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
						/>
						<MDBBtn outline color="primary">
							{user.currency}
						</MDBBtn>
					</InputGroup>

					<label>Phone number:</label>
					<Input
						type="tel"
						className="mb-4"
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
					/>

					<div className="w-250 mx-auto">
						<MDBBtn color="success" size="lg" className="font-black" block>
							Pay
						</MDBBtn>
					</div>
				</MDBTabsPane>
			</MDBTabsContent>
		</MDBContainer>
	);
};

export default Payment;
