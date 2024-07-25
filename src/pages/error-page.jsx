import { useRouteError } from "react-router-dom";
import { t } from "i18next";

export default function ErrorPage() {
	const error = useRouteError();
	console.error(error);

	return (
		<div
			id="error-page"
			className="d-flex align-self-center flex-column justify-content-center h-100 text-center mt-5"
		>
			<h1>{t("Oops!")}</h1>
			<p>{t("Sorry, an unexpected error has occurred.")}</p>
			<p>
				<i>{error.statusText}</i>
			</p>
			<div className="text-center">
				<button
					className="btn btn-primary"
					onClick={() => window.location.reload()}
				>
					{t("Reload this page.")}
				</button>
			</div>
		</div>
	);
}
