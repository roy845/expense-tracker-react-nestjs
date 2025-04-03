import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { CurrencyState } from "../types/currency.types";

const CURRENCIES: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  INR: "₹",
  AUD: "A$",
  CAD: "C$",
  CHF: "CHF",
  ILS: "₪",
};

const initialState: CurrencyState = {
  selectedCurrency: "USD",
  currencySymbol: CURRENCIES["USD"],
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<string>) => {
      state.selectedCurrency = action.payload;
      state.currencySymbol = CURRENCIES[action.payload] || "";
    },
  },
});

export const { setCurrency } = currencySlice.actions;
export const selectCurrency = (state: RootState) => state.currency;

export default currencySlice.reducer;
