import { useNavigate, useRouteError } from "react-router-dom";
import { t } from "i18next";

export default function ErrorPage() {
	const navigate = useNavigate();
	const error = useRouteError();
	console.error(error);

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
					<button
						className="btn btn-primary"
						onClick={() => navigate("/")}
					>
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
