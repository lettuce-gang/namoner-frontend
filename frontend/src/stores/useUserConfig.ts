import { create } from "zustand";
import { AxiosError } from "axios";
import api from "../auth/api.ts";

interface UserConfig {
  showPostbox?: boolean;
  receiveLetter?: boolean;
  showLetterCount?: boolean;
}

interface UserConfigResponse {
  postBoxName: string;
  userConfig?: UserConfig;
}

interface UserConfigProps {
  isLoading: boolean;
  error: AxiosError | null;
  config: UserConfigResponse | null;
  getUserConfig: () => void;
  setUserConfig: (config: UserConfig) => void;
}

const useUserConfig = create<UserConfigProps>(set => ({
  isLoading: false,
  error: null,
  config: null,

  getUserConfig: async () => {
    set({ isLoading: true });
    await api
      .get(process.env.REACT_APP_BASE_URL + '/users')
      .then(res => {
        set({ config: res.data.data });
      })
      .catch(error => set({ error }))
      .finally(() => set({ isLoading: false }));
  },

  setUserConfig: async (config: UserConfig) => {
    set(state => {
      const updatedConfig = {
        showPostbox: config.showPostbox ?? state.config?.userConfig?.showPostbox,
        receiveLetter: config.receiveLetter ?? state.config?.userConfig?.receiveLetter,
        showLetterCount: config.showLetterCount ?? state.config?.userConfig?.showLetterCount,
      };

      return {
        isLoading: true,
        error: null,
        config: state.config ? { ...state.config, userConfig: updatedConfig } : null
      };
    });

    await api
      .patch(process.env.REACT_APP_BASE_URL + '/users/config', config)
      .catch(error => {
        set(state => ({
          error,
          config: state.config
        }));
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
}));

export { useUserConfig }; 