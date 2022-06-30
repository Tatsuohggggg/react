import React, { useEffect, useState, useRef } from 'react';


const App = () => {
    return <>
    <div id="sidebar">
        <p>サイドバー</p>
    </div>
        <div id="content">
            <div id="enseiTitle">遠征</div>
            <div id="enseiCounter">
                <div>
                    <p>
                        <EnseiCounter />
                    </p>

                    <p>
                        <EnseiCounter />
                    </p>

                    <p>
                        <EnseiCounter />
                    </p>
                </div>
            </div>

            <div id="nyukyoTitle">入渠</div>
            <div id="nyukyoCounter">
                <div>
                    <p>
                        <Counter />
                    </p>

                    <p>
                        <Counter />
                    </p>

                    <p>
                        <Counter />
                    </p>

                    <p>
                        <Counter />
                    </p>
                </div>
            </div>

            <div id="kenzouTitle">建造</div>
            <div id="kenzouCounter">
                <div>
                    <p>
                        <Counter />
                    </p>

                    <p>
                        <Counter />
                    </p>

                    <p>
                        <Counter />
                    </p>

                    <p>
                        <Counter />
                    </p>
                </div>
            </div>
        </div>
    </>
}

export function Counter() {

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

    const dropdownRef = useRef();

    // ボタンを押下した際に表示されている文字を変更する
    const changeText = () => {
        if (buttonText == "スタート") {
            settimerOpen(!timerOpen);
            setButtonText("ストップ");
        } else {
            settimerOpen(!timerOpen);
            setButtonText("スタート");
        }
    }

    const nextTiming = () => 1000 - Date.now() % 1000;

    // ボタンを押下した際にタイマーを動かしたり止めたりする
    const operateTimer = () => {
        if (buttonText == "スタート") {
            const intervalId = setTimeout(countDown(intervalId),nextTiming);
            setId(intervalId);
        } else {
            clearTimeout(id);
        }
    }

    // カウントダウン用
    const countDown = (id) => {
        console.log(countMax);
        console.log("呼ばれた回数");
        setCount(c => c + 1);
        if (countMax == 0) {
            setCountMax(c => hour * 3600 + minute * 60 + second);
        }
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
            settimerOpen(!timerOpen);
        }
        const intervalId = setTimeout(countDown(), nextTiming);
    }

    // 描画されるとカウントダウン関数を実行する
    useEffect(() => {
        callbackRef.current = countDown;
    }, [countDown])

    return (
        <div>
            <div className='form' id="timerList">
                {!timerOpen && (
                    <div>
                        <input value={hour}
                            onChange={(event) => setHour(event.target.value)} />時間
                        <input value={minute}
                            onChange={(event) => setMinute(event.target.value)} />分
                        <input value={second}
                            onChange={(event) => setSecond(event.target.value)} />秒
                    </div>
                )}

                {timerOpen && (
                    <div>
                        <p id="timer">{hour}時間{minute}分{second}秒</p>
                    </div>
                )
                }
            </div>
            <button id="btn" type="button" onClick={() => { changeText(); operateTimer(); }}>{buttonText}</button>
        </div>
    )
}

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
    const dropdownRef = useRef();

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
        switch (place) {
            // 鎮守府近海海域
            case 1:
                setMinute(15);
                break;
            case 2:
                setMinute(30);
                break;
            case 3:
                setMinute(20);
                break;
            case 4:
                setMinute(50);
                break;
            case 5:
                setHour(1);
                setMinute(30);
                break;
            case 6:
                setMinute(40);
                break;
            case 7:
                setHour(1);
                break;
            case 8:
                setHour(3);
                break;
            case "a1":
                setMinute(25);
                break;
            case "a2":
                setMinute(55);
                break;
            case "a3":
                setHour(2);
                setMinute(15);
                break;
            case "a4":
                setHour(1);
                setMinute(50);
                break;
            case "a5":
                setHour(3);
                break;
            case "a6":
                setHour(3);
                setMinute(30);
                break;

            // 南西諸島海域
            case 9:
                setHour(4);
                break;
            case 10:
                setHour(1);
                setMinute(30);
                break;
            case 11:
                setHour(5);
                break;
            case 12:
                setHour(8);
                break;
            case 13:
                setHour(4);
                break;
            case 14:
                setHour(6);
                break;
            case 15:
                setHour(12);
                break;
            case 16:
                setHour(15);
                break;
            case "b1":
                setMinute(35);
                break;
            case "b2":
                setHour(8);
                setMinute(40);
                break;
            case "b3":
                setHour(2);
                setMinute(50);
                break;
            case "b4":
                setHour(4);
                setMinute(30);
                break;
            case "b5":
                setHour(6);
                setMinute(30);
                break;
            case "b6":
                setHour(5);
                setMinute(50);
                break;

            // 北方海域
            case 17:
                setHour(45);
                break;
            case 18:
                setHour(5);
                break;
            case 19:
                setHour(6);
                break;
            case 20:
                setHour(2);
                break;
            case 21:
                setHour(2);
                setMinute(20);
                break;
            case 22:
                setHour(3);
                break;
            case 23:
                setHour(4);
                break;
            case 24:
                setHour(8);
                setMinute(20);
                break;

            // 西方海域
            case 25:
                setHour(40);
                break;
            case 26:
                setHour(80);
                break;
            case 27:
                setHour(20);
                break;
            case 28:
                setHour(25);
                break;
            case 29:
                setHour(24);
                break;
            case 30:
                setHour(48);
                break;
            case 31:
                setHour(2);
                break;
            case 32:
                setHour(24);
                break;
            case "d1":
                setHour(2);
                break;
            case "d2":
                setHour(10);
                break;
            case "d3":
                setHour(12);
                break;

            // 南方海域
            case 35:
                setHour(7);
                break;
            case 36:
                setHour(9);
                break;
            case 37:
                setHour(2);
                setMinute(45);
                break;
            case 38:
                setHour(2);
                setMinute(55);
                break;
            case 39:
                setHour(30);
                break;
            case 40:
                setHour(40);
                break;
            case "e1":
                setHour(7);
                setMinute(30);
                break;
            case "e2":
                setHour(3);
                setMinute(5);
                break;

            // 南西海域
            case 41:
                setHour(1);
                break;
            case 42:
                setHour(8);
                break;
            case 43:
                setHour(12);
                break;
            case 44:
                setHour(10);
                break;
            case 45:
                setHour(3);
                setMinute(20);
                break;
            case 46:
                setHour(3);
                setMinute(20);
                break;

            default:
                setHour(0);
                setMinute(0);
                setSecond(0);
        }
        if (1 <= place >= 8 || place == "a1" || place == "a2" || place == "a3" || place == "a4" || place == "a5" || place == "a6") {
            setChinjufuOpen(!chinjufuOpen);
        }
        else if (9 <= place >= 16 || place == "b1" || place == "b2" || place == "b3" || place == "b4" || place == "b5" || place == "b6") {
            setNanseisyotouOpen(!nanseisyotouOpen);
        }
        else if (17 <= place >= 24) {
            setHoppouOpen(!hoppouOpen);
        }
        else if (25 <= place >= 32 || place == "d1" || place == "d2" || place == "d3") {
            setSeihouOpen(!seihouOpen);
        }
        else if (33 <= place >= 40 || place == "e1" || place == "e2") {
            setNanpouOpen(!nanpouOpen);
        }

        setIsOpen(!isOpen);
    }

    // ボタンを押下した際に表示されている文字を変更する
    const changeText = () => {
        if (buttonText == "スタート") {
            settimerOpen(!timerOpen);
            setButtonText("ストップ");
        } else {
            settimerOpen(!timerOpen);
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
        console.log(countMax);
        console.log("呼ばれた回数");
        setCount(c => c + 1);
        if (countMax == 0) {
            setCountMax(c => hour * 3600 + minute * 60 + second);
        }
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
            settimerOpen(!timerOpen);
        }
    }

    const timer = () => {

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
                        <ul id="enseiArea">
                            <li id="enseiAreaElem"><p onClick={() => setChinjufuOpen(!chinjufuOpen)}>☆鎮守府近海</p></li>
                            {chinjufuOpen && (
                                <div id="enseiListDiv">
                                    <ul id="enseiList">
                                        <li><p id="ensei" onClick={() => onClicklistElem(1)}>練習航海</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem(2)}>長距離練習航海</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem(3)}>警備任務</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem(4)}>対潜警戒任務</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem(5)}>海上護衛任務</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem(6)}>防空射撃任務</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem(7)}>観艦式予行</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem(8)}>観艦式</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem("a1")}>兵站強化任務</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem("a2")}>海峡警備行動</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem("a3")}>長時間対潜警戒</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem("a4")}>南西方面連絡線哨戒</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem("a5")}>小笠原沖哨戒線</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem("a6")}>小笠原沖戦闘哨戒</p></li>
                                    </ul>
                                </div>
                            )}


                            <li id="enseiAreaElem"><p onClick={() => setChinjufuOpen(!nanseisyotouOpen)}>☆南西諸島海域</p></li>
                            {nanseisyotouOpen && (
                                <div id="enseiListDiv">
                                    <ul id="enseiList">
                                        <li><p id="ensei" onClick={() => onClicklistElem(9)}>タンカー護衛任務</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem(10)}>強行偵察任務</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem(11)}>ボーキサイト輸送任務</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem(12)}>資源輸送任務</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem(13)}>鼠輸送作戦</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem(14)}>包囲陸戦隊撤収作戦</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem(15)}>囮機動部隊支援作戦</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem(16)}>艦隊決戦援護作戦</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem("b1")}>南西方面航空偵察作戦</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem("b2")}>敵泊地強襲反撃作戦</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem("b3")}>南西諸島離島哨戒作戦</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem("b4")}>南西諸島離島防衛作戦</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem("b5")}>南西諸島捜索撃滅戦</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem("b6")}>精鋭水雷戦隊夜襲</p></li>
                                    </ul>
                                </div>
                            )}

                            <li id="enseiAreaElem"><p onClick={() => setChinjufuOpen(!hoppouOpen)}>☆北方海域</p></li>
                            {hoppouOpen && (
                                <div id="enseiListDiv">
                                    <ul id="enseiList">
                                        <li><p id="ensei" onClick={() => onClicklistElem(17)}>敵地偵察作戦</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem(18)}>航空機輸送作戦</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem(19)}>北号作戦</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem(20)}>潜水艦哨戒任務</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem(21)}>北方鼠輸送作戦</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem(22)}>艦隊演習</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem(23)}>航空戦艦運用演習</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem(24)}>北方航路海上護衛</p></li>
                                    </ul>
                                </div>
                            )}

                            <li id="enseiAreaElem"><p onClick={() => setChinjufuOpen(!nanseiOpen)}>☆南西海域</p></li>
                            {nanseiOpen && (
                                <div id="enseiListDiv">
                                    <ul id="enseiList">
                                        <li><p id="ensei" onClick={() => onClicklistElem(41)}>ブルネイ泊地沖哨戒</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem(42)}>ミ船団護衛{'('}一号船団{')'}</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem(43)}>ミ船団護衛{'('}二号船団{')'}</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem(44)}>航空装備輸送任務</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem(45)}>ボーキサイト船団護衛</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem(46)}>南西海域戦闘哨戒</p></li>
                                    </ul>
                                </div>
                            )}

                            <li id="enseiAreaElem"><p onClick={() => setChinjufuOpen(!seihouOpen)}>☆西方海域</p></li>
                            {seihouOpen && (
                                <div id="enseiListDiv">
                                    <ul id="enseiList">
                                        <li><p id="ensei" onClick={() => onClicklistElem(25)}>通商破壊作戦</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem(26)}>敵母港空襲作戦</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem(27)}>潜水艦通商破壊作戦</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem(28)}>西方海域封鎖作戦</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem(29)}>潜水艦派遣演習</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem(30)}>潜水艦派遣作戦</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem(31)}>海外艦との接触</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem(32)}>遠洋練習航海</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem("d1")}>西方海域偵察作戦</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem("d2")}>西方潜水艦作戦</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem("d3")}>欧州方面友軍との接触</p></li>
                                    </ul>
                                </div>
                            )}

                            <li id="enseiAreaElem"><p onClick={() => setChinjufuOpen(!nanpouOpen)}>☆南方海域</p></li>
                            {nanpouOpen && (
                                <div id="enseiListDiv">
                                    <ul id="enseiList">
                                        {/* 33,34は支援任務の為欠番 */}
                                        <li><p id="ensei" onClick={() => onClicklistElem(35)}>MO作戦</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem(36)}>水上機基地建設</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem(37)}>東京急行</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem(38)}>東京急行{"("}弐{")"}</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem(39)}>遠洋潜水艦作戦</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem(40)}>水上機前線輸送</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem("e1")}>ラバウル方面艦隊進出</p></li>
                                        <li><p id="ensei" onClick={() => onClicklistElem("e2")}>強行鼠作戦</p></li>
                                    </ul>
                                </div>
                            )}
                        </ul>
                    </div>
                )}
            </div>
            <div className='form' id="timerList">
                {!timerOpen && (
                    <div>
                        <input value={hour}
                            onChange={(event) => setHour(event.target.value)} />時間
                        <input value={minute}
                            onChange={(event) => setMinute(event.target.value)} />分
                        <input value={second}
                            onChange={(event) => setSecond(event.target.value)} />秒
                    </div>
                )}

                {timerOpen && (
                    <div>
                        <p id="timer">{hour}時間{minute}分{second}秒</p>
                    </div>
                )
                }
            </div>
            <button id="btn" type="button" onClick={() => { changeText(); operateTimer(); }}>{buttonText}</button>
        </div>
    );

}

export default App;