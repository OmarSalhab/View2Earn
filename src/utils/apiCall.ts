
const getVideoId = (url: string): string | undefined => {
	const videoId = url
		.split(/[?&]/)
		.find((param) => param.startsWith("v="))
		?.split("=")[1];

	return videoId?.trim();
};

const getChannelId = (url: string): string | undefined => {
    const channelId = url
        .split(/[?&]/)
        .find((param) => param.startsWith("channel="))
        ?.split("=")[1];

    return channelId?.trim();
}

export const fetchByVideo = async (url: any) => {
	try {
		const videoId = getVideoId(url);
		if (!videoId) return;
		const res = await fetch(
			`https://www.googleapis.com/youtube/v3/videos?key=${
				import.meta.env.VITE_YOUTUBE_KEY
			}&part=statistics&id=${videoId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			}
		).then((res) => res.json());
		return res.items[0].statistics.viewCount;
	} catch (err) {
		console.error("Error fetching URL views:", err);
	}
};

export const fetchByChannel = async (url: any) => {
	try {
		const channelId = getChannelId(url);
		if (!channelId) return new Error("Invalid channel URL");
		const res = await fetch(
			`https://www.googleapis.com/youtube/v3/videos?key=${
				import.meta.env.VITE_YOUTUBE_KEY
			}&part=statistics&id=${channelId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			}
		).then((res) => res.json());
		return res.items[0].statistics.viewCount;
	} catch (err) {
		console.error("Error fetching URL views:", err);
	}
};