import "./App.css";
import Header from "./components/Header";
import PsudueCard from "./components/PsudueCard";
import Aside from "./components/Aside";
import { useState, useRef } from "react";
function App() {
	const [views, setViews] = useState(17000);
	const sliderRef = useRef<HTMLDivElement>(null);

	const handleDrag = (e: React.DragEvent<HTMLSpanElement>) => {
		if (!sliderRef.current) return;

		// Get the bounding rectangle of the slider container
		const sliderRect = sliderRef.current.getBoundingClientRect();
		console.log(sliderRect.right);

		// Calculate the new position relative to the slider width
		const newLeft = Math.min(
			Math.max(e.clientX - sliderRect.left, 0),
			sliderRect.width
		);

		// Update the views state based on the new position
		const newViews = Math.floor((newLeft / sliderRect.width) * 100000); // Assuming max views = 100,000
		setViews(newViews);
	};

	const handleDragEnd = (e: React.DragEvent<HTMLSpanElement>) => {
		handleDrag(e); // Ensure the final position is set
	};

	const countriesRPM = {
		// Top-Tier Countries (Highest RPM)
		"United States": 5.64,
		Norway: 3.87,
		Australia: 4.22,
		Switzerland: 3.79,
		"United Kingdom": 3.59,

		// Arab Countries (Full List)
		"United Arab Emirates": 1.43,
		"Saudi Arabia": 1.03,
		Qatar: 1.2,
		Kuwait: 1.1,
		Bahrain: 0.95,
		Oman: 0.88,
		Iraq: 0.55,
		Jordan: 0.66,
		Lebanon: 0.55,
		Palestine: 0.44,
		Syria: 0.33,
		Yemen: 0.28,
		Algeria: 0.77,
		Egypt: 0.25,
		Libya: 0.55,
		Morocco: 0.66,
		Tunisia: 0.6,
		Sudan: 0.33,
		Somalia: 0.22,
		Mauritania: 0.28,
		Djibouti: 0.33,
		Comoros: 0.22,

		// Other Notable Countries
		Canada: 3.14,
		Germany: 3.04,
		France: 2.15,
		India: 0.45,
		Japan: 1.61,
		Brazil: 0.63,
	};
	const nicheRPM = {
		"Finance & Investing": 12.25,
		"Make Money Online": 13.52,
		"Digital Marketing": 12.52,
		"Technology & Gadgets": 10.0,
		"Business & Entrepreneurship": 18.0,
		"Health & Fitness": 10.0,
		Education: 9.89,
		"Real Estate": 8.0,
		"Travel & Lifestyle": 9.0,
		Gaming: 1.4,
	};
	return (
		<>
			<Header />
			<main className="flex flex-col items-center justify-center w-full h-screen ">
				<Aside />
				<section className="flex flex-col mt-7 max-w-[750px] h-full ">
					<h1 className="text-4xl text-center font-semibold pt-3 w-full">
						YouTube Money Calculators
					</h1>
					<h4 className="text-2xl pt-12 text-center font-medium w-full">
						How Much YouTube Pays For Views And Subscribers
					</h4>
					<p className="text-[14px] leading-7 text-opacity-70 pt-8 font-bold text-gray-950 w-full">
						Use our free YouTube money calculators to estimate the ad revenue
						from monetized YouTube videos. You can estimate the possible
						earnings by daily video views or by get estimated total earnings for
						any existing video or channel.
					</p>
					<div className="flex items-center justify-center text-opacity-70 pt-11 text-gray-950 font-bold gap-2">
						<span className="font-medium text-xl text-orange-500">
							Claculate by views
						</span>
						|
						<span className="font-medium text-xl text-orange-500">
							By video URL
						</span>
						|
						<span className="font-medium text-xl text-orange-500">
							By channel URL
						</span>
					</div>
					<h2 className="text-3xl text-center font-semibold pt-12 ">
						Projected YouTube revenue by daily views
					</h2>
					<p className="text-[14px] text-center pt-12 leading-7 text-opacity-70 font-bold text-gray-950 w-full">
						This calculator shows the range of how much money YouTube pays per
						number of views. Move the slider below left or right to set the
						number of views. Some popular numbers are 1000, 100,000 and 1
						million views. See{" "}
						<span className=" text-orange-500 text-opacity-70">
							how we calculate the earnings.
						</span>
					</p>
					<PsudueCard color="primary">
						<p>
							Use this calculator to estimate potential earnings and
							strategically plan content around high-RPM niches and regions for
							maximum monetization.
						</p>
					</PsudueCard>
					<PsudueCard color="error">
						<p className="font-extrabold text-black">
							See more monetized countries - log in to your{" "}
							<span className="text-yellow-600">TunePocket Account</span>
						</p>
					</PsudueCard>

					{/* Calculate by Views */}
					<div className="flex flex-col gap-4 w-full bg-[#faf7f7b9] items-center justify-center">
						<label className="mt-20 text-xl font-medium">
							Target Country (
							<span className="text-red-500">where ads are shown</span>)
						</label>
						<select
							name="select a country"
							className="text-lg"
							defaultValue={"--Select a Country--"}
						>
							<option value="--Select a Country--" disabled>
								--Select a Country--
							</option>
							{Object.keys(countriesRPM).map((country) => {
								return (
									<option key={country} value={country}>
										{country}
									</option>
								);
							})}
							;
						</select>

						<label className="mt-20 text-xl font-medium">
							Industry / Niche
						</label>
						<select
							defaultValue={"--Select a Industry / Niche--"}
							className="text-md"
						>
							<option value="--Select a Industry / Niche--" disabled>
								--Select a Industry / Niche--
							</option>
							{Object.keys(nicheRPM).map((niche) => {
								return (
									<option key={niche} value={niche}>
										{niche}
									</option>
								);
							})}
						</select>
						<label className="mt-20 text-lg font-semibold">
							Estimated Daily Views
						</label>
						<input
							type="number"
							className="w-[20%] h-10 rounded-md border-2 border-slate-500 text-center focus:outline-none focus:border-slate-500 focus:ring-slate-500"
							value={views}
							onChange={(e) => {
								const value = parseInt(e.target.value);
								if (!isNaN(value) && value >= 0 && value <= 100000) {
									setViews(value);
								}
							}}
						/>
						<div
							ref={sliderRef}
							className="min-w-[87%] min-h-[20px] relative rounded-md m-3 border-[2px] border-dashed  border-t-fuchsia-950 border-b-red-800"
						>
							<span
								className={` absolute left-0 top-0 bottom-0  min-h-full bg-red-600`}
								style={{ minWidth: `${views / 1000}%` }}
							>
								{" "}
							</span>
							<span
								draggable="true"
								onDrag={handleDrag}
								onDragEnd={handleDragEnd}
								className="absolute  top-[-10px] rounded-sm min-w-10 min-h-9 bg-slate-500 cursor-pointer select-none"
								style={{
									left: `${views / 1000 - 3}%`,
								}}
							>
								{" "}
								<span className="min-w-full min-h-full p-1 m-0 flex items-center justify-center text-slate-300 border-[2px]">
									|
								</span>
							</span>
						</div>
						<label className="mt-20 text-xl font-medium">
							Estimated Daily Earnings
						</label>
						<div>
							$ {24.84} ~ $ {55.2}
						</div>
						<label className="mt-20 text-xl font-medium">
							Estimated Monthly Earnings
						</label>
						<div>
							$ {745.2} ~ $ {1656.0}
						</div>
						<label className="mt-20 text-xl font-medium">
							Estimated Yearly Earnings
						</label>
						<div className="mb-20">
							$ {9066.6} ~ $ {20148.0}
						</div>
					</div>
				</section>
			</main>
		</>
	);
}

export default App;
