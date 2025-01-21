import { atom } from "recoil";

const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    if (typeof window !== "undefined") {
      const savedValue = localStorage.getItem(key);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }

      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem(key)
          : localStorage.setItem(key, JSON.stringify(newValue));
      });
    }
  };

export const Hello = atom({
    key: "Hello",
    default:false
})

export const contactsState = atom({
    key: "contactsState",
    default: [],
    effects: [localStorageEffect("contactsState")]
})

export const tasksState = atom({
    key: "tasksState",
    default: [],
    effects: [localStorageEffect("tasksState")], 
});
  