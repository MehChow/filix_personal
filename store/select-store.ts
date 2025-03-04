import { create } from "zustand";

interface SelectData {
  category: string;
  productName: string;
}

interface SelectState {
  selectedData: SelectData;
  setSelectOption: (data: SelectData) => void;
  clearSelectOption: () => void;
}

/**
 * A Zustand store that stores the selected option from the home screen
 *
 * @description
 * After user choose a category and a product name, and click the confirm button,
 * the data will be stored in this store for displaying in the result page.
 * When the user click the back home button, the data should be cleared by calling the `clearSelectOption` function.
 */
export const useSelectStore = create<SelectState>()((set) => ({
  selectedData: {
    category: "",
    productName: "",
  },
  setSelectOption: (data) =>
    set({
      selectedData: { category: data.category, productName: data.productName },
    }),
  clearSelectOption: () =>
    set({ selectedData: { category: "", productName: "" } }),
}));
