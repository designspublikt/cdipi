export interface VideoYoutube {
	kind:     string;
	etag:     string;
	items:    Item[];
	pageInfo: PageInfo;
}

export interface Item {
	kind:    string;
	etag:    string;
	id:      string;
	snippet: Snippet;
}

export interface Snippet {
	publishedAt:          Date;
	channelId:            string;
	title:                string;
	description:          string;
	thumbnails:           Thumbnails;
	channelTitle:         string;
	tags:                 string[];
	categoryId:           string;
	liveBroadcastContent: string;
	localized:            Localized;
}

export interface Localized {
	title:       string;
	description: string;
}

export interface Thumbnails {
	default: Default;
	medium:  Default;
	high:    Default;
}

export interface Default {
	url:    string;
	width:  number;
	height: number;
}

export interface PageInfo {
	totalResults:   number;
	resultsPerPage: number;
}


export interface FullVideo {
	id_video: number;
	title: string;
	desc_short: string;
	desc_long: string;
	src: string;
	image: string;
	category_id: number;
	id_category: number;
	category_name: string;
	category_icon: string;
	category_color: string;
	category_type: string;
	category_visible: number;
}