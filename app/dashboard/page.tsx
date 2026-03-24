"use client";
import { useCallback, useMemo, useState } from "react";
import { Card } from "@/app/components/Card/Card";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { addFavoriteGame, removeFavoriteGame } from "../lib/slices/gameSlice";
import { Game } from "../lib/interfaces/games";
import { GamesQueryParams, useSearchGamesQuery } from "../lib/services/gamesApi";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const favourites = useAppSelector((s) => s.favourites);
  const [searchTerm, setSearchTerm] = useState<GamesQueryParams>(

  );
  const { data: searchResults, isLoading, isError, error } = useSearchGamesQuery(searchTerm ?? {})
  console.log('RTK state:', { isLoading, isError, error, searchResults });
  const games = useMemo<Game[]>(
    () => searchResults ?? [],
    [searchResults]
  );
  //senza useMemo, ad ogni render viene ricostruito l'oggetto Set, quindi avrebbe avuto 
  //un riferimento diverso anche se il contenuto è identico.
  const favouriteIds = useMemo(
    () => new Set(favourites.map(f => f.id)),
    [favourites]
  )

  const onToggleFavorite = useCallback((id: number) => {
    const game = games.find(g => g.id === id);
    if (!game) return;

    if (favouriteIds.has(id)) {
      dispatch(removeFavoriteGame(id));
    } else {
      dispatch(addFavoriteGame(game));//game diventa payload, quando chiamiamo addFavoriteGame 
      // costruiamo un azione {type: 'favourites/addFavoriteGame', payload: game}
    }
  }, [dispatch, games, favouriteIds]);

  /*
  Il padre crea/ha una funzione (che dentro fa dispatch(...))
  
  Il padre passa quella funzione alla Card come prop
  
  La Card, al click, chiama quella funzione
  
  Quella funzione è in realtà la funzione del padre, quindi il codice che gira è nel padre (dispatch incluso)
  */
  return (
    <div className="flex justify-center min-h-screen w-full">
      {isLoading && <p>Caricamento...</p>}
      {isError && <p>Errore: {JSON.stringify(error)}</p>}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5">
        {searchResults && searchResults.map((g: Game) => (
          <Card
            key={g.id}
            id={g.id}
            imgLink={g.background_image}
            title={g.name}
            isFavorite={favouriteIds.has(g.id)}
            onToggleFavorite={onToggleFavorite} />
        ))}
      </div>
    </div>
  )
}