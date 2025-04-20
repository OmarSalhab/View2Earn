import "./App.css";
import { useState, useRef, useEffect } from "react";
import Header from "./components/Header";
import PsudueCard from "./components/PsudueCard";
import Aside from "./components/Aside";
import { fetchByVideo, fetchByChannel } from "./utils/apiCall";
import { formatCurrency, formatViews } from "./utils/formatCurrency";
import Rating from "./components/Rating";
import Footer from "./components/Footer";

function App() {
	const [views, setViews] = useState(17000);
	const [country, setCountry] = useState<
		keyof typeof countriesRPM | undefined
	>();
	const [url, setUrl] = useState<{ path: string; valid: boolean }>({
		path: "",
		valid: false,
	});
	const [error, setError] = useState<boolean>(false);
	const [niche, setNiche] = useState<
		keyof typeof nicheMultipliers | undefined
	>();
	const [earnings, setEarnings] = useState<string[][]>([
		["0", "0"],
		["0", "0"],
		["0", "0"],
	]);
	const [videoViews, setVideoViews] = useState({
		viewCount: 0,
		thumbnail: "",
		title: "",
	});
	const [videoEarnings, setVideoEarnings] = useState<string[]>(["0", "0"]);
	const [channelEarningsMoney, setChannelEarningsMoney] = useState<string[]>([
		"0",
		"0",
	]);
	const [channelEarnings, setChannelEarnings] = useState<object>({
		viewCount: 0,
		title: "",
		country: "",
		image: null,
		banner: "",
	});
	const sliderRef = useRef<HTMLDivElement>(null);

	const countriesRPM = {
		// Top-Tier Countries (Highest RPM)
		"United States": [5.0, 8.0], // Finance in U.S. can hit $22 RPM
		Norway: [3.0, 5.0],
		Australia: [3.5, 6.0],
		Switzerland: [3.0, 5.0],
		"United Kingdom": [3.0, 5.0],

		// Arab Countries (Ranges Based on Ad Demand)
		"United Arab Emirates": [1.2, 2.5],
		"Saudi Arabia": [0.8, 1.5],
		Qatar: [1.0, 1.8],
		Kuwait: [0.9, 1.6],
		Bahrain: [0.7, 1.3],
		Oman: [0.6, 1.2],
		Iraq: [0.4, 0.8],
		Jordan: [0.5, 0.9],
		Lebanon: [0.4, 0.8],
		Palestine: [0.3, 0.6],
		Syria: [0.2, 0.5],
		Yemen: [0.1, 0.4],

		// Other Notable Countries
		Canada: [2.5, 4.0],
		Germany: [2.5, 4.0],
		France: [1.5, 3.0],
		India: [0.25, 0.7], // Realistic range (Finance: $0.64–$1.48)
		Japan: [1.0, 2.5],
		Brazil: [0.4, 1.0],
	};
	const countryTiers = {
		top: [
			"United States",
			"Norway",
			"Australia",
			"Switzerland",
			"United Kingdom",
			"Canada",
			"Germany",
			"France",
			"Japan",
		],
		arab: [
			"United Arab Emirates",
			"Saudi Arabia",
			"Jordan",
			"Qatar",
			"Kuwait",
			"Bahrain",
			"Oman",
			"Iraq",
			"Lebanon",
			"Palestine",
			"Syria",
			"Yemen",
			"Egypt",
			"India",
			"Brazil",
		],
	};

	const nicheMultipliers: any = {
		"Finance & Investing": [1.0, 2.75], // Example: 2.75x for top-tier countries
		"Make Money Online": [0.9, 2.5],
		"Digital Marketing": [0.8, 2.0],
		"Technology & Gadgets": [0.7, 1.8],
		"Business & Entrepreneurship": [1.2, 3.0],
		"Health & Fitness": [0.6, 1.5],
		Education: [0.5, 1.3],
		Entertainment: [0.4, 1.0],
		"Real Estate": [0.7, 1.9],
		"Travel & Lifestyle": [0.5, 1.7],
		Gaming: [0.3, 0.8],
	};
	useEffect(() => {
		if (country && niche) {
			// Calculate MIN and MAX RPM based on country tier and niche
			const [countryMin, countryMax] = countriesRPM[country];
			const [nicheMinMultiplier, nicheMaxMultiplier] = nicheMultipliers[niche];

			// Adjust multipliers based on country tier
			let tierAdjustment = 1.0;
			if (countryTiers.top.includes(country)) {
				tierAdjustment = 1.0; // Full multiplier for top-tier
			} else if (countryTiers.arab.includes(country)) {
				tierAdjustment = 0.7; // Arab countries at 70% of the multiplier
			} else {
				tierAdjustment = 0.5; // Other countries at 50%
			}

			const adjustedNicheMin = nicheMinMultiplier * tierAdjustment;
			const adjustedNicheMax = nicheMaxMultiplier * tierAdjustment;

			// Calculate final RPM range
			const dailyMinRPM = countryMin * adjustedNicheMin;
			const dailyMaxRPM = countryMax * adjustedNicheMax;

			// Earnings for 100K views with platform fees
			const dailyMinEarnings = (((dailyMinRPM * views) / 1000) * 0.7).toFixed(
				2
			); // 30% fee
			const dailyMaxEarnings = (((dailyMaxRPM * views) / 1000) * 0.7).toFixed(
				2
			);

			const dailyEarning = [dailyMinEarnings, dailyMaxEarnings];

			// Monthly/Yearly projections
			const monthlyEarning = [
				(parseFloat(dailyMinEarnings) * 30).toFixed(1),
				(parseFloat(dailyMaxEarnings) * 30).toFixed(1),
			];
			const yearlyEarning = [
				Math.round(parseFloat(dailyMinEarnings) * 365).toString(),
				Math.round(parseFloat(dailyMaxEarnings) * 365).toString(),
			];
			setEarnings([dailyEarning, monthlyEarning, yearlyEarning]);
		}
	}, [views, country, niche]);

	useEffect(() => {
		if (country && niche) {
			const [countryMin, countryMax] = countriesRPM[country];
			const [nicheMinMultiplier, nicheMaxMultiplier] = nicheMultipliers[niche];

			// Adjust multipliers based on country tier
			let tierAdjustment = 1.0;
			if (countryTiers.top.includes(country)) {
				tierAdjustment = 1.0; // Full multiplier for top-tier
			} else if (countryTiers.arab.includes(country)) {
				tierAdjustment = 0.7; // Arab countries at 70% of the multiplier
			} else {
				tierAdjustment = 0.5; // Other countries at 50%
			}

			const adjustedNicheMin = nicheMinMultiplier * tierAdjustment;
			const adjustedNicheMax = nicheMaxMultiplier * tierAdjustment;

			// Calculate final RPM range
			const dailyMinRPM = countryMin * adjustedNicheMin;
			const dailyMaxRPM = countryMax * adjustedNicheMax;

			// Earnings for 100K views with platform fees
			const dailyMinEarnings = (
				((dailyMinRPM * videoViews.viewCount) / 1000) *
				0.7
			).toFixed(2); // 30% fee
			const dailyMaxEarnings = (
				((dailyMaxRPM * videoViews.viewCount) / 1000) *
				0.7
			).toFixed(2);

			const dailyEarning = [dailyMinEarnings, dailyMaxEarnings];

			setVideoEarnings(dailyEarning);
		}
	}, [videoViews, country, niche]);

	useEffect(() => {
		if (country && niche) {
			const [countryMin, countryMax] = countriesRPM[country];
			const [nicheMinMultiplier, nicheMaxMultiplier] = nicheMultipliers[niche];

			// Adjust multipliers based on country tier
			let tierAdjustment = 1.0;
			if (countryTiers.top.includes(country)) {
				tierAdjustment = 1.0; // Full multiplier for top-tier
			} else if (countryTiers.arab.includes(country)) {
				tierAdjustment = 0.7; // Arab countries at 70% of the multiplier
			} else {
				tierAdjustment = 0.5; // Other countries at 50%
			}

			const adjustedNicheMin = nicheMinMultiplier * tierAdjustment;
			const adjustedNicheMax = nicheMaxMultiplier * tierAdjustment;

			// Calculate final RPM range
			const totalMinRPM = countryMin * adjustedNicheMin;
			const totalMaxRPM = countryMax * adjustedNicheMax;

			// Earnings for 100K views with platform fees
			const totalMinEarnings = (
				((totalMinRPM * channelEarnings.viewCount) / 1000) *
				0.7
			).toFixed(2); // 30% fee
			const totalMaxEarnings = (
				((totalMaxRPM * channelEarnings.viewCount) / 1000) *
				0.7
			).toFixed(2);

			const totalEarnings = [totalMinEarnings, totalMaxEarnings];

			setChannelEarningsMoney(totalEarnings);
		}
	}, [channelEarnings, country, niche]);

	const handleCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (e.target.value !== "--Select a Country--") setCountry(e.target.value);
	};

	const handleNiche = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (e.target.value !== "--Select a Industry / Niche--")
			setNiche(e.target.value);
	};

	const handleDrag = (e: React.DragEvent<HTMLSpanElement>) => {
		if (!sliderRef.current) return;

		// Get the bounding rectangle of the slider container
		const sliderRect = sliderRef.current.getBoundingClientRect();

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

	const validateUrl = () => {
		//https://www.youtube.com/watch?v=5nd4LB2MKU4
		const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/watch\?v=/;
		if (regex.test(url.path)) {
			setError(false);
			setUrl({ ...url, valid: true });
			return true;
		} else {
			setError(true);
			setUrl({ ...url, valid: false });
			return false;
		}
	};
	const handleUrl = (e: any) => {
		setUrl({ ...url, path: e.target.value });
	};

	const handleVideoSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (validateUrl()) {
			try {
				const getVideoViews = async () => {
					const res = await fetchByVideo(url.path);

					if (res) {
						setVideoViews(res);
					}
				};
				getVideoViews();
			} catch (err) {
				console.error("Error fetching video data:", err);
			}
		}
	};

	const handleChannelSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const channelData = await fetchByChannel(url.path);
			console.log(channelData);

			if (channelData) {
				setChannelEarnings(channelData);
			}
		} catch (err) {
			console.error("Error fetching channel data:", err);
			return [];
		}
	};
	return (
		<>
			<Header />
			<main className="flex flex-col verflow-auto items-center justify-center w-full h-full p-1">
				<Aside />
				<section className="flex flex-col mt-7 max-w-[750px] h-full  ">
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
						<span
							onClick={() => {
								document
									.getElementById("calc-views")
									?.scrollIntoView({ behavior: "smooth" });
							}}
							className="font-medium sm:text-xl text-orange-500 hover:text-black cursor-pointer"
						>
							Claculate by views
						</span>
						|
						<span
							onClick={() => {
								document
									.getElementById("calc-video")
									?.scrollIntoView({ behavior: "smooth" });
							}}
							className="font-medium sm:text-xl text-orange-500 hover:text-black cursor-pointer"
						>
							By video URL
						</span>
						|
						<span
							onClick={() => {
								document
									.getElementById("calc-channel")
									?.scrollIntoView({ behavior: "smooth" });
							}}
							className="font-medium sm:text-xl text-orange-500 hover:text-black cursor-pointer"
						>
							By channel URL
						</span>
					</div>

					{/* VIEWS CALCULATER */}
					<h2 className="text-3xl text-center font-semibold pt-12 ">
						Projected YouTube revenue by daily views
					</h2>
					<p className="text-[14px]  text-center pt-12 leading-7 text-opacity-70 font-bold text-gray-950 w-full">
						This calculator shows the range of how much money YouTube pays per
						number of views. Move the slider below left or right to set the
						number of views. Some popular numbers are 1000, 10,000 and 1 hunderd
						thousend views. See{" "}
						<span
							onClick={() => {
								document
									.getElementById("how-calc-work")
									?.scrollIntoView({ behavior: "smooth" });
							}}
							className="sm:text-[15px] text-orange-500 hover:text-black cursor-pointer"
						>
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
							<span className="text-orange-500">TunePocket Account</span>
						</p>
					</PsudueCard>

					{/* Calculate by Views */}
					<div
						id="calc-views"
						className="flex flex-col gap-4 w-full bg-[#faf7f7b9] items-center justify-center"
					>
						<label className="mt-20 text-xl font-medium">
							Target Country (
							<span className="text-red-500 font-semibold">
								where ads are shown
							</span>
							)
						</label>
						<select
							onChange={handleCountry}
							name="select a country"
							className="text-lg border border-black"
							defaultValue={"--Select a Country--"}
						>
							<option value="--Select a Country--" disabled>
								--Select a Country--
							</option>
							{Object.values(countryTiers)
								.flat() // Flatten the arrays into a single array
								.map((country) => (
									<option key={country} value={country}>
										{country}
									</option>
								))}
							;
						</select>

						<label className="mt-20 text-xl font-medium">
							Industry / Niche
						</label>
						<select
							onClick={handleNiche}
							defaultValue={"--Select a Industry / Niche--"}
							className="text-md border-black border"
						>
							<option value="--Select a Industry / Niche--" disabled>
								--Select a Industry / Niche--
							</option>
							{Object.keys(nicheMultipliers).map((niche) => {
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
							disabled={country && niche ? false : true}
							type="number"
							className={`${
								country && niche
									? "border-t-fuchsia-950 border-b-red-800"
									: "border-zinc-300 text-zinc-300"
							} w-[20%] h-10 rounded-md border-2  text-center focus:outline-none `}
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
							className={`${
								country && niche
									? "border-t-fuchsia-950 border-b-red-800"
									: "border-zinc-300"
							} min-w-[87%]  min-h-[20px] relative rounded-md m-3 border-[2px] border-dashed `}
						>
							<span
								className={`${
									country && niche ? "bg-red-600" : "bg-zinc-300"
								} absolute left-0 top-0 bottom-0  min-h-full `}
								style={{ minWidth: `${views / 1000}%` }}
							>
								{" "}
							</span>
							<span
								draggable={country && niche ? "true" : "false"}
								onDrag={handleDrag}
								onDragEnd={handleDragEnd}
								className={`${
									country && niche
										? "bg-slate-500"
										: "bg-zinc-300 cursor-default"
								} absolute top-[-10px] rounded-sm min-w-10 min-h-9 bg-slate-500 cursor-pointer select-none`}
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
						<div className="text-center sm:text-3xl font-bold text-orange-500">
							{formatCurrency(earnings[0][0])} ~{" "}
							{formatCurrency(earnings[0][1])}
						</div>
						<label className="mt-20 text-xl font-medium ">
							Estimated Monthly Earnings
						</label>
						<div className="text-center sm:text-3xl font-bold text-orange-500">
							{formatCurrency(earnings[1][0])} ~{" "}
							{formatCurrency(earnings[1][1])}
						</div>
						<label className="mt-20 text-xl font-medium">
							Estimated Yearly Earnings
						</label>
						<div className="mb-20 text-center sm:text-3xl font-bold text-orange-500">
							{formatCurrency(earnings[2][0])} ~{" "}
							{formatCurrency(earnings[2][1])}
						</div>
					</div>
				</section>
				{/* ************************************** VIEWS CALCULATER ************************************** */}
				<img
					src="https://www.tunepocket.com/wp-main/uploads/Make-money-on-YouTube-nursery-rhymes-videos.jpg"
					className="mt-8 md:max-w-[750px] h-full"
				/>
				{/* VIDEOID CALCULATER */}
				<section
					id="calc-video"
					className="flex flex-col mt-7 max-w-[750px] h-full"
				>
					<h2 className="text-3xl text-center font-semibold pt-12 ">
						Estimate YouTube revenue of existing video
					</h2>
					<p className="text-[14px] text-center pt-12 leading-7 text-opacity-70 font-bold text-gray-950 w-full">
						This calculator estimates the total money earned by a specific
						YouTube video. Enter a valid video URL to estimate how much that
						video earned (or could have earned) from YouTube monetization.
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
							See more monetized countries - log in to your
							<span className="text-orange-500">TunePocket Account</span>
						</p>
					</PsudueCard>
					<div className="flex flex-col gap-4 w-full bg-[#faf7f7b9] items-center justify-center mb-20">
						<label className="mt-20 text-xl font-medium">
							Target Country (
							<span className="text-red-500 font-semibold">
								where ads are shown
							</span>
							)
						</label>
						<select
							onChange={handleCountry}
							name="select a country"
							className="text-lg border border-black"
							defaultValue={"--Select a Country--"}
						>
							<option value="--Select a Country--" disabled>
								--Select a Country--
							</option>
							{Object.values(countryTiers)
								.flat() // Flatten the arrays into a single array
								.map((country) => (
									<option key={country} value={country}>
										{country}
									</option>
								))}
							;
						</select>

						<label className="mt-20 text-xl font-medium">
							Industry / Niche
						</label>
						<select
							onClick={handleNiche}
							defaultValue={"--Select a Industry / Niche--"}
							className="text-md border-black border"
						>
							<option value="--Select a Industry / Niche--" disabled>
								--Select a Industry / Niche--
							</option>
							{Object.keys(nicheMultipliers).map((niche) => {
								return (
									<option key={niche} value={niche}>
										{niche}
									</option>
								);
							})}
						</select>
						<label className="mt-20 text-lg font-semibold">
							Enter YouTube Video URL
						</label>
						<div className="flex w-full justify-center ">
							<input
								disabled={country && niche ? false : true}
								type="text"
								className={`${
									country && niche
										? "border-t-fuchsia-950 border-b-red-800"
										: "border-zinc-300 text-zinc-300"
								} ${
									error &&
									url.path &&
									"border-b-red-500 border-t-red-500 border-l-red-500 border-r-red-500 border-[3px] delay-200 scale-105 transition-all"
								} w-[70%] h-8  border-2 text-left p-2 focus:outline-none `}
								placeholder="eg., https://www.youtube.com/watch?v=sETzYOUjGzQ"
								onChange={handleUrl}
							/>
							<button
								onClick={handleVideoSubmit}
								disabled={country && niche ? false : true}
								className="h-8  border-2  text-center focus:outline-none bg-zinc-300 w-24"
							>
								search
							</button>
						</div>
						{(videoViews.thumbnail || videoViews.title) && (
							<>
								<img
									src={videoViews?.thumbnail}
									alt="Video Thumbnail"
									className="w-[85%] h-56 mt-5 rounded-md"
								/>
								<label className="mt-5 text-xl font-semibold text-center">
									{videoViews?.title}
								</label>
							</>
						)}
						<label className="mt-20 text-lg font-semibold">
							Number of Total Video Views
						</label>
						<div className="text-center text-3xl font-bold text-red-500">
							{formatViews(videoViews?.viewCount)}
						</div>
						<div className="relative w-full mt-16 flex justify-center items-center mb-8">
							<label className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#faf7f7] sm:px-16 flex justify-center min-w-[75%] sm:text-xl font-semibold">
								Estimated Total Earnings
							</label>
							<div className="text-center sm:text-3xl font-bold text-orange-500 border-2 border-red-500  rounded-md border-dashed flex justify-center items-center h-48 w-[90%]">
								{formatCurrency(videoEarnings[0])} ~{" "}
								{formatCurrency(videoEarnings[1])}
							</div>
						</div>
					</div>
				</section>
				{/* ************************************** VIDEOID CALCULATER ************************************** */}
				<img
					src="public\Images\make-money-on-youtube.webp"
					className="-mt-8 md:max-w-[750px] h-full"
				/>

				{/* CHANNEL CALCULATER */}
				<section
					id="calc-channel"
					className="flex flex-col mt-7 max-w-[750px] h-full"
				>
					<h2 className="text-3xl text-center font-semibold pt-12">
						Estimate YouTube Revenue for a Channel
					</h2>
					<p className="text-[14px] text-center pt-12 leading-7 text-opacity-70 font-bold text-gray-950 w-full">
						This calculator estimates the total money earned by a specific
						YouTube channel. Enter a valid channel URL to estimate how much that
						channel earned (or could have earned) from YouTube monetization.
					</p>
					<PsudueCard color="primary">
						<p>
							Use this calculator for an overall channel assessment that not
							only helps with your long term monetization planning but also
							helps you analyze the competition.
						</p>
					</PsudueCard>
					<PsudueCard color="error">
						<p className="font-extrabold text-black">
							See more monetized countries - log in to your{" "}
							<span className="text-orange-500">TunePocket Account</span>
						</p>
					</PsudueCard>
					<div className="flex flex-col gap-4 w-full bg-[#faf7f7b9] items-center justify-center mb-10 pb-10">
						<label className="mt-20 text-xl font-medium">
							Target Country (
							<span className="text-red-500 font-semibold">
								where ads are shown
							</span>
							)
						</label>
						<select
							onChange={handleCountry}
							name="select a country"
							className="text-lg border border-black"
							defaultValue={"--Select a Country--"}
						>
							<option value="--Select a Country--" disabled>
								--Select a Country--
							</option>
							{Object.values(countryTiers)
								.flat() // Flatten the arrays into a single array
								.map((country) => (
									<option key={country} value={country}>
										{country}
									</option>
								))}
						</select>

						<label className="mt-20 text-xl font-medium">
							Industry / Niche
						</label>
						<select
							onClick={handleNiche}
							defaultValue={"--Select a Industry / Niche--"}
							className="text-md border-black border"
						>
							<option value="--Select a Industry / Niche--" disabled>
								--Select a Industry / Niche--
							</option>
							{Object.keys(nicheMultipliers).map((niche) => (
								<option key={niche} value={niche}>
									{niche}
								</option>
							))}
						</select>
						<label className="mt-20 text-lg font-semibold">
							Enter YouTube Channel URL
						</label>
						<div className="flex w-full justify-center">
							<input
								disabled={country && niche ? false : true}
								type="text"
								className={`${
									country && niche
										? "border-t-fuchsia-950 border-b-red-800"
										: "border-zinc-300 text-zinc-300"
								} ${
									error &&
									url.path &&
									"border-b-red-500 border-t-red-500 border-l-red-500 border-r-red-500 border-[3px] delay-200 scale-105 transition-all"
								} w-[70%] h-8 border-2 text-left p-2 focus:outline-none`}
								placeholder="eg., https://www.youtube.com/@username"
								onChange={handleUrl}
							/>
							<button
								onClick={handleChannelSubmit}
								disabled={country && niche ? false : true}
								className="h-8 border-2 text-center focus:outline-none bg-zinc-300 w-24"
							>
								search
							</button>
						</div>
						{(channelEarnings.banner ||
							channelEarnings.image ||
							channelEarnings.title) && (
							<>
								<div className="relative w-[85%] h-48 mt-10">
									<img
										src={channelEarnings?.banner}
										alt="Channel Banner"
										className="w-full h-full object-cover rounded-md"
									/>

									<img
										src={channelEarnings?.image}
										alt="Channel Profile"
										className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-4 border-[#b43c2c] shadow-lg"
									/>
								</div>
								<label className="mt-5 text-2xl font-semibold text-center">
									{channelEarnings?.title}
								</label>
							</>
						)}

						<label className="mt-20 text-lg font-semibold">
							Number of Total Channel Views
						</label>
						<div className="text-center text-3xl font-bold text-red-500">
							{formatViews(channelEarnings?.viewCount)}
						</div>
						<div className="relative w-full mt-16 flex justify-center items-center">
							<label className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#faf7f7] sm:px-16 flex justify-center min-w-[75%] sm:text-xl font-semibold">
								Estimated Total Earnings
							</label>
							<div className="text-center sm:text-3xl font-bold text-orange-500 border-2 border-red-500  rounded-md border-dashed flex justify-center items-center h-48 w-[90%]">
								{formatCurrency(channelEarningsMoney[0])} ~{" "}
								{formatCurrency(channelEarningsMoney[1])}
							</div>
						</div>
					</div>
					<div className="text-md mb-12">
						<h6 className=" pb-6 font-bold text-lg leading-4">
							Why Can’t I See Stats for Some Channels?
						</h6>
						<p className="opacity-60 font-semibold text-[15px] leading-[27px]">
							Some YouTube channels restrict access to their public statistics.
							If our service can’t fetch data for a channel, here’s why:
						</p>
						<ul className="list-disc pl-5 opacity-60 font-semibold text-[15px] leading-[27px]">
							<li>The channel has set their stats to "private".</li>
							<li>
								YouTube allows creators to hide their subscriber counts, view
								counts, or other details.
							</li>
							<li>
								Example: If you see{" "}
								<span className="font-bold">"hiddenSubscriberCount: true"</span>{" "}
								in our results, the creator has chosen privacy.
							</li>
							<li>The channel doesn’t exist or was deleted.</li>
							<li>
								If you typed <span className="font-bold">@username</span> and
								got no results, the handle might be misspelled or inactive.
							</li>
							<li>YouTube’s API limits real-time updates.</li>
							<li>
								Subscriber/video counts may lag behind by a few hours (we don’t
								control this).
							</li>
						</ul>
						<h6 className="pt-6 pb-6 font-bold text-lg leading-4">
							What You Can Do
						</h6>
						<ul className="list-disc pl-5 opacity-60 font-semibold text-[15px] leading-[27px]">
							<li>
								✔ Double-check the channel’s URL (try visiting it directly).
							</li>
							<li>✔ Use the channel ID (more reliable than usernames).</li>
							<li>✔ Contact us if you think it’s a technical issue!</li>
						</ul>
						<p className="opacity-60 font-semibold text-[15px] leading-[27px] mt-5">
							<span className="font-bold">Note:</span> We respect creators’
							privacy settings and can’t bypass YouTube’s restrictions.
						</p>
					</div>
				</section>
				{/* ************************************** CHANNEL CALCULATER ************************************** */}
				<section className="flex flex-col max-w-[750px] h-full">
					<h4 className="text-3xl font-semibold">
						How to use YouTube money calculators
					</h4>
					<div className="text-md mt-14">
						<p className="opacity-60 font-semibold leading-[50px] text-[15px]">
							Trying to decide whether you should monetize your channel?
							<br />
							Curious to know how much money popular YouTubers earn on YouTube?
							<br />
							Use our free YouTube revenue calculators to estimate (
							<span className="text-orange-700">*</span>) how much YouTube pays.
						</p>
						<h6 className="pt-6 pb-3 font-bold text-md leading-4">
							Projected Revenue By Daily Views Calculator
							<br />
						</h6>
						<p className="opacity-60 font-semibold text-[15px]">
							Use this to estimate total earnings based on how many videos
							you've uploaded. It's great for content planning, helping you
							understand how volume affects potential revenue.
							<br />
						</p>
						<h6 className="pt-6 pb-3 font-bold text-md leading-4">
							Estimated Revenue Of A Video Calculator
							<br />
						</h6>
						<p className="opacity-60 font-semibold text-[15px]">
							Perfect for analyzing a single video's performance. Paste a link
							to get an earnings estimate based on that video's actual views,
							niche, and audience location.
							<br />
						</p>
						<h6 className="pt-6 pb-3 font-bold text-md leading-4">
							Estimated Revenue For A Channel Calculator
							<br />
						</h6>
						<p className="opacity-60 font-semibold text-[15px]">
							Ideal for getting a full-picture revenue estimate for any channel.
							Just drop in the channel link to see how much it's likely earning
							overall, which is useful for benchmarking or competitive research.
							<br /> <br />
							Related:{" "}
							<span className="text-orange-600 text-[17px] hover:text-black cursor-pointer">
								<a href="https://support.google.com/youtube/answer/7438625?hl=en#:~:text=Ads%20are%20served%20through%20the,the%20content%20is%20advertiser%2Dfriendly.">
									How YouTube ads work
								</a>
							</span>
							<br />
							<br />
							Learn more about making{" "}
							<span className="text-orange-600 cursor-pointer hover:text-black ">
								money on YouTube
							</span>
							.<br />
							<br />
						</p>
					</div>
				</section>

				<section
					id="how-calc-work"
					className="flex flex-col max-w-[750px] h-full"
				>
					<h4 className="text-3xl font-semibold">
						How we calculate the earnings
					</h4>
					<div className="text-md mt-14">
						<p className="opacity-60 font-semibold text-[15px] leading-[27px]">
							The YouTube earnings calculators estimate the potential income
							from monetizing YouTube videos and channels by using a metric
							called RPM (Revenue Per Mille), which stands for revenue per 1,000
							views.
							<br />
						</p>
						<PsudueCard color="primary">
							<p className="text-left">
								RPM includes both ad impressions and other monetized
								interactions (e.g., memberships, Super Chats, etc.)
							</p>
						</PsudueCard>
						<p className="opacity-60 font-semibold text-[15px] pt-5 leading-[27px]">
							💰 RPM is one of the most realistic metrics for estimating your
							actual YouTube earnings, because it reflects your net revenue
							after YouTube's cut is taken out (currently 45%).
							<br />
						</p>
						<h6 className="pt-10 pb-5 font-bold  text-2xl">How RPM Works</h6>
						<p className="opacity-60 font-semibold text-[15px] leading-[50px]">
							Your RPM is influenced by a combination of factors:
							<br />
							– Your niche (e.g., finance, gaming, cooking).
							<br />
							– Your audience's location (e.g., U.S., India, Brazil).
							<br />
							– Your content quality and advertiser-friendliness.
							<br />– Your monetization tier, which is shaped by the size of
							your audience and their engagement.
						</p>
						<h6 className="pt-10 pb-5 font-bold  text-2xl">
							Realistic RPM Ranges (based on this year's data)
						</h6>
						<p className="opacity-60 font-semibold text-[15px] leading-[50px]">
							With the latest region and niche specific RPM data, RPMs can vary
							widely:
							<br />
							Finance/business content in high-tier countries (like the U.S. or
							Germany) can see RPMs between $10 to $22+.
							<br />
							General entertainment or gaming content in mid-tier countries
							might average around $0.50 to $4.00.
							<br />
							Low-tier or newly monetized regions may see RPMs below $1.00.
							<br />
						</p>
						<PsudueCard color="primary">
							<p className="text-left ">
								Advertiser-friendly videos (videos without profanity, violence,
								or sexually suggestive content) tend to attract more bids and
								higher-paying advertisers, resulting in better RPM rates.
							</p>
						</PsudueCard>
						<p className="opacity-60 font-semibold text-[15px] leading-[27px] mt-6">
							Keep that in mind when researching your niche!
							<br />
							<br /> ✅ Tip: When researching niches or planning content,
							consider both the advertiser demand and the audience’s location,
							since both significantly impact your earnings potential.
							<br />
						</p>
						<p className="opacity-60 font-semibold text-[15px] leading-[50px]">
							Related:{" "}
							<span className="text-orange-600 text-[17px] hover:text-black cursor-pointer">
								<a href="https://sellfy.com/blog/best-youtube-content-types/">
									What types of videos make most money on YouTube
								</a>
							</span>
						</p>
						<p className="opacity-60 font-semibold text-[15px] leading-[50px]">
							Fine tune your monetization strategy with our free{" "}
							<span className="text-orange-600 text-[17px] hover:text-black cursor-pointer">
								YouTube money calculator
							</span>
							.
						</p>
						<h6 className="pt-10 pb-5 font-bold  text-2xl">
							Target Country Explained
						</h6>
						<p className="opacity-60 font-semibold text-[15px] mt-6 leading-[27px]">
							The "Country" dropdown represents the geographic location of your
							audience where ads are shown.
							<br />
							<br /> Since advertisers target specific regions based on factors
							like purchasing power and market demand, the CPM and RPM values
							differ from one country to another.
							<br />
							<br /> By selecting a country, you can see the estimated ad
							revenue metrics for that specific market, which helps tailor your
							content strategy to the audience you primarily serve.
						</p>
					</div>
				</section>

				<img
					src="public\Images\reflective-youtube-logo-money.avif"
					className="mt-10 md:max-w-[750px] h-full"
				/>
				<section className="flex flex-col max-w-[750px] h-full">
					<h6 className="pt-10 pb-5 font-bold  text-3xl">Disclaimer</h6>
					<PsudueCard color="primary">
						<p className="text-left">
							Important Notice: These are the ESTIMATED YouTube monetization
							earnings.
						</p>
					</PsudueCard>{" "}
					<p className="opacity-60 font-semibold text-[15px] leading-[27px] mt-5">
						RPM data used in this calculator was compiled from publicly
						available sources and industry estimates. It is intended for
						informational purposes only and does not guarantee earnings, as
						actual revenue can vary widely and cannot be determined with
						absolute accuracy.
						<br />
						<br /> TunePocket makes no warranties or guarantees as to how much
						you can earn on YouTube and disclaims any liability related to using
						these calculators. By using our free calculators you explicitly
						agree to these terms.
					</p>
					<h6 className="pt-5 pb-2.5 font-bold  text-md">
						What factors may affect your actual YouTube earnings?
					</h6>
					<p className="opacity-60 font-semibold text-[15px] leading-[27px] mt-5">
						There are many factor that may directly or indirectly affect how
						much you can actually earn by monetizing your channel.
						<br />
						<br /> The number of views and the size of your following is the
						biggest factor. The more people watch your videos (and the ads
						included with your videos), the higher is your earning potential.
						<br />
						<br /> Your niche is another big factor. Brand friendly videos (as
						opposed to controversial or provocative), tend to appeal to more
						advertisers, hence fetching higher ad bids.
						<br />
						<br /> Note that certain topics are not eligible for advertisement
						at all. See{" "}
						<span className="text-orange-600 text-[17px] hover:text-black cursor-pointer">
							<a href="https://support.google.com/adsense/answer/48182">
								AdSense policy
							</a>
						</span>{" "}
						for more information on what videos are allowed into YouTube
						partnership program.
						<br />
						<br /> Some other factors that may affect the actual payout include
						the age and the location of your audience, the actual click through
						rate, ad blockers, the percentage of invalid ad clicks, and so on.
					</p>
				</section>
				<section className="max-w-[750px] w-full h-full mb-12">
					<Rating />
				</section>
			</main>
			<Footer />
		</>
	);
}

export default App;
