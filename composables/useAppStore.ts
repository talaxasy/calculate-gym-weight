export const useAppStore = defineStore(
    'app',
    () => {
        const data = ref<{ weight: number; reps: number }[]>([{ weight: 0, reps: 0 }]);
        const setData = (state: { weight: number; reps: number }[]): void =>
            void (data.value = state);

        return {
            data,
            setData,
        };
    },
    {
        persist: true
    },
);

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot));
