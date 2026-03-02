export type EsrbRating = {
  id: number;
  slug: string;
  name: string;
}

export type Rating = {
  id: number;
  title: string;
  count: number;
  percent: number;
}

export type AddedByStatus = {
  yet: number;
  owned: number;
  beaten: number;
  toplay: number;
  dropped: number;
  playing: number;
}

export type PlatformDetails = {
  id: number;
  slug: string;
  name: string;
  image: string | null,
  year_end: string | null,
  year_start: number | null,
  games_count: number,
  image_background: string;
}

export type Requirements = {
  minimum: string;
  recommended: string;
}

export type Platform = {
  platform: PlatformDetails;
  released_at: string;
  requirements_en: Requirements | null,
  requirements_ru: Requirements | null
  requirements?: Requirements;
}

export type Game = {
  id: number;
  slug: string;
  name: string;
  released: string;
  tba: boolean;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings: Rating[];
  ratings_count: number;
  reviews_text_count: string | number;
  reviews_count: number;
  added: number;
  added_by_status: AddedByStatus;
  description?: string;
  metacritic: number;
  playtime: number;
  suggestions_count: number;
  updated: string;
  saturated_color: string;
  dominant_color: string;
  esrb_rating?: EsrbRating;
  platforms: Platform[];
}

export type GamesResponse = {
  count: number;
  next: string;
  previous: string;
  results: Game[];
}
