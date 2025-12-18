import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

const initialAuthState = {
  isAuthenticated: true,
  isInitialized: false,
  user: null,
  token: null,
  impersonating: false,
  impersonatedOriginalUser: null
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true
    };
  }
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext({
  ...initialAuthState,
  method: 'Google'
});

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  useEffect(() => {
    const initialize = async () => {
      try {
        //TODO: hasta que no se implemente una nueva forma de logar, siempre estará autenticado
        let isAuthenticated = true;
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated
          }
        });
      } catch (error) {
        console.log('error: ' + error);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false
          }
        });
      }
    };

    initialize();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'Google'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const AuthConsumer = AuthContext.Consumer;
