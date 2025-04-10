import { useState, useCallback } from 'react';
import { Question } from '../types';

const BASE_URL = 'http://localhost:3000';

export const useQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getQuestionsByQuizId = useCallback(async (quizId: string) => {
    setLoading(true);
    setError(null);
    try {
      console.log(`Fetching questions for quiz ID: ${quizId} from ${BASE_URL}/questions/quiz/${quizId}`);
      const response = await fetch(`${BASE_URL}/questions/quiz/${quizId}`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const result = await response.json();
      console.log('Questions API Response:', result);
      if (result.status === 'SUCCESS') {
        setQuestions(result.data);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { questions, getQuestionsByQuizId, loading, error };
};