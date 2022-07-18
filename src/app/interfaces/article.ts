export interface Article {
	id: number;
	title: string;
	desc_short: string;
	desc_long: string;
	content: string;
	image: string;
	category_id: number;
}

export interface ArticleFull {
	id_article: number;
	title: string;
	desc_short: string;
	desc_long: string;
	content: string;
	image: string;
	id_category_article: number;
	id_category: number;
	category_name: string;
	category_icon: string;
	category_color: string;
	category_type: number;
	category_visible: number;
}