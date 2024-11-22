import { create } from "zustand";
import { ListItem } from "./api/getListData";

type State = {
    visibleCards: ListItem[],
    deletedCards: ListItem[], 
};

type Actions = {
    deleteCard: (card: ListItem) => void,
    restoreCard: (card: ListItem) => void,
    toggleCard: (card: ListItem) => void,
    setVisibleCards: (cards: ListItem[]) => void,
    setDeletedCards: (cards: ListItem[]) => void,

};

export const useStore = create<State & Actions>((set, get) => ({
    visibleCards: [],
    deletedCards: [],
    deleteCard: (card) => {
        // set((state) => ({visibleCards: state.visibleCards.filter((item) => item.id !== card.id)}));
        // set((state) => ({deletedCards: [...state.deletedCards, card]}))
        set((state) => ({
            visibleCards: state.visibleCards.filter((item) => item.id !== card.id),
            deletedCards: [...state.deletedCards, card]
        }))
    },
    restoreCard: (card) => {
        // set((state) => ({deletedCards: state.deletedCards.filter((item) => item.id !== card.id)}));
        // set((state) => ({visibleCards: [...state.visibleCards, card]}));
        set((state) => ({
            deletedCards: state.deletedCards.filter((item) => item.id !== card.id),
            visibleCards: [...state.visibleCards, card]
        }))
    },

    toggleCard: (card) => {
        // const state = get()
        const newCards = [...get().visibleCards];
        const index = newCards.findIndex((item) => item.id === card.id);
        newCards[index].isVisible = !newCards[index].isVisible;
        set(() => ({visibleCards: newCards }));
    },

    setVisibleCards: (newVisibleCards) => {
        const currentVisibleCards = get().visibleCards;
        const currentDeletedCards = get().deletedCards;
        const newCards = newVisibleCards.map((card) => {
            const elementInCurrentDeletedCards = currentDeletedCards.find((item) => item.id === card.id);
            const elementInCurrentCards = currentVisibleCards.find((item) => item.id === card.id);
            if (elementInCurrentCards) {
                return elementInCurrentCards
            } else if (elementInCurrentDeletedCards) {
                return null;
            }
            return {...card, isVisible: false};
        })
        set(() => ({visibleCards: newCards.filter((item) => item !== null)}))
    },



    setDeletedCards: (newDeletedCards) => {
        set(() => ({deletedCards: newDeletedCards}))
    }
}));
