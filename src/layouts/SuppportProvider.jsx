import { t } from "i18next";
import {
	MDBBtn,
	MDBModal,
	MDBModalBody,
	MDBModalContent,
	MDBModalDialog,
	MDBModalFooter,
} from "mdb-react-ui-kit";
import React, { createContext, useEffect, useState } from "react";
import { fetchSupportContacts } from "../firebaseAPI";
import { useLanguage } from "./LanguageContext";

const SupportContext = createContext();

const SupportProvider = ({ children, language }) => {
	const [showModal, setShowModal] = useState(false);
	const [supportContacts, setSupportContacts] = useState({});

	useEffect(() => {
		fetchSupportContacts()
			.then((data) => {
				setSupportContacts(data);
			})
			.catch((error) => {
				// dispatch(modalError(t(error)));
			});
	}, []);

	// Function to show the modal
	const showSupportModal = () => {
		setShowModal(true);
	};

	// Function to hide the modal
	const closeSupportModal = () => {
		setShowModal(false);
	};

	return (
		<SupportContext.Provider value={{ showSupportModal, closeSupportModal }}>
			{children}

			<MDBModal tabIndex="-1" open={showModal} onClose={closeSupportModal}>
				<MDBModalDialog centered style={{ maxWidth: 400 }}>
					<MDBModalContent>
						<MDBModalBody className="text-center py-5">
							<img src="/favcon 1.png" className="img-fluid mb-5" alt="logo" />

							{supportContacts.Email && (
								<>
									<h3 className="font-black">{t("Have a problem?")}</h3>
									<div className="lead">
										{t("Kindly contact us through email:")}
									</div>
									<div className="lead text-primary">
										<a
											href={supportContacts.Email[language]?.link}
											target="_blank"
										>
											{supportContacts.Email[language]?.name}
										</a>
									</div>
									<div className="lead">{t("Whatsapp")}:</div>
									<div className="lead text-primary">
										<a
											href={supportContacts.Whatsapp[language]?.link}
											target="_blank"
										>
											{supportContacts.Whatsapp[language]?.name}
										</a>
									</div>
									<div className="lead">{t("Or Telegram")}:</div>
									<div className="lead text-primary">
										<a
											href={supportContacts.Telegram[language]?.link}
											target="_blank"
										>
											{supportContacts.Telegram[language]?.name}
										</a>
									</div>
								</>
							)}
						</MDBModalBody>
						<MDBModalFooter>
							<MDBBtn color="primary" onClick={closeSupportModal}>
								{t("OK")}
							</MDBBtn>
						</MDBModalFooter>
					</MDBModalContent>
				</MDBModalDialog>
			</MDBModal>
		</SupportContext.Provider>
	);
};

export default SupportProvider;
