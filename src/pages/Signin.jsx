import React from "react";
import { Link } from "react-router-dom";

export default function Signin() {
	return (
		<>
			<h1 className="display-4 text-center Nunito-Black mb-5">Log in</h1>
			<form className="w-465 mx-auto">
				<div className="input-group mb-4 m-input-group">
					<span className="input-group-text full-radius">
						<img src="/icons/user.svg" alt="user" />
					</span>
					<input
						type="text"
						className="form-control full-radius"
						placeholder="Username"
					/>
				</div>
				<div className="input-group mb-4 m-input-group">
					<span className="input-group-text full-radius">
						<img src="/icons/lock1.svg" alt="user" />
					</span>
					<input
						type="password"
						className="form-control full-radius"
						placeholder="Password"
					/>
					<span className="input-group-text full-radius">
						<img src="/icons/eye.svg" alt="user" />
					</span>
				</div>
				<div className="text-center mt-5">
					<button className="btn btn-primary full-radius btn-purple w-250">
						LOGIN
					</button>
				</div>
			</form>
			<div className="d-flex align-items-center mt-4 w-250 mx-auto">
				<hr className="flex-grow-1 opacity-100" />
				<span className="px-3">OR</span>
				<hr className="flex-grow-1 opacity-100" />
			</div>
			<div className="d-flex justify-content-center mt-4 Nunito-Black lead">
				Don't have an account ? <Link to="/auth/signup" className="ms-3 Nunito-Black color-purple">CREATE</Link>
			</div>
		</>
	);
}
