const Aside = () => {
	return (
		<>
			{/* big screen */}
			<aside className=" fixed right-2 lg:flex top-48 hidden flex-col gap-2 w-[73px] h-[300px] ">
				<button className="w-full rounded-lg  h-[25%] hover:bg-slate-700">
					<a href="#">
						<div className="rounded-lg ">
							<img
								className="rounded-lg w-full h-full"
								src="public/Images/facebook-icon-white-logo.svg"
								alt="Facebook Icon"
							/>
						</div>
					</a>
				</button>
				<button className="w-full rounded-lg  h-[25%] hover:bg-slate-700">
					<a href="#">
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
					<a href="#">
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
			<aside className="fixed left-2 lg:hidden bottom-2 block w-[73px] h-[80px]">
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
