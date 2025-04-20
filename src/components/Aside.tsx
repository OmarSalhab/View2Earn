const Aside = () => {
	return (
		<>
			{/* big screen */}
			<aside className=" fixed right-2 lg:flex top-48 hidden flex-col gap-2 w-[73px] h-[300px] z-10">
				<button className="w-full rounded-lg  h-[25%] hover:bg-slate-700">
					<a href="#">
						<div className="rounded-lg ">
							<img
								className="rounded-lg w-full h-full"
								src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Facebook_logo_%28square%29.png/600px-Facebook_logo_%28square%29.png"
								alt="Facebook Icon"
							/>
						</div>
					</a>
				</button>
				<button className="w-full rounded-lg  h-[25%] hover:bg-slate-700">
					<a href="https://www.linkedin.com/authwall?trkInfo=AQFXHQZGUSHKjgAAAZY_4EMAKexn9j3HHEDYOPCDP0NGU65wgFkkGegR1UADzNcsDfXspLSR_HfjoA9bBpp-xFTOgc8m3FHB2JzlpI8zGp1yBjExnaeJfA6K5H39vYFkRGpjhIY=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fomar-salhab-8b57ba235%3Futm_source%3Dshare%26utm_campaign%3Dshare_via%26utm_content%3Dprofile%26utm_medium%3Dandroid_app">
						<div className="rounded-lg ">
							<img
								className="rounded-lg w-full h-full"
								src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/2048px-LinkedIn_icon.svg.png"
								alt="LINKEDIN Icon"
							/>
						</div>
					</a>
				</button>
				<button className="w-full rounded-lg  h-[25%] hover:bg-slate-700">
					<a href="https://x.com/MoonWebsDev?t=Da-iTcHejZqtJNLbrDfuGQ&s=09">
						<div className="rounded-lg ">
							<img
								className="rounded-lg w-full h-full"
								src="https://i.etsystatic.com/47286684/r/il/01ded2/5474878123/il_570xN.5474878123_94t0.jpg"
								alt="X Icon"
							/>
						</div>
					</a>
				</button>
				<button className="w-full rounded-lg  h-[25%] hover:bg-slate-700">
					<a href="#">
						<div className="rounded-lg ">
							<img
								className="rounded-lg w-full h-full"
								src="https://cdn-icons-png.freepik.com/256/15707/15707917.png?semt=ais_hybrid"
								alt="WHATSAPP Icon"
							/>
						</div>
					</a>
				</button>
				<button className="w-full rounded-lg  h-[25%] hover:bg-slate-700">
					<a href="#">
						<div className="rounded-lg ">
							<img
								className="rounded-lg w-full h-full "
								src="https://cdn-icons-png.freepik.com/512/9073/9073302.png"
								alt="SHARE Icon"
							/>
						</div>
					</a>
				</button>
			</aside>

			{/* small screen */}
			<aside className="fixed left-2 lg:hidden bottom-2 block w-[73px] h-[80px] z-10">
				<button className="w-full rounded-lg  h-full hover:bg-slate-700">
					<a href="#">
						<div className="rounded-lg ">
							<img
								className="rounded-lg w-full h-full "
								src="https://cdn-icons-png.freepik.com/512/9073/9073302.png"
								alt="SHARE Icon"
							/>
						</div>
					</a>
				</button>
			</aside>
		</>
	);
};

export default Aside;
