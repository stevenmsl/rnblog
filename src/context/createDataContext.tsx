import React, {useReducer, createContext} from 'react';

/**
  @typeParam TState the type of the state you are managing
  @typeParam TAction the type of the action. An action usually has a type and a payload properties
  @typeParam TBoundActions type for the functions that can be called by the context user to modify the state
*/
const createDataContext = <TState, TAction, TBoundActions>(
  reducer: (state: TState, action: TAction) => TState,
  /* hard to type this due to its dynamic nature
   */
  actionsFuncs: any,
  initialState: TState,
) => {
  /*#TA-03 state and the methods that maintain the state
   */
  type ContextType = {state: TState} & TBoundActions;
  const Context = createContext<ContextType | null>(null);

  /*#TA-04 */
  const Provider: React.FC = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    /* we need to dynamically add properties to an object
       - annote it as type "any" here unless there is a better 
         way to handle this
     */
    let boundActions: any = {};
    for (let key in actionsFuncs) {
      boundActions[key] = actionsFuncs[key](dispatch);
    }

    return (
      <Context.Provider value={{state, ...boundActions}}>
        {children}
      </Context.Provider>
    );
  };

  return {Context, Provider};
};

export default createDataContext;
