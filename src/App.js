import React, { useEffect, useState } from 'react';
import useTimer from './useTimer';


const App = () => {
    return <>
        <Counter />
    </>
}


export function Counter() {

    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [id, setId] = useState(null);

    //const [time,resetTime]=useTimer()



    const startTimer = () => {
        if (!id) {
            useEffect(() => {
            const intervalId = setInterval(() => countDown(), 1000);
            setId(intervalId);
            return () => clearInterval(intervalId);
            });
        }
    }

    // カウントダウンする関数
    const countDown = () => {
        console.log(second)
        // secが0でないときの処理
        if (second != 0) {
            setSecond(s => s - 1);
            console.log("1");
        }
        // secが0でminが0でないときの処理
        else if (minute != 0) {
            setMinute(m => m - 1);
            setSecond(s => 59);
            console.log("2")
        }
        // secが0でminが0でhourが0でないときの処理
        else if (hour != 0) {
            setHour(h => h - 1);
            setMinute(m => 59);
            setSecond(s => 59);
        // カウントダウンが終了したときの処理
        } else {
            clearInterval(id);
        }
    }



    return (
        <div>
            タイマー
            <div>
                1.
                <input value={hour}
                    onChange={(event) => setHour(event.target.value)} />時間
                <input value={minute}
                    onChange={(event) => setMinute(event.target.value)} />分
                <input value={second}
                    onChange={(event) => setSecond(event.target.value)} />秒
                <button type="button" onClick={startTimer}>スタート</button>
            </div>
            <p>{hour}時間{minute}分{second}秒</p>
        </div>
    );

}
export default App;