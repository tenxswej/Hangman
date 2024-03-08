import { createContext, useReducer, Dispatch, useContext } from "react";
import { initialState, IInitialState, TAction } from "./initialStates";
import { gameReducer } from "./reducer";

export const GameContext = createContext<IContext>({
   state: initialState,
   dispatch: () => null,
});

interface IContext {
   state: IInitialState;
   dispatch: Dispatch<TAction>;
}

interface IChildren {
   children: React.ReactNode;
}

export const GameContextProvider = ({ children }: IChildren) => {
   const [state, dispatch] = useReducer(gameReducer, initialState);

   const value = {
      state,
      dispatch,
   };

   return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => useContext(GameContext);
