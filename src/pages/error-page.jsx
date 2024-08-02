import { useNavigate, useRouteError } from "react-router-dom";
import { t, use } from "i18next";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function ErrorPage() {
	const navigate = useNavigate();
	const error = useRouteError();
	const user = useSelector((state) => state.auth.user);

	useEffect(() => {
		if (error) {
			console.log(window.location.pathname)
			console.error(error);
			console.error(user?.uid);
			axios.post(
				`https://sitebugreport-l2ugzeb65a-uc.a.run.app/`,
				{
					userId: user?.uid || undefined,
					errorPagePath: window.location.pathname,
					errorMessage: JSON.stringify(error),
				}
			).then((response) => {
				console.log(response.data);
				console.log("Error reported to the server.");
			});
		}
	}, [error, user]);
	
	return (
		<div
			id="error-page"
			className="d-flex align-self-center flex-column justify-content-center text-center mt-5- pb-5 vh-100"
		>
			<img src={"/error.jpg"} alt="Error" className="img-fluid" />
			<h1>{t("Oops!")}</h1>
			<p>{t("Sorry, an unexpected error has occurred.")}</p>
			<p>
				<i>{error.statusText}</i>
			</p>
			<div className="text-center">
				{error.status == 404 ? (
					<button className="btn btn-primary" onClick={() => navigate("/")}>
						{t("Go to homepage")}
					</button>
				) : (
					<button
						className="btn btn-primary"
						onClick={() => window.location.reload()}
					>
						{t("Reload this page.")}
					</button>
				)}
			</div>
		</div>
	);
}
