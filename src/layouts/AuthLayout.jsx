import React from "react";
import { Link, Outlet } from "react-router-dom";
// import { RegularGoogle } from "lineicons-react";

export default function AuthLayout() {
	return (
		<>
			<div className="container d-flex mt-80">
				<img src="/logopng 1.png" alt="logo" />
				<Link to="/auth/signup" className="btn btn-secondary ms-auto my-auto auth-btn full-radius">
					SIGN UP
				</Link>
				<Link to="/auth/signin" className="btn btn-secondary ms-4 my-auto auth-btn full-radius">
					SIGN IN
				</Link>
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
				<div className="auth-main mt-80">
					<Outlet/>
				</div>
				<div className="auth-footer">
					<div className="card bg-pink">
						<div className="card-body p-2 d-flex">
							<div className="flex-grow-1 p-2 border-end border-black border-1 text-center">
								<div>5,000,000+</div>
								<div>Orders</div>
							</div>
							<div className="flex-grow-1 p-2 text-center">
								<div>5,000,000+</div>
								<div>Orders</div>
							</div>
						</div>
					</div>
					<img src="/imageedit_4_7994726930 1.png" />
					<img src="/imageedit_4_7994726930 1.png" />
					<div className="text-center">Why Exo Booster?</div>
					<div className="d-flex justify-content-center gap-5 mb-5">
						<div className="card bg-pink text-center">
							<div className="card-body">
								<img src="/icons/image 2.png" alt="easyToUseInterface" />
								<h3 className="Nunito-Black">Easy-to-use interface</h3>
								<hr />
								<p>
									Exo boosters interface is as easy as ABC, from account
									creation to making your first order
								</p>
							</div>
						</div>
						<div className="card bg-pink text-center">
							<div className="card-body">
								<img src="/icons/image 3.png" alt="easyToUseInterface" />
								<h3 className="Nunito-Black">Live chat support</h3>
								<hr />
								<p>
									Exo boosters interface is as easy as ABC, from account
									creation to making your first order
								</p>
							</div>
						</div>
						<div className="card bg-pink text-center">
							<div className="card-body">
								<img src="/icons/image 4.png" alt="easyToUseInterface" />
								<h3 className="Nunito-Black">Super instant results</h3>
								<hr />
								<p>
									Exo boosters interface is as easy as ABC, from account
									creation to making your first order
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
