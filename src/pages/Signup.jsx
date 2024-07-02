import axios from "axios";
import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

export async function loadSignupData() {
	let response = await axios.get(
		`https://cors-anywhere.herokuapp.com/https://getsupportedcountries-l2ugzeb65a-uc.a.run.app/`,
		{
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
		}
	);
	let countries = Object.keys(response.data).map((key) => response.data[key]);
	countries = [
		{ enabled: false, name: "", label: "Choose your country" },
		...countries,
	];
	console.log(navigator.userAgent);
	return { countries };
}

export default function Signup() {
	const { countries } = useLoaderData();
	const [formData, setFormData] = useState({
		country: "",
		currency: "",
		username: "",
		password: "",
		confirm: "",
		whatsapp_number: "",
		device: { os: "", userAgent: navigator.userAgent },
		language: "",
		referralCode: "",
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	return (
		<>
			<h1 className="display-4 text-center Nunito-Black mb-5">
				Create your account
			</h1>
			<form className="w-465 mx-auto">
				<div className="input-group mb-4 m-input-group">
					<span className="input-group-text full-radius">
						<img src="/icons/user.svg" alt="user" />
					</span>
					<input
						type="text"
						onChange={handleChange}
						className="form-control full-radius"
						placeholder="Username"
						name="username"
						value={formData.username}
					/>
				</div>
				<div className="input-group mb-4 m-input-group">
					<span className="input-group-text full-radius">
						<img src="/icons/user.svg" alt="user" />
					</span>
					<input
						type="text"
						onChange={handleChange}
						className="form-control full-radius"
						placeholder="Whatsapp number"
						name="whatsapp_number"
						value={formData.whatsapp_number}
					/>
				</div>
				<div className="input-group mb-4 m-input-group">
					<span className="input-group-text full-radius">
						<img src="/icons/user.svg" alt="user" />
					</span>
					<select
						type="text"
						onChange={handleChange}
						className="form-control full-radius"
						placeholder="Choose your country"
						name="country"
						value={formData.country}
					>
						{countries.map((c) => (
							<option value={c.name} key={c.name} disabled={!c.enabled}>
								{c.name || c.label}
							</option>
						))}
					</select>
				</div>
				<div className="input-group mb-4 m-input-group">
					<span className="input-group-text full-radius">
						<img src="/icons/lock1.svg" alt="user" />
					</span>
					<input
						type="password"
						onChange={handleChange}
						className="form-control full-radius"
						placeholder="Password"
						name="password"
						value={formData.password}
					/>
					<span className="input-group-text full-radius">
						<img src="/icons/eye.svg" alt="user" />
					</span>
				</div>
				<div className="input-group mb-4 m-input-group">
					<span className="input-group-text full-radius">
						<img src="/icons/lock1.svg" alt="user" />
					</span>
					<input
						type="text"
						onChange={handleChange}
						className="form-control full-radius"
						placeholder="Confirm your password"
						name="confirm"
						value={formData.confirm}
					/>
					<span className="input-group-text full-radius">
						<img src="/icons/eye.svg" alt="user" />
					</span>
				</div>
				<div className="input-group mb-4 m-input-group">
					<span className="input-group-text full-radius">
						<img src="/icons/user.svg" alt="user" />
					</span>
					<input
						type="text"
						onChange={handleChange}
						className="form-control full-radius"
						placeholder="Referral code (Optional)"
						name="referralCode"
						value={formData.referralCode}
					/>
				</div>
				<div className="text-center mt-5">
					<button className="btn btn-primary full-radius btn-purple w-250">
						CREATE
					</button>
				</div>
			</form>
			<div className="d-flex align-items-center mt-4 w-250 mx-auto">
				<hr className="flex-grow-1 opacity-100" />
				<span className="px-3">OR</span>
				<hr className="flex-grow-1 opacity-100" />
			</div>
			<div className="d-flex justify-content-center mt-4 Nunito-Black lead">
				Already have an account?{" "}
				<Link to="/auth/signin" className="ms-3 Nunito-Black color-purple">
					LOGIN
				</Link>
			</div>
		</>
	);
}
