import { create } from "zustand";
import { AxiosError } from "axios";
import api from "../auth/api.ts";

export interface LetterListProps {
  id: string; // 편지 고유 ID
  letterSender: string; // 편지 전송자
  letterReceiver: string; // 편지 수신자
  receiveDate: string; // 편지 수신 날짜
  isRead: boolean; // 읽음 여부
  letterType: string; // 편지 타입(일반, 예약)
}

interface LetterListViewProps {
  isLoading: boolean; //Fetching시
  error: AxiosError | null;
  letterList: LetterListProps[];
  getLetterList: (userId: string) => void;
}

const useLetterList = create<LetterListViewProps>(set => ({
  isLoading: false,
  error: null,
  letterList: [],
  getLetterList: async (userId: string) => {
    set({ isLoading: true });
    await api
      .get(process.env.REACT_APP_BASE_URL + `/letters?userId=${userId}`)
      .then(res => {
        set({ letterList: res.data });
        console.log("resultData:" + res.data);
      })
      .catch(error => set({ error }))
      .finally(() => {
        set({ isLoading: false });
      });
  },
}));

export { useLetterList };
