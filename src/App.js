import React, { useEffect, useState, useRef } from 'react';
import useTimer from './useTimer';


const App = () => {
    return <>

        <div id="enseiTitle">遠征</div>
        <div id="enseiCounter">
            <Counter />
        </div>
        <div id="enseiCounter">
            <Counter />
        </div>
        <div id="enseiCounter">
            <Counter />
        </div>

        <div id="nyukyoTitle">入渠</div>
        <div id="nyukyoCounter">
            <Counter />
        </div>
        <div id="nyukyoCounter">
            <Counter />
        </div>
        <div id="nyukyoCounter">
            <Counter />
        </div>
        <div id="nyukyoCounter">
            <Counter />
        </div>

        <div id="kenzouTitle">建造</div>
        <div id="kenzouCounter">
            <Counter />
        </div>
        <div id="kenzouCounter">
            <Counter />
        </div>
        <div id="kenzouCounter">
            <Counter />
        </div>
        <div id="kenzouCounter">
            <Counter />
        </div>

    </>
}

export function Generator() {

}

export function Counter() {
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [id, setId] = useState(null);
    const callbackRef = useRef();
    const [buttonText, setButtonText] = useState("スタート"); //same as creating your state variable where "Next" is the default value for buttonText and setButtonText is the setter function for your state variable instead of setState
    const [pushCount, setpushCount] = useState(1);

    // addTimerボタンが押された際の処理
    /* const addTimer = () => {
        setpushCount(p => p + 1);
        const [hour +  ,setHour + pushCount] = useState(0);
    } */

    // ボタンを押下した際に表示されている文字を変更する
    const changeText = () => {
        if (buttonText == "スタート") {
            setButtonText("ストップ");
        } else {
            setButtonText("スタート");
        }
    }

    // ボタンを押下した際にタイマーを動かしたり止めたりする
    const operateTimer = () => {
        if (buttonText == "スタート") {
            const intervalId = setInterval(() => { callbackRef.current() }, 1000);
            setId(intervalId);
        } else {
            clearInterval(id);
        }
    }

    // カウントダウン用
    const countDown = () => {
        // secが0でないときの処理
        if (second != 0) {
            setSecond(s => s - 1);
        }
        // secが0でminが0でないときの処理
        else if (minute != 0) {
            setMinute(m => m - 1);
            setSecond(s => 59);
        }
        // secが0でminが0でhourが0でないときの処理
        else if (hour != 0) {
            setHour(h => h - 1);
            setMinute(m => 59);
            setSecond(s => 59);
            // カウントダウンが終了したときの処理
        } else {
            clearInterval(id);
            setId(null);
            setButtonText("スタート");
        }
    }

    // 描画されるとカウントダウン関数を実行する
    useEffect(() => {
        callbackRef.current = countDown;
    }, [countDown])




    return ( 
        <div>
            <div id="timerList">
                <input value={hour}
                    onChange={(event) => setHour(event.target.value)} />時間
                <input value={minute}
                    onChange={(event) => setMinute(event.target.value)} />分
                <input value={second}
                    onChange={(event) => setSecond(event.target.value)} />秒
                <button id="btn" type="button" onClick={() => { changeText(); operateTimer(); }}>{buttonText}</button>
            </div>
        </div>
    );

}
export default App;