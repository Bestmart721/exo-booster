import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
	const error = useRouteError();
	console.error(error);

	return (
		<div
			id="error-page"
			className="d-flex align-self-center flex-column justify-content-center h-100 text-center"
		>
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
			<div className="text-center">
				<button
					className="btn btn-primary"
					onClick={() => window.location.reload()}
				>
					Reload this page.
				</button>
			</div>
		</div>
	);
}
