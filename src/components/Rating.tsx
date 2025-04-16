import Comment from "./Comment";

const Rating = () => {
	// Static comments for now
	const comments = [
		{
			id: "1",
			time: "2023-10-01T12:00:00Z",
			name: "John Doe",
			comment: "This is a great video! Very informative.",
		},
		{
			id: "2",
			time: "2023-10-02T14:30:00Z",
			name: "Jane Smith",
			comment: "I learned so much from this. Thanks for sharing!",
		},
		{
			id: "3",
			time: "2023-10-03T09:15:00Z",
			name: "Alex Johnson",
			comment:
				"Could you make a video on a related topic? That would be awesome!",
		},
	];

	return (
		<div className="w-full mt-8 text-left">
			<h2 className="text-3xl font-semibold mb-5 mt-2">
				{comments.length} Comments
			</h2>
			<div className="flex flex-col gap-4">
				{comments.map((comment) => (
					<Comment
						key={comment.id}
						time={new Date(comment.time).toLocaleString()} // Format the time
						name={comment.name}
						comment={comment.comment}
					/>
				))}
			</div>
			<RatingForm />
		</div>
	);
};

const RatingForm = () => {
	return (
		<div className="w-full mt-8 text-left flex flex-col">
			<h3 className="text-3xl font-semibold mt-10 ">Post a Comment</h3>
			<p className="opacity-60 font-semibold text-[15px] mt-5">
				Your email address will not be published. Required fields are marked *
			</p>
			<form className="flex flex-col gap-4 mt-1">
				<div className="flex flex-col mt-2">
					<label className="text-xl font-medium opacity-70 ">Comment *</label>
					<textarea className="border border-gray-300 h-[300px]"></textarea>
				</div>
				<div className="flex flex-col mt-7">
					<label className="text-xl font-medium opacity-70 ">Name *</label>
					<input type="text" className="border border-gray-300 h-12 w-[40%]"/>
				</div>
				<div className="flex flex-col ">
					<label className="text-xl font-medium opacity-70 ">Email *</label>
					<input type="email" className="border border-gray-300 h-12 w-[40%]"/>
				</div>
                <button className="w-[30%] bg-[#b43c2c] text-white font-semibold text-lg mt-5 py-3 px-2 rounded-sm hover:bg-orange-600 transition duration-200 ease-in-out">
                    Post Comment</button>
			</form>
		</div>
	);
};

export default Rating;
