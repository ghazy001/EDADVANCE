// hooks/useQuiz.ts
import { useState, useCallback } from 'react';
import { Quiz } from '../types';

const BASE_URL = 'http://localhost:3000';

export const useQuiz = () => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getQuizById = useCallback(async (quizId: string) => {
    setLoading(true);
    setError(null);
    try {
      console.log(`Fetching quiz with ID: ${quizId} from ${BASE_URL}/quiz/${quizId}`);
      const response = await fetch(`${BASE_URL}/quiz/${quizId}`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const result = await response.json();
      console.log('Quiz API Response:', result);
      if (result.status === 'SUCCESS') {
        setQuiz(result.data);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array to prevent re-creation

  return { quiz, getQuizById, loading, error };
};