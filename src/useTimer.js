import {useState, useEffect} from 'react';

export default function useTimer() {
  const [time, setTime] = useState(0);  //描画用の時間
  const [id,setId] = useState(null);

  useEffect(() => {
    return () => clearInterval(id);
  }, []);

  const resetTime = () => {
    setTime(0);
    if(id) {clearInterval(id);}
    const timer = setInterval(() => {
      setTime(t => t + 1);
    }, 100);
    setId(timer);
  }

    return [time, resetTime];
}