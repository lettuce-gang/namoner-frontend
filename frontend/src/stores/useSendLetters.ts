import axios, { AxiosError } from "axios";
import { create } from "zustand";
import visitorApi from "../auth/visitorApi.ts";
import api from "../auth/api.ts";

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
  imageUrl?: string;
  imageFile?: File;
  letterType: string;
  receiveDate?: string;
  letterWriteStep: number;
  setLetterFrameType: (letterPaperType: string, fontType: string) => void;
  setLetterInfo: (sender: string, receiver: string, message: string, imageUrl?: string, imageFile?: File) => void;
  setLetterWriteStep: (writeStep: number) => void;
  sendLetter: (data: FormData, callback: () => void, isReply: boolean, letterId?: string) => void;
  isLoading: boolean;
  error: AxiosError | null;
  resetData: () => void;
}

const useSendLetters = create<LetterProps>((set, get) => ({
  letterPaperType: "GRAPH_PAPER",
  fontType: "Pretendard_R",
  sender: "",
  receiver: "",
  message: "",
  imageUrl: "",
  imageFile: undefined,
  letterType: "",
  isLoading: false,
  error: null,
  letterWriteStep: 1,
  receiveDate: "",
  setLetterFrameType(letterPaperType, fontType) {
    set({ letterPaperType: letterPaperType, fontType: fontType });
  },
  setLetterInfo(sender, receiver, message, imageUrl = "", imageFile) {
    set({ sender, receiver, message, imageUrl, imageFile });
  },
  setLetterWriteStep(writeStep) {
    set({ letterWriteStep: writeStep });
  },
  sendLetter: async (data, callback, isReply, letterId) => {
    set({ isLoading: true });
    const state = get();

    if (state.imageFile) {
      console.log("imageFile", state.imageFile);
      data.append("image", state.imageFile);
    }
    if(isReply) {
      await api
      .post(`/letters/${letterId}/reply`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(res => {
        callback();
      })
      .catch(err => {
        set({ error: err });
        alert("편지 발송에 실패했습니다. 다시 시도해주세요🥲");
      })
      .finally(() => {
        set({ isLoading: false });
      });
    } else {
    await api
      .post("/letters", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(res => {
        callback();
      })
      .catch(err => {
        set({ error: err });
        alert("편지 발송에 실패했습니다. 다시 시도해주세요🥲");
      })
      .finally(() => {
        set({ isLoading: false });
      });
    }
  },
  resetData() {
    set({
      letterPaperType: "GRAPH_PAPER",
      fontType: "Pretendard_R",
      letterWriteStep: 1,
      message: "",
      sender: "",
      receiver: "",
      receiveDate: "",
    });
  },
}));

export { useSendLetters };
