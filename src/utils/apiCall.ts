const getVideoId = (url: string): string | undefined => {
	const videoId = url
		.split(/[?&]/)
		.find((param) => param.startsWith("v="))
		?.split("=")[1];

	return videoId?.trim();
};

const getChannelId = async (url: string) => {
	try {
		const usernameFormat = url.split("/@")[1].trim();
		if (!usernameFormat) return new Error("Invalid channel URL");
		const res = await fetch(
			`https://www.googleapis.com/youtube/v3/search?q=@${usernameFormat}&type=channel&key=${
				import.meta.env.VITE_YOUTUBE_KEY
			}`
		).then((res) => res.json());
		const channelId = res.items[0].id.channelId;

		return channelId;
	} catch (err) {
		console.error("Error fetching channel ID:", err);
	}

	// return channelId?.trim();
};

export const fetchByVideo = async (url: any) => {
	try {
		const videoId = getVideoId(url);
		if (!videoId) return;
		const res = await fetch(
			`https://www.googleapis.com/youtube/v3/videos?key=${
				import.meta.env.VITE_YOUTUBE_KEY
			}&part=statistics,snippet&id=${videoId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			}
		).then((res) => res.json());
		console.log(res);

		return {
			viewCount: res.items[0].statistics.viewCount,
			thumbnail: res.items[0].snippet.thumbnails.high.url,
			title: res.items[0].snippet.title ?? "https://www.gpshealthonline.com/static/images/no-banner.jpg",
		};
	} catch (err) {
		console.error("Error fetching URL views:", err);
	}
};

export const fetchByChannel = async (url: any) => {
	try {
		const channelId = await getChannelId(url);

		if (!channelId) return new Error("Invalid channel URL");
		const res = await fetch(
			`https://www.googleapis.com/youtube/v3/channels?id=${channelId}&key=${
				import.meta.env.VITE_YOUTUBE_KEY
			}&part=statistics,snippet,brandingSettings
				
			`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			}
		).then((res) => res.json());
		if (!res.items[0]) return new Error("Invalid channel URL");
		console.log(res.items[0].snippet.thumbnails?.high?.url);
		const image =
			res.items[0].snippet.thumbnails?.high?.url ??
			"https://cdn.vectorstock.com/i/500p/21/98/male-profile-picture-vector-1862198.jpg";
		const banner =
			res.items[0].brandingSettings?.image?.bannerExternalUrl ??
			"https://www.gpshealthonline.com/static/images/no-banner.jpg";
		return {
			viewCount: res.items[0].statistics.viewCount,
			title: res.items[0].snippet.title,
			country: res.items[0].snippet.country ?? "N/A",
			image: image,
			banner: banner,
		};
	} catch (err) {
		console.error("Error fetching URL views:", err);
	}
};
