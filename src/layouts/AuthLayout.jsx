import React from "react";
import { Link, Outlet } from "react-router-dom";
// import { RegularGoogle } from "lineicons-react";

export default function AuthLayout() {
	return (
		<>
			<div className="container d-lg-flex mt-80">
				<img src="/logopng 1.png" alt="logo" />
				<div className="d-flex ms-auto">
					<Link
						to="/auth/signup"
						className="btn btn-secondary my-auto auth-btn full-radius"
					>
						SIGN UP
					</Link>
					<Link
						to="/auth/signin"
						className="btn btn-secondary ms-4 my-auto auth-btn full-radius"
					>
						SIGN IN
					</Link>
				</div>
			</div>
			<div className="container mt-100">
				<div className="row">
					<div className="col-lg-7 col-md-12">
						<h1 className="display-1 display-text">
							BOOST YOUR
							<br />
							SOCIAL MEDIA
						</h1>
						<p className="cover-letter">
							Join thousands of Brands and Influencers who elevated their social
							media growth with Exo Booster, the most trusted social media
							boosting service with over 50,000 users
						</p>
					</div>
					<div className="col-lg-5 col-md-12 m-text-end">
						<img src="/image 1.png" alt="phone" className="img-fluid" />
					</div>
				</div>
				<div className="auth-main mt-80 mb-200 position-relative">
					<img
						src="/imageedit_4_7994726930 1.png"
						className="cloud"
						id="cloud-3"
					/>
					<Outlet />
				</div>
				<div className="auth-footer position-relative">
					<img
						src="/imageedit_4_7994726930 1.png"
						className="cloud"
						id="cloud-2"
					/>
					<img
						src="/imageedit_4_7994726930 1.png"
						className="cloud"
						id="cloud-1"
					/>
					<div className="position-relative">
						<div className="card bg-pink radius-20 mb-200">
							<div className="card-body p-2 d-flex font-40">
								<div className="flex-grow-1 border-end border-black border-1 text-center">
									<div>5,000,000+</div>
									<div>Orders</div>
								</div>
								<div className="flex-grow-1 text-center">
									<div>50,000+</div>
									<div>Users</div>
								</div>
							</div>
						</div>
						<div className="text-center font-50 mb-5 z-1">Why Exo Booster?</div>
						<div className="d-md-block d-lg-flex justify-content-center gap-5 mb-100 text-webkit-center">
							<div className="card bg-pink text-center radius-20 w-300 mb-4">
								<div className="card-body p-4">
									<img
										src="/icons/thumb-up-svgrepo-com.svg"
										alt="easyToUseInterface"
										height={50}
										className="mb-2"
									/>
									<h3 className="Nunito-Black">Easy-to-use interface</h3>
									<hr />
									<p className="lead">
										Exo boosters interface is as easy as ABC, from account
										creation to making your first order
									</p>
								</div>
							</div>
							<div className="card bg-pink text-center radius-20 w-300 mb-4">
								<div className="card-body p-4">
									<img
										src="/icons/life-ring-svgrepo-com.svg"
										alt="easyToUseInterface"
										height={50}
										className="mb-2"
									/>
									<h3 className="Nunito-Black">
										Live chat
										<br />
										support
									</h3>
									<hr />
									<p className="lead">
										Exo boosters interface is as easy as ABC, from account
										creation to making your first order
									</p>
								</div>
							</div>
							<div className="card bg-pink text-center radius-20 w-300 mb-4">
								<div className="card-body p-4">
									<img
										src="/icons/launch-svgrepo-com.svg"
										alt="easyToUseInterface"
										height={50}
										className="mb-2"
									/>
									<h3 className="Nunito-Black">Super instant results</h3>
									<hr />
									<p className="lead">
										Exo boosters interface is as easy as ABC, from account
										creation to making your first order
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
