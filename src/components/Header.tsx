const Header = () => {
	return (
		<header className="flex w-full h-20 md:pl-60 items-center box-border bg-[#b43c2c] text-slate-50 font-bold p-1">
			<div className="flex items-center">
				<img
					src="https://llcuimegzpvhxgidwzlf.supabase.co/storage/v1/object/public/vassets/images/favicon.ico"
					alt="logo"
					className="w-14 h-14"
				/>{" "}
				<h4 className="flex flex-col p-4">
					<span className="text-3xl font-normal">
						View<span className="font-extrabold text-4xl text-slate-50">2</span>
						Earn
					</span>{" "}
					<p className="text-slate-50  text-h-[15px] font-normal">
						Your YouTube Paycheck Predictor
					</p>{" "}
				</h4>
			</div>
		</header>
	);
};

export default Header;
