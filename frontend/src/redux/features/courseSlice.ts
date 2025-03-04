import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import courses from '../../data/inner-data/InnerCourseData';

export interface Course {
  id: number;
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
}

interface CourseState {
  courses: Course[];
  course: Course | null;
}

const initialState: CourseState = {
  courses: courses,
  course: null,
};

export const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    single_course: (state, action: PayloadAction<number>) => {
      state.course = state.courses.find((p) => p.id === action.payload) || null;
    },
  },
});

export const { single_course } = courseSlice.actions;

// Selectors
export const selectCourses = (state: { courses: CourseState }) => state?.courses?.courses;
export const selectCourse = (state: { courses: CourseState }) => state?.courses?.course;

export default courseSlice.reducer;