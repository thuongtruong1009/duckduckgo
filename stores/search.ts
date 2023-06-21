import { acceptHMRUpdate, defineStore } from "pinia";
import { E_SEARCH_HISTORY } from "~/constants/cookie";
import { getDateFormat } from "~/helpers/date";

interface State {
  readonly config: any;
  cookie: string | null | undefined;

  searchValue: string;
  searchResults: any;
  modalOpen: boolean;
  searchHistory: any[];
}

export const useSearchStore = defineStore("storeId", {
  state: (): State => ({
    config: useRuntimeConfig().public,
    cookie: useCookie(E_SEARCH_HISTORY).value,

    searchValue: "",
    searchResults: null,
    modalOpen: false,
    searchHistory: [],
  }),

  getters: {
    getState: (state: State) => state,
  },

  actions: {
    setCookie(value: string): void {
      this.cookie = value;
      useCookie(E_SEARCH_HISTORY).value = value;
    },

    setClearHistory() {
      this.setCookie("");
      this.cookie = null;
      this.searchHistory = [];
      this.modalOpen = false;
    },

    updateHistory(value: string) {
      const date = new Date();
      this.searchHistory.length > 0 &&
        this.searchHistory.filter((user: any) => user.searchValue === value);

      this.searchHistory.push({
        searchValue: value,
        date: getDateFormat(date),
      });
      this.setCookie(JSON.stringify(this.searchHistory));
    },

    async postSearchValue(value: string) {
      if (value.length > 0) {
        const date = new Date();
        if (navigator.onLine) {
          if (!this.cookie) {
            this.setCookie(
              JSON.stringify([
                {
                  searchValue: value,
                  date: getDateFormat(date),
                },
              ])
            );
            this.searchHistory = JSON.parse(JSON.stringify(this.cookie));
          } else {
            console.log(this.cookie);
            this.searchHistory = JSON.parse(JSON.stringify(this.cookie));
            this.updateHistory(value);
          }

          await fetch(
            `https://www.googleapis.com/customsearch/v1?key=${this.config.searchKey}&cx=${this.config.searchCtx}&q=${value}`
          )
            .then((res) => res.json())
            .then((data) => {
              this.searchResults = data.items;
              console.log(this.searchResults);
            });
        } else {
          alert("You are offline, turn on internet and try it");
        }
      } else {
        alert("Please enter search value");
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSearchStore, import.meta.hot));
}
