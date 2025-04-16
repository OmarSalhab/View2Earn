const PsudueCard = ({
	children,
	color,
}: {
	children: React.ReactNode;
	color: string;
}) => {
	return (
		<div className=" mt-6 relative ">
			<div
				className={`text-[14px] px-10 py-3 leading-7 text-center text-opacity-70 font-bold
					 text-gray-950 ${
							color === "primary" ? "bg-[#d1ecc9]" : "bg-[#f3f0dc]"
						} rounded-sm before:content-[''] before:absolute
					  before:w-[8px] before:h-[100%] before:left-0 before:top-0 ${
							color === "primary" ? "before:bg-[#5c51c1]" : "before:bg-red-700"
						}`}
			>
				{children}
			</div>
		</div>
	);
};
export default PsudueCard;
