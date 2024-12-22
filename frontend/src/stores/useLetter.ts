import { create } from "zustand";
import axios, { AxiosError } from "axios";
import { FontType } from "../type/fontType.ts";
import { LetterPaperType } from "../type/letterPaperType.ts";

interface LetterProps {
  letterReceiver: string;
  letterSender: string;
  message: string;
  imageUrl: string;
  fontType: FontType;
  letterPaperType: LetterPaperType;
}

interface LetterViewProps {
  isLoading: boolean;
  error: AxiosError | null;
  letter: LetterProps | null;
  getLetter: (letterId: string) => void;
}

const useLetter = create<LetterViewProps>(set => ({
  isLoading: false,
  error: null,
  letter: null,
  getLetter: async (letterId: string) => {
    set({ isLoading: true });
    await axios
      .get(process.env.REACT_APP_BASE_URL + `/letters/${letterId}`)
      .then(res => {
        set({ letter: res.data });
      })
      .catch(error => set({ error }))
      .finally(() => set({ isLoading: false }));
  },
}));

export { useLetter };
