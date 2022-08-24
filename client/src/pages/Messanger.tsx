import { useEffect } from 'react';

import { useAppDispatch } from '../app/hooks';
import { fetchChats } from '../features/chat/chat';

const Messanger = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  return <div>Messanger</div>;
};

export default Messanger;
