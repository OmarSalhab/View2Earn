import { FaCircleExclamation } from "react-icons/fa6";

interface ToastProps {
  title: string;
}

const Toast = ({ title }: ToastProps) => {
	{
		return (
			<div className="fixed inset-0">
				<div
					className={`flex justify-center gap-3 items-center absolute sm:bottom-10 bottom-20 sm:left-6 left-1 transition-transform h-[9%] sm:w-[21%] w-full p-2 ${
						title === "Submitted Succssfully" ? "bg-green-600" : "bg-red-600"
					} text-white font-medium`}
				>
					<FaCircleExclamation size={24} /> <h4>{title}</h4>{" "}
				</div>
			</div>
		);
	}
};
export default Toast;
