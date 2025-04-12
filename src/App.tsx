import "./App.css";
import Header from "./components/Header";
import PsudueCard from "./components/PsudueCard";
import Aside from "./components/Aside";
import { useState, useRef, useEffect } from "react";

const formmater = (number: number): string => {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});
	return formatter.format(number);
};
const getVideoId = (url: string): string | undefined => {
	const videoId =url.split(/[?&]/).find((param) => param.startsWith("v="))?.split("=")[1];
	

	return videoId?.trim()
}

const fetchByVideo = async (url: any)=>{

	try{
		const videoId = getVideoId(url);
		if(!videoId) return;
		 const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?key=AIzaSyAuhRNtRvOY75Fb26QMttOt1lfUNlOER5k&part=statistics&id=${videoId}`,{
		 	method:"GET",
			headers:{
				"Content-Type":"application/json",
				"Accept":"application/json",
			}
		}).then((res)=>res.json())
		return res.items[0].statistics.viewCount
	}catch(err){
		console.error("Error fetching URL views:", err);
	}
}
function App() {
	const [views, setViews] = useState(17000);
	const [country, setCountry] = useState<
		keyof typeof countriesRPM | undefined
	>();
	const [url, setUrl] = useState<string>("");
	const [fetchUrl, setFetchUrl] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);
	const [niche, setNiche] = useState<keyof typeof nicheRPM | undefined>();
	const [earnings, setEarnings] = useState<number[][]>([
		[0, 0],
		[0, 0],
		[0, 0],
	]);
	const [urlViews, setUrlViews] = useState<number>(0);
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

	const nicheRPM = {
		"Finance & Investing": [5.0, 12.25], // Realistic range for high-value niches
		"Make Money Online": [4.5, 13.52], // Slightly lower min (avoid overestimation)
		"Digital Marketing": [4.0, 12.52], // Competitive but not always 12.52x
		"Technology & Gadgets": [3.5, 10.0], // Broad niche, lower min
		"Business & Entrepreneurship": [6.0, 18.0], // High max for premium content
		"Health & Fitness": [2.5, 10.0], // Wide variability (supplements vs. general)
		Education: [2.0, 9.89], // Free tutorials vs. paid courses
		"Real Estate": [3.0, 8.0], // Local markets vary
		"Travel & Lifestyle": [1.5, 9.0], // Luxury travel vs. budget guides
		Gaming: [0.5, 1.4], // Low RPM unless sponsored
	};
	useEffect(() => {
		if (country && niche) {
			// Calculate MIN and MAX possible earnings:
			const dailyMinRPM = countriesRPM[country][0] * nicheRPM[niche][0]; // 0.25 * 5.0 = 1.25
			const dailyMaxRPM = countriesRPM[country][1] * nicheRPM[niche][1]; // 0.7 * 12.25 = 8.575

			// Earnings for 100K views:
			const dailyMinEarnings = (((dailyMinRPM * views) / 1000) * 1.3).toFixed(
				2
			); // (1.25 * 100000)/1000 = $125
			const dailyMaxEarnings = (((dailyMaxRPM * views) / 1000) * 0.6).toFixed(
				2
			);

			const dailyEarning = [dailyMinEarnings, dailyMaxEarnings];
			const monthlyEarning = [
				(dailyMinEarnings * 30).toFixed(1),
				(dailyMaxEarnings * 30).toFixed(1),
			];
			const yearlyEarning = [
				Math.round(dailyMinEarnings * 365),
				Math.round(dailyMaxEarnings * 365),
			];
			setEarnings([dailyEarning, monthlyEarning, yearlyEarning]);
		}
	}, [views, country, niche]);

	useEffect(()=>{
		try{
			const getVideo = async ()=>{
				const res = await fetchByVideo(url);
				
				if(res){
					setUrlViews(res);
				}
			}
			getVideo();
		}
		catch(err){
			console.error("Error fetching video data:", err);
		}
		return ()=>{
			setUrlViews(0);
		}
	},[fetchUrl])
	const handleCountry = (e: any) => {
		if (e.target.value !== "--Select a Country--") setCountry(e.target.value);
	};

	const handleNiche = (e: any) => {
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
		const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
		if (regex.test(url)) {
			setError(false);
		} else {
			setError(true);
		}
	};
	const handleUrl = (e: any) => {
		setUrl(e.target.value);
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		validateUrl();
		setFetchUrl(!fetchUrl);
	};
	return (
		<>
			<Header />
			<main className="flex flex-col verflow-auto items-center justify-center w-full h-full ">
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
					<p className="text-[14px]  text-center pt-12 leading-7 text-opacity-70 font-bold text-gray-950 w-full">
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
							<span className="text-orange-500">TunePocket Account</span>
						</p>
					</PsudueCard>

					{/* Calculate by Views */}
					<div className="flex flex-col gap-4 w-full bg-[#faf7f7b9] items-center justify-center">
						<label className="mt-20 text-xl font-medium">
							Target Country (
							<span className="text-red-500">where ads are shown</span>)
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
							onClick={handleNiche}
							defaultValue={"--Select a Industry / Niche--"}
							className="text-md border-black border"
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
						<div className="text-center text-3xl font-bold text-orange-500">
							{formmater(earnings[0][0])} ~ {formmater(earnings[0][1])}
						</div>
						<label className="mt-20 text-xl font-medium ">
							Estimated Monthly Earnings
						</label>
						<div className="text-center text-3xl font-bold text-orange-500">
							{formmater(earnings[1][0])} ~ {formmater(earnings[1][1])}
						</div>
						<label className="mt-20 text-xl font-medium">
							Estimated Yearly Earnings
						</label>
						<div className="mb-20 text-center text-3xl font-bold text-orange-500">
							{formmater(earnings[2][0])} ~ {formmater(earnings[2][1])}
						</div>
					</div>
				</section>
				<section className="flex flex-col mt-7 max-w-[750px] h-full">
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
							<span className="text-red-500">where ads are shown</span>)
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
							onClick={handleNiche}
							defaultValue={"--Select a Industry / Niche--"}
							className="text-md border-black border"
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
									"border-b-red-600 border-t-red-600 border-l-red-600 border-r-red-600 border-3"
								} w-[70%] h-8  border-2  text-left p-2 focus:outline-none `}
								placeholder="eg., https://www.youtube.com/watch?v=sETzYOUjGzQ"
								onChange={handleUrl}
							/>
							<button
								onClick={handleSubmit}
								disabled={country && niche ? false : true}
								className="h-8  border-2  text-center focus:outline-none bg-zinc-300 w-24"
							>
								search
							</button>
						</div>
						<label className="mt-20 text-lg font-semibold">Number of Total Video Views</label>
						<div className="text-center text-3xl font-bold text-red-500">{formmater(urlViews)}</div>
					</div>
				</section>
			</main>
		</>
	);
}

export default App;
