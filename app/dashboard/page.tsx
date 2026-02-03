"use client";
import { useEffect, useState } from "react";
import { Card } from "@/app/components/Card/Card";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { addFavoriteGame, removeFavoriteGame } from "../lib/slices/gameSlice";
import { Game } from "../lib/interfaces/games";

export default function Dashboard() {
  const [games, setGames] = useState([]);
  const dispatch = useAppDispatch();
  const favourites = useAppSelector((s) => s.favourites);
  const favouriteIds = new Set(favourites.map(g => g.id));

  const loadGames = async () => {
    const res = await fetch(`/api/games`);
    const data = await res.json();
    return data.results;
  }

  useEffect(() => {
    loadGames().then(games => {
      setGames(games);
    });
  }, []);

  const onToggleFavorite = (game: Game) => {
    if (favouriteIds.has(game.id)) {
      dispatch(removeFavoriteGame(game.id));
    }
    else dispatch(addFavoriteGame(game));
  };

  return (
    <div className="mx-auto">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5">
        {games.map((g: Game) => (
          <Card
            key={g.id}
            id={g.id}
            imgLink={g.background_image}
            title={g.name}
            isFavorite={favouriteIds.has(g.id)}
            onToggleFavorite={() => onToggleFavorite(g)} />
        ))}
      </div>
    </div>
  )
}