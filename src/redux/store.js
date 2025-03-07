import { configureStore } from '@reduxjs/toolkit';
import { gamesSlice } from './gameRedux/gameSlice';
import {eventSlice} from './eventRedux/eventSlice';
import { homeSlice } from './homeRedux/homeSlice';
import { favoritoSlice } from './favoritoRedux/favoritoSlice';
import { gameDetailSlice } from './gameDetailRedux/gameDetailSlice';
import { publisherSlice } from './publisherRedux/publisherSlice';
import { publishersSlice } from './publishersRedux/publishersSlice';
import { tagGamesSlice } from './tagGamesRedux/tagGamesSlice';


export const store = configureStore({
  reducer: {
    games: gamesSlice.reducer,
    events: eventSlice.reducer, 
    home: homeSlice.reducer,
    favorito: favoritoSlice.reducer,
    gameDetail: gameDetailSlice.reducer,
    publisher: publisherSlice.reducer,
    publishers: publishersSlice.reducer,
    tagGames: tagGamesSlice.reducer
  },
});