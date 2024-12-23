import axios, { AxiosError } from "axios";
import { create } from "zustand";

type LetterBody = {
  receiverPhoneNumber: string;
  letterPaperType: string;
  fontType: string;
  letterSender: string;
  letterReceiver: string;
  message: string;
};

interface LetterProps {
  letterPaperType: string;
  fontType: string;
  sender: string;
  receiver: string;
  message: string;
  letterWriteStep: number;
  setLetterType: (letterPaperType: string, fontType: string) => void;
  setLetterInfo: (sender: string, receiver: string, message: string) => void;
  setLetterWriteStep: (writeStep: number) => void;
  sendLetter: (data: FormData, callback: () => void) => void;
  isLoading: boolean;
  error: AxiosError | null;
}

const useSendLetters = create<LetterProps>(set => ({
  letterPaperType: "GRAPH_PAPER",
  fontType: "Pretendard_R",
  sender: "",
  receiver: "",
  message: "",
  isLoading: false,
  error: null,
  letterWriteStep: 1,
  setLetterType(letterPaperType, fontType) {
    set({ letterPaperType: letterPaperType, fontType: fontType });
  },
  setLetterInfo(sender, receiver, message) {
    set({ sender: sender, receiver: receiver, message: message });
  },
  setLetterWriteStep(writeStep) {
    set({ letterWriteStep: writeStep });
  },
  sendLetter: async (data, callback) => {
    set({ isLoading: true });
    await axios
      .post("http://3.36.97.155:8080/letters", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(res => {
        callback();
      })
      .catch(err => {
        set({ error: err });
        console.log(err);
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
}));

export { useSendLetters };
