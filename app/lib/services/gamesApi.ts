import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Game } from "../interfaces/games";

export type GamesQueryParams = {
  search?: string;
  page?: number;
  page_size?: number;
  ordering?: string;
  genres?: string;
};

type GamesResponse = { results: Game[] };
/*
RTK Query è una libreria per gestire le chiamate API in modo automatico. Ti evita di scrivere manualmente:
fetch,estione di loading, error, data
Cache dei dati
Re-fetching automatico
*/

// Crei un "servizio API" con createApi
export const gamesApi = createApi({
  reducerPath: "gamesApi",  // Nome univoco nello store Redux
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }), // Base URL per tutte le chiamate
  
  endpoints: (builder) => ({
    // Endpoint 1: Cerca giochi
    searchGames: builder.query<Game[], GamesQueryParams>({
      query: (params) => ({
        url: "games",  // Chiama /api/games
        params,  // Aggiunge ?search=term
      }),
      transformResponse: (r: GamesResponse) => r.results,  // Estrae solo i risultati
    }),


    
    // Endpoint 2: Dettaglio gioco
    getGameById: builder.query<Game, number>({
      query: (id) => `games/${id}`,  // Chiama /api/games/123
    }),
  }),
});

export const { useSearchGamesQuery, useGetGameByIdQuery } = gamesApi;
