import { render} from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import favouritesReducer, { GamesStore } from '../lib/slices/gameSlice';
import { Game } from '../lib/interfaces/games';
import Page from '../page';

// Mock dei dati di gioco
const mockGames: Partial<Game>[] = [
  {
    id: 1,
    name: 'Game 1',
    background_image: 'https://example.com/game1.jpg',
    rating: 4.5,
    released: '2023-01-01',
  },
  {
    id: 2,
    name: 'Game 2',
    background_image: 'https://example.com/game2.jpg',
    rating: 4.0,
    released: '2023-02-01',
  },
  {
    id: 3,
    name: 'Game 3',
    background_image: 'https://example.com/game3.jpg',
    rating: 3.5,
    released: '2023-03-01',
  },
];

// Tipo per lo state del test store
interface TestRootState {
  favourites: ReturnType<typeof favouritesReducer>;

}

// Funzione helper per creare uno store di test
function createTestStore(preloadedState: PreloadedState<TestRootState> = {}) {
  return configureStore({
    reducer: favouritesReducer,
    preloadedState,
  });
}

global.fetch = jest.fn();
describe('Dashboard', () => {
  test('initial render and fetch games', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <Page />
      </Provider>
    )
  });
});

// Mock della fetch globale