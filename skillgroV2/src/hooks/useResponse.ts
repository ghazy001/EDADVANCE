import { useState, useCallback } from 'react';
import { Reponse } from '../types';

const BASE_URL = 'http://localhost:3000';

export const useReponses = () => {
  const [reponses, setReponses] = useState<Reponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getReponsesByQuestionId = useCallback(async (questionId: string) => {
    setLoading(true);
    setError(null);
    try {
      console.log(`Fetching responses for question ID: ${questionId} from ${BASE_URL}/reponses/question/${questionId}`);
      const response = await fetch(`${BASE_URL}/reponses/question/${questionId}`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const result = await response.json();
      console.log('Reponses API Response:', result);
      if (result.status === 'SUCCESS') {
        setReponses(result.data);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { reponses, getReponsesByQuestionId, loading, error };
};