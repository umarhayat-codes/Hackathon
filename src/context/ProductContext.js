import React, { createContext, useContext, useReducer } from 'react'

const Product = createContext()

const initialState = {selectedProduct : null}

const reducer = (state,{type,payload}) => {
    switch (type) {
        case "SET_SELECTED_PRODUCT": return {...state,selectedProduct : payload}
        default : return state
    }
}
export default function ProductContext({children}) {
    const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <Product.Provider value={{...state,dispatch}}>
      {children}
    </Product.Provider>
  )
}

export const useProductContext = () => useContext(Product)
