import { selector } from "recoil";
import { courseState } from "../Atoms/course";

export const courseDetails = selector({
    key: "courseDetails",
    get: ({get})=>{
        const state = get(courseState);
        return state.course;
    }
})