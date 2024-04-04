import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const inputAtom = atom({
    key: 'inputAtom',
    default: {
        Loc1:{
            lat: 22.1696 || 0,
            lng: 91.4996 || 0
        },
        Loc2:{
            lat: 22.2637 || 0,
            lng: 91.7159 || 0
        },
        speed:20,
        distance:200.4,
    },
    effects_UNSTABLE: [persistAtom],

})

export const startAtom = atom({
    key: 'startAtom',
    default: false,
})