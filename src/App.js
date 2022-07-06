import React, { useEffect, useState, useRef } from 'react';
import Sidebar from "./Sidebar";
import Header from './Header';
import useSound from 'use-sound';
import Sound from './決定ボタンを押す4.mp3';
import { Enseiproperties } from './Enseiproperties';


const App = () => {
    return <>
        <div id="App">
            <div id="header">
                <Header />
                <div id="main">
                    <div id="sidebar">
                        <Sidebar />
                    </div>
                    <div className="content">
                        <div id="enseiTitle">遠征</div>
                        <div id="enseiCounter">
                            <div>
                                <p className='EnseiCounter' id='firstenseiCounter'>
                                    <EnseiCounter />
                                </p>

                                <p className='EnseiCounter' id='secondenseiCounter'>
                                    <EnseiCounter />
                                </p>

                                <p className='EnseiCounter' id='thirdenseiCounter'>
                                    <EnseiCounter />
                                </p>
                            </div>
                        </div>

                        <div id="nyukyoTitle">入渠</div>
                        <div id="nyukyoCounter">
                            <div>
                                <p className='Counter' id='firstnyukyoCounter'>
                                <EnseiCounter />
                                </p>

                                <p className='Counter' id='secondnyukyoCounter'>
                                <EnseiCounter />
                                </p>

                                <p className='Counter' id='thirdnyukyoCounter'>
                                <EnseiCounter />
                                </p>

                                <p className='Counter' id='fourthnyukyoCounter'>
                                <EnseiCounter />
                                </p>
                            </div>
                        </div>

                        <div id="kenzouTitle">建造</div>
                        <div id="kenzouCounter">
                            <div>
                                <p className='Counter' id='firstkenzouCounter'>
                                <EnseiCounter />
                                </p>

                                <p className='Counter' id='secondkenzouCounter'>
                                <EnseiCounter />
                                </p>

                                <p className='Counter' id='thirdkenzouCounter'>
                                <EnseiCounter />
                                </p>

                                <p className='Counter' id='fourthkenzouCounter'>
                                <EnseiCounter />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

/* export function Counter() {
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [id, setId] = useState(null);
    const callbackRef = useRef();
    const [buttonText, setButtonText] = useState("スタート"); //same as creating your state variable where "Next" is the default value for buttonText and setButtonText is the setter function for your state variable instead of setState
    const [timerOpen, settimerOpen] = useState(false);
    const [startTimeValue, setStartTimeValue] = useState(0);
    const [nowTimeValue, setNowTimeValue] = useState(0);
    const [countDownValue, setCountDownValue] = useState(0);
    const [finishText, setFinishText] = useState(false);
    const [play] = useSound(Sound);

    // ボタンを押下した際に表示されている文字を変更する
    const changeText = () => {
        if (buttonText == "スタート") {
            settimerOpen(true);
            setButtonText("ストップ");
        } else if (buttonText == "ストップ") {
            settimerOpen(false);
            setButtonText("スタート");
        } else if (buttonText == "戻る") {
            settimerOpen(false);
            setFinishText(false);
            setButtonText("スタート");
        }
    }

    const finishAnnounce = () => {
        setFinishText(true);
    }

    // ボタンを押下した際にタイマーを動かしたり止めたりする
    const operateTimer = () => {
        if (buttonText == "スタート") {
            setStartTimeValue(t => new Date().getHours() * 3600 + new Date().getMinutes() * 60 + new Date().getSeconds());
            setNowTimeValue(t => (new Date().getHours() * 3600 + new Date().getMinutes() * 60 + new Date().getSeconds()));
            setCountDownValue(t => hour * 3600 + minute * 60 + Number(second));
            const intervalId = setInterval(() => { callbackRef.current() }, 1000);
            setId(intervalId);
        } else if (buttonText == "ストップ") {
            clearInterval(id);
        }
    }

    // カウントダウン用
    const countDown = () => {
        if (hour <= 0 && minute <= 0 && second <= 0) {
            clearInterval(id);
            finishAnnounce();
            setButtonText("戻る");
            setHour(h => 0);
            setMinute(m => 0);
            setSecond(s => 0);
        } else {
            setNowTimeValue(t => (new Date().getHours() * 3600 + new Date().getMinutes() * 60 + new Date().getSeconds()));
            const diff = nowTimeValue - startTimeValue;
            const fixCountDownValue = countDownValue - (diff + 1);
            setHour(h => Math.floor(fixCountDownValue / 3600));
            setMinute(m => Math.floor((fixCountDownValue % 3600) / 60));
            setSecond(s => ((fixCountDownValue % 3600) % 60));
            if (hour == 0 && minute == 1 && second == 1) {
                play();
            }
        }

    }

    // 描画されるとカウントダウン関数を実行する
    useEffect(() => {
        callbackRef.current = countDown;
    }, [countDown])

    return (
        <div className="timerapp">
            {finishText && (
                <div>
                    <p id="finishText">終了！</p>
                </div>
            )}

            <div className='form' id="timerList">

                {!timerOpen && (
                    <div>
                        <input size='1' value={hour}
                            onChange={(event) => setHour(event.target.value)} />時間
                        <input size='1' value={minute}
                            onChange={(event) => setMinute(event.target.value)} />分
                        <input size='1' value={second}
                            onChange={(event) => setSecond(event.target.value)} />秒
                    </div>
                )}

                {timerOpen && (
                    <div>
                        <p className="timer">{hour}時間{minute}分{second}秒</p>
                    </div>
                )
                }
            </div>
            <button id="btn" type="button" onClick={() => { changeText(); operateTimer(); }}>{buttonText}</button>
            <button className="risetbtn" type="button" onClick={() => { setHour(0); setMinute(0); setSecond(0)}}>リセット</button>
        </div>
    )
} */





/////////////////////////////////////////////////////////
// 遠征用のカウントダウン関数
/////////////////////////////////////////////////////////
export function EnseiCounter() {
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [countMax, setCountMax] = useState(0);
    const [count, setCount] = useState(0);
    const [id, setId] = useState(null);
    const callbackRef = useRef();
    const [buttonText, setButtonText] = useState("スタート"); //same as creating your state variable where "Next" is the default value for buttonText and setButtonText is the setter function for your state variable instead of setState
    const [pushCount, setpushCount] = useState(1);
    const [timerOpen, settimerOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [chinjufuOpen, setChinjufuOpen] = useState(false);
    const [nanseisyotouOpen, setNanseisyotouOpen] = useState(false);
    const [hoppouOpen, setHoppouOpen] = useState(false);
    const [nanseiOpen, setNanseiOpen] = useState(false);
    const [seihouOpen, setSeihouOpen] = useState(false);
    const [nanpouOpen, setNanpouOpen] = useState(false);
    const [tyubuOpen, setTyubuOpen] = useState(false);
    const [startTimeValue, setStartTimeValue] = useState(0);
    const [nowTimeValue, setNowTimeValue] = useState(0);
    const [countDownValue, setCountDownValue] = useState(0);
    const dropdownRef = useRef();
    const [finishText, setFinishText] = useState(false);
    const [enseiPlace, setEnseiPlace] = useState("");
    const [Type, setType] = useState("");
    const [play] = useSound(Sound);

    const confirmType = () => {
        const parentId = document.querySelector('')
    }

    // リストの外側をクリックしたらリストが閉じる関数
    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    const handleOutsideClick = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };

    // 遠征を選択したら入力欄に遠征時間を表示する関数
    const onClicklistElem = (place) => {
        setHour(h => Enseiproperties[place].hour);
        setMinute(m => Enseiproperties[place].minute);
        setSecond(s => Enseiproperties[place].second);
        setEnseiPlace(Enseiproperties[place].place);

        if (1 <= place >= 13) {
            setChinjufuOpen(!chinjufuOpen);
        }
        else if (14 <= place >= 27) {
            setNanseisyotouOpen(!nanseisyotouOpen);
        }
        else if (28 <= place >= 35) {
            setHoppouOpen(!hoppouOpen);
        }
        else if (36 <= place >= 41) {
            setSeihouOpen(!seihouOpen);
        }
        else if (42 <= place >= 52) {
            setNanpouOpen(!nanpouOpen);
        }
        setIsOpen(!isOpen);
    }

    // ボタンを押下した際に表示されている文字を変更する
    const changeText = () => {
        if (buttonText == "スタート") {
            settimerOpen(true);
            setButtonText("ストップ");
        } else if (buttonText == "ストップ") {
            settimerOpen(false);
            setButtonText("スタート");
        } else if (buttonText == "戻る") {
            settimerOpen(false);
            setFinishText(false);
            setButtonText("スタート");
            setEnseiPlace("");
        }
    }

    // ボタンを押下した際にタイマーを動かしたり止めたりする
    const operateTimer = () => {
        if (buttonText == "スタート") {
            setStartTimeValue(t => new Date().getHours() * 3600 + new Date().getMinutes() * 60 + new Date().getSeconds());
            setNowTimeValue(t => (new Date().getHours() * 3600 + new Date().getMinutes() * 60 + new Date().getSeconds()));
            setCountDownValue(t => hour * 3600 + minute * 60 + Number(second));
            const intervalId = setInterval(() => { callbackRef.current() }, 1000);
            setId(intervalId);
        } else {
            clearInterval(id);
        }
    }

    const finishAnnounce = () => {
        setFinishText(true);
    }

    // カウントダウン用
    const countDown = () => {
        if (hour <= 0 && minute <= 0 && second <= 0) {
            clearInterval(id);
            finishAnnounce();
            setButtonText("戻る");
            setHour(h => 0);
            setMinute(m => 0);
            setSecond(s => 0);
        } else {
            setNowTimeValue(t => (new Date().getHours() * 3600 + new Date().getMinutes() * 60 + new Date().getSeconds()));
            const diff = nowTimeValue - startTimeValue;
            const fixCountDownValue = countDownValue - (diff + 1);
            setHour(h => Math.floor(fixCountDownValue / 3600));
            setMinute(m => Math.floor((fixCountDownValue % 3600) / 60));
            setSecond(s => ((fixCountDownValue % 3600) % 60));
            if (hour == 0 && minute == 1 && second == 1) {
                play();
            }
        }

    }


    // 描画されるとカウントダウン関数を実行する
    useEffect(() => {
        callbackRef.current = countDown;
    }, [countDown])

    return (
        <div>{/* 遠征のドロップダウン用 */}
            <div ref={dropdownRef} className="relative inline-block text-left">
                {!timerOpen && (
                    <span className="rounded-md shadow-sm">
                        <button onClick={() => setIsOpen(!isOpen)} type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150" id="options-menu" aria-haspopup="true" aria-expanded={isOpen}>
                            遠征を選んでください
                        </button>
                    </span>
                )}

                {isOpen && (
                    <div>
                        <ul className="enseiArea">
                            {/* 鎮守府近海 */}
                            <li className="enseiAreaElem"><p onClick={() => setChinjufuOpen(!chinjufuOpen)}>☆鎮守府近海</p></li>
                            {chinjufuOpen && (
                                <div className="enseiListDiv">
                                    <ul className="enseiList">
                                        {Enseiproperties.map((value, key) => {
                                            if (key <= 13) {
                                                return (
                                                    <li key={key}
                                                        className="ensei" onClick={
                                                            () => onClicklistElem(key)
                                                        }>{value.place}</li>
                                                )
                                            }
                                        })}
                                    </ul>
                                </div>
                            )}

                            {/* 南西諸島海域 */}
                            <li className="enseiAreaElem"><p onClick={() => setNanseisyotouOpen(!nanseisyotouOpen)}>☆南西諸島海域</p></li>
                            {nanseisyotouOpen && (
                                <div className="enseiListDiv">
                                    <ul className="enseiList">
                                        {Enseiproperties.map((value, key) => {
                                            if (14 <= key && key <= 27) {
                                                return (
                                                    <li key={key}
                                                        className="ensei" onClick={
                                                            () => onClicklistElem(key)
                                                        }>{value.place}</li>
                                                )
                                            }
                                        })}
                                    </ul>
                                </div>
                            )}

                            {/* 北方海域 */}
                            <li className="enseiAreaElem"><p onClick={() => setHoppouOpen(!hoppouOpen)}>☆北方海域</p></li>
                            {hoppouOpen && (
                                <div className="enseiListDiv">
                                    <ul className="enseiList">
                                        {Enseiproperties.map((value, key) => {
                                            if (28 <= key && key <= 35) {
                                                return (
                                                    <li key={key}
                                                        className="ensei" onClick={
                                                            () => onClicklistElem(key)
                                                        }>{value.place}</li>
                                                )
                                            }
                                        })}
                                    </ul>
                                </div>
                            )}

                            {/* 南西海域 */}
                            <li className="enseiAreaElem"><p onClick={() => setNanseiOpen(!nanseiOpen)}>☆南西海域</p></li>
                            {nanseiOpen && (
                                <div className="enseiListDiv">
                                    <ul className="enseiList">
                                        {Enseiproperties.map((value, key) => {
                                            if (36 <= key && key <= 41) {
                                                return (
                                                    <li key={key}
                                                        className="ensei" onClick={
                                                            () => onClicklistElem(key)
                                                        }>{value.place}</li>
                                                )
                                            }
                                        })}
                                    </ul>
                                </div>
                            )}

                            {/* 西方海域 */}
                            <li className="enseiAreaElem"><p onClick={() => setSeihouOpen(!seihouOpen)}>☆西方海域</p></li>
                            {seihouOpen && (
                                <div className="enseiListDiv">
                                    <ul className="enseiList">
                                        {Enseiproperties.map((value, key) => {
                                            if (42 <= key && key <= 52) {
                                                return (
                                                    <li key={key}
                                                        className="ensei" onClick={
                                                            () => onClicklistElem(key)
                                                        }>{value.place}</li>
                                                )
                                            }
                                        })}
                                    </ul>
                                </div>
                            )}

                            {/* 南方海域 */}
                            <li className="enseiAreaElem"><p onClick={() => setNanpouOpen(!nanpouOpen)}>☆南方海域</p></li>
                            {nanpouOpen && (
                                <div className="enseiListDiv">
                                    <ul className="enseiList">
                                        {Enseiproperties.map((value, key) => {
                                            if (53 <= key && key <= 60) {
                                                return (
                                                    <li key={key}
                                                        className="ensei" onClick={
                                                            () => onClicklistElem(key)
                                                        }>{value.place}</li>
                                                )
                                            }
                                        })}
                                    </ul>
                                </div>
                            )}
                        </ul>
                    </div>
                )}
            </div>

            {finishText && (
                <div>
                    <p id="finishText">{enseiPlace}終了！</p>
                </div>
            )}

            <div className='form' id="timerList">
                {!timerOpen && (
                    <div>
                        <p id="enseiplace">{enseiPlace}</p>
                        <input size='1' value={hour}
                            onChange={(event) => setHour(event.target.value)} />時間
                        <input size='1' value={minute}
                            onChange={(event) => setMinute(event.target.value)} />分
                        <input size='1' value={second}
                            onChange={(event) => setSecond(event.target.value)} />秒
                    </div>
                )}

                {timerOpen && (
                    <div>
                        {!finishText && (
                            <p id="enseiplace">{enseiPlace}</p>
                        )}
                        <p id="timer">{hour}時間{minute}分{second}秒</p>
                    </div>
                )
                }
            </div>
            <button id="btn" type="button" onClick={() => { changeText(); operateTimer(); }}>{buttonText}</button>
            <button className="risetbtn" type="button" onClick={() => {setEnseiPlace(""); setHour(0); setMinute(0); setSecond(0)}}>リセット</button>
        </div>
    );

}

export default App;