import { useState } from 'react';

export const useMutation = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  return { isPending, isError, isSuccess };
};
