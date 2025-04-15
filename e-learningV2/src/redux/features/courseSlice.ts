import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Course {
    id: string; // Changed to string for MongoDB _id
    title: string;
    thumb: string | undefined;
    category: string;
    rating: number;
    desc: string;
    price: number;
    instructors: string;
    skill_level: string;
    price_type: string;
    language: string;
    popular?: string;
    quantity?: number; // Added for cart
}

interface CourseState {
    courses: Course[];
    course: Course | null;
    cart: Course[];
}

const initialState: CourseState = {
    courses: [],
    course: null,
    cart: [],
};

export const courseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        setCourses: (state, action: PayloadAction<Course[]>) => {
            state.courses = action.payload;
        },
        single_course: (state, action: PayloadAction<string>) => {
            state.course = state.courses.find((p) => p.id === action.payload) || null;
        },
        addToCart: (state, action: PayloadAction<Course>) => {
            const exists = state.cart.find((item) => item.id === action.payload.id);
            if (!exists) {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
            // If you want to increment quantity when item exists, uncomment this:
            // else {
            //     exists.quantity = (exists.quantity || 1) + 1;
            // }
        },
        clearCart: (state) => {
            state.cart = [];
        },
    },
});

export const { setCourses, single_course, addToCart, clearCart } = courseSlice.actions;

export const selectCourses = (state: { courses: CourseState }) => state.courses.courses;
export const selectCourse = (state: { courses: CourseState }) => state.courses.course;
export const selectCart = (state: { courses: CourseState }) => state.courses.cart;

export default courseSlice.reducer;