interface CommentProps {
	time: string;
	name: string;
	comment: string;
}

const Comment = ({ time, name, comment }: CommentProps) => {
	return (
		<>
			<div className="w-full flex flex-col gap-2 py-4 border-b border-gray-100">
				<div className="flex gap-3 items-center pb-5">
					<img
					alt="user picture"
						src="https://secure.gravatar.com/avatar/fdcd9bc3e25c2020ba21a009a563d6cc?s=68&d=mm&r=g"
						className="w-10 h-10"
					/>
					<span className="font-bold text-gray-800 text-sm sm:text-[16px]">{name}</span>
					<span className="text-sm sm:text-[16px] text-gray-500 ">on {time}</span>
				</div>
				<p className="text-gray-700 text-sm sm:text-[16px]">{comment}</p>
			</div>
			
		</>
	);
};

export default Comment;
