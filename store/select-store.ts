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
