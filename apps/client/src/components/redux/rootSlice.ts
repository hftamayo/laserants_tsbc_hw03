import { combineReducers } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";
import productReducer from "./productSlice";
import scartReducer from "./scartSlice";
import categoryReducer from "./categorySlice";

const rootReducer = combineReducers({
    sidebar: sidebarReducer,
    products: productReducer,
    shoppingCart: scartReducer,
    categories: categoryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;