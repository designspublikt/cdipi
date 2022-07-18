import { ArticleFull } from "./article";
import { FullVideo } from "./video";

export interface Results {
	articles: ArticleFull[],
	videos: FullVideo[]
}