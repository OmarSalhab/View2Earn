import { useState, useEffect } from "react";
import supabase from "../utils/supabase-client";
import Comment from "./Comment";
import Toast from "./Toast";
const Rating = () => {
	const [comments, setComments] = useState<any>([]);
	const [comment, setComment] = useState<any>({
		name: "",
		description: "",
		email: "",
	});
	const [replayTo, setReplayTo] = useState("");

	const [emptyFieldsError, setEmptyFieldsError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [nameError, setNameError] = useState(false);
	const [showToast, setShowToast] = useState({ title: "", visable: false });
	useEffect(() => {
		const fetchComments = async () => {
			try {
				const feedbacks = await supabase
					.from("comments")
					.select("*")
					.order("created_at", { ascending: false });
				if (feedbacks.error) throw new Error(`${feedbacks.error}`);
				setComments(feedbacks.data);
			} catch (err) {
				console.error(err);
			}
		};
		fetchComments();
	}, []);

	const handleFormValidty = () => {
		if (!comment.name || !comment.email || !comment.description) {
			setEmptyFieldsError(true);
			setEmailError(false);
			setNameError(false);
			setShowToast({
				title: "Missing Field/Fields, Please Fill All Fields.",
				visable: true,
			});

			setTimeout(() => {
				setShowToast({ title: "", visable: false });
			}, 1800);
			// alert("Missing Field/Fields, Please Fill All Fields.");
			return false;
		}
		setEmptyFieldsError(false);
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(comment.email)) {
			setEmailError(true);
			setEmptyFieldsError(false);
			setShowToast({
				title: "Invalid Email Format, Please Put The Correct Email.",
				visable: true,
			});
			setTimeout(() => {
				setShowToast({ title: "", visable: false });
			}, 1800);
			return false;
		}
		setEmailError(false);
		const nameRegex = /^[a-zA-Z\s'-]+$/;
		if (!nameRegex.test(comment.name)) {
			setNameError(true);
			setEmptyFieldsError(false);
			setShowToast({
				title: "Invalid Name Format, Please Put The Correct Name.",
				visable: true,
			});
			setTimeout(() => {
				setShowToast({ title: "", visable: false });
			}, 1800);
			return false;
		}
		setNameError(false);

		return true;
	};
	const insertComment = async () => {
		try {
			const res = await supabase.from("comments").insert(comment);
			if (res.error) throw new Error(`${res.error}`);
			return true;
		} catch (err) {
			console.error(err);
		}
	};

	const insertReplay = async () => {
		try {
			const res = await supabase.from("comments").insert(comment);
			if (res.error) throw new Error(`${res.error}`);
		} catch (err) {
			console.error(err);
		}
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (!handleFormValidty()) return;
		if (!(await insertComment())) {
			console.error("There was an Error when adding your feedback");
			return;
		}
		try {
			const feedbacks = await supabase
				.from("comments")
				.select("*")
				.order("created_at", { ascending: false });
			if (feedbacks.error) throw new Error(`${feedbacks.error}`);
			setComments(feedbacks.data);
			setShowToast({
				title: "Submitted Succssfully",
				visable: true,
			});
			setTimeout(() => {
				setShowToast({ title: "", visable: false });
			}, 1800);
			setComment({ name: "", email: "", description: "" });
		} catch (err) {
			console.error(err);
		}
	};
	const handleReplay = async (e: any) => {
		e.preventDefault();
		if (!handleFormValidty()) return;
		if (!insertReplay()) {
			console.error("There was an Error when adding your feedback");
			return;
		}
	};
	return (
		<div className="w-full mt-8 text-left">
			<h2 className="text-3xl font-semibold mb-5 mt-2">
				{comments.length} Comments
			</h2>
			<div className="flex flex-col gap-4">
				{comments &&
					comments.map((mapedComment: any) => (
						<>
							<Comment
								key={mapedComment.id}
								time={new Date(mapedComment.created_at).toLocaleString()} // Format the time
								name={mapedComment.name}
								comment={mapedComment.description}
							/>
							<button
								onClick={() => setReplayTo(mapedComment.id)}
								className="text-orange-600 text-left mt-3 font-medium"
							>
								replay
							</button>
							{replayTo === mapedComment.id && (
								<div className="w-full text-left flex flex-col">
									<div className="flex  w-full justify-between">
										<h3 className="text-3xl w-2/3 font-semibold mt-6 ">
											Replay To {mapedComment.name}
										</h3>
										<button
											onClick={() => {
												setReplayTo("");
												setEmptyFieldsError(false);
												setEmailError(false);
												setNameError(false);
											}}
											className=" text-orange-600 mt-6 pr-3 text-xl w-1/3 text-right "
										>
											Cancel Replay
										</button>
									</div>
									<p className="opacity-60 font-semibold text-[15px] mt-5">
										Your email address will not be published. Required fields
										are marked *
									</p>
									<form className="flex flex-col gap-4 mt-1">
										<div className="flex flex-col mt-2">
											<label className="text-xl font-medium opacity-70 ">
												Comment *
											</label>
											<textarea
												value={comment.description}
												onChange={(e) => {
													setComment({
														...comment,
														description: e.target.value,
													});
												}}
												className="border border-gray-300 h-[300px]"
											></textarea>
										</div>
										<div className="flex flex-col mt-7">
											<label className="text-xl font-medium opacity-70 ">
												Name *
											</label>
											<input
												value={comment.name}
												onChange={(e) => {
													setComment({ ...comment, name: e.target.value });
												}}
												type="text"
												className="border border-gray-300 h-12 w-[40%]"
											/>
										</div>
										<div className="flex flex-col ">
											<label className="text-xl font-medium opacity-70 ">
												Email *
											</label>
											<input
												value={comment.email}
												onChange={(e) => {
													setComment({ ...comment, email: e.target.value });
												}}
												type="email"
												className="border border-gray-300 h-12 w-[40%]"
											/>
										</div>
										<button
											onClick={handleReplay}
											className="w-[30%] bg-[#b43c2c] text-white font-semibold text-lg mt-5 py-3 px-2 rounded-sm hover:bg-orange-600 transition duration-200 ease-in-out"
										>
											Post Comment
										</button>
									</form>
									{showToast.visable && <Toast title={showToast.title} />}
								</div>
							)}
						</>
					))}
			</div>
			{!replayTo && (
				<div className="w-full mt-8 text-left flex flex-col">
					<h3 className="text-3xl font-semibold mt-10 ">Post a Comment</h3>
					<p className="opacity-60 font-semibold text-[15px] mt-5">
						Your email address will not be published. Required fields are marked
						*
					</p>
					<form className="flex flex-col gap-4 mt-1">
						<div className="flex flex-col mt-2">
							<label className="text-xl font-medium opacity-70 ">
								Comment *
							</label>
							<textarea
								value={comment.description}
								onChange={(e) => {
									setComment({ ...comment, description: e.target.value });
								}}
								className={`${
									emptyFieldsError ? "border-red-700" : "border-gray-300"
								} border h-[300px]`}
							></textarea>
						</div>
						<div className="flex flex-col mt-7">
							<label className="text-xl font-medium opacity-70 ">Name *</label>
							<input
								value={comment.name}
								onChange={(e) => {
									setComment({ ...comment, name: e.target.value });
								}}
								type="text"
								className={`${
									emptyFieldsError ? "border-red-700" : "border-gray-300"
								} ${
									nameError ? "border-red-700" : "border-gray-300"
								} border  h-12 w-[40%]`}
							/>
						</div>
						<div className="flex flex-col ">
							<label className="text-xl font-medium opacity-70 ">Email *</label>
							<input
								value={comment.email}
								onChange={(e) => {
									setComment({ ...comment, email: e.target.value });
								}}
								type="email"
								className={`${
									emptyFieldsError ? "border-red-700" : "border-gray-300"
								} ${
									emailError ? "border-red-700" : "border-gray-300"
								} border  h-12 w-[40%]`}
							/>
						</div>
						<button
							onClick={handleSubmit}
							className="w-[30%] bg-[#b43c2c] text-white font-semibold text-lg mt-5 py-3 px-2 rounded-sm hover:bg-orange-600 transition duration-200 ease-in-out"
						>
							Post Comment
						</button>
					</form>
					{showToast.visable && <Toast title={showToast.title} />}
				</div>
			)}
		</div>
	);
};

export default Rating;
