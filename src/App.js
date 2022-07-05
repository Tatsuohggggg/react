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
                                    <Counter />
                                </p>

                                <p className='Counter' id='secondnyukyoCounter'>
                                    <Counter />
                                </p>

                                <p className='Counter' id='thirdnyukyoCounter'>
                                    <Counter />
                                </p>

                                <p className='Counter' id='fourthnyukyoCounter'>
                                    <Counter />
                                </p>
                            </div>
                        </div>

                        <div id="kenzouTitle">建造</div>
                        <div id="kenzouCounter">
                            <div>
                                <p className='Counter' id='firstkenzouCounter'>
                                    <Counter />
                                </p>

                                <p className='Counter' id='secondkenzouCounter'>
                                    <Counter />
                                </p>

                                <p className='Counter' id='thirdkenzouCounter'>
                                    <Counter />
                                </p>

                                <p className='Counter' id='fourthkenzouCounter'>
                                    <Counter />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export function Counter() {
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

    const nextTiming = () => 1000 - Date.now() % 1000;

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
        <div>
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
                        <p id="timer">{hour}時間{minute}分{second}秒</p>
                    </div>
                )
                }
            </div>
            <button id="btn" type="button" onClick={() => { changeText(); operateTimer(); }}>{buttonText}</button>
        </div>
    )
}





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
    const [play] = useSound(Sound);

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
                            <li className="enseiAreaElem"><p onClick={() => setChinjufuOpen(!chinjufuOpen)}>☆鎮守府近海</p></li>
                            {chinjufuOpen && (
                                <div className="enseiListDiv">
                                    <ul className="enseiList">
                                        <li><p id="ensei1" onClick={() => onClicklistElem(0)}>練習航海</p></li>
                                        <li><p id="ensei2" onClick={() => onClicklistElem(1)}>長距離練習航海</p></li>
                                        <li><p id="ensei3" onClick={() => onClicklistElem(2)}>警備任務</p></li>
                                        <li><p id="ensei4" onClick={() => onClicklistElem(3)}>対潜警戒任務</p></li>
                                        <li><p id="ensei5" onClick={() => onClicklistElem(4)}>海上護衛任務</p></li>
                                        <li><p id="ensei6" onClick={() => onClicklistElem(5)}>防空射撃任務</p></li>
                                        <li><p id="ensei7" onClick={() => onClicklistElem(6)}>観艦式予行</p></li>
                                        <li><p id="ensei8" onClick={() => onClicklistElem(7)}>観艦式</p></li>
                                        <li><p id="enseia1" onClick={() => onClicklistElem(8)}>兵站強化任務</p></li>
                                        <li><p id="enseia2" onClick={() => onClicklistElem(9)}>海峡警備行動</p></li>
                                        <li><p id="enseia3" onClick={() => onClicklistElem(10)}>長時間対潜警戒</p></li>
                                        <li><p id="enseia4" onClick={() => onClicklistElem(11)}>南西方面連絡線哨戒</p></li>
                                        <li><p id="enseia5" onClick={() => onClicklistElem(12)}>小笠原沖哨戒線</p></li>
                                        <li><p id="enseia6" onClick={() => onClicklistElem(13)}>小笠原沖戦闘哨戒</p></li>
                                    </ul>
                                </div>
                            )}


                            <li className="enseiAreaElem"><p onClick={() => setNanseisyotouOpen(!nanseisyotouOpen)}>☆南西諸島海域</p></li>
                            {nanseisyotouOpen && (
                                <div className="enseiListDiv">
                                    <ul className="enseiList">
                                        <li><p id="ensei9" onClick={() => onClicklistElem(14)}>タンカー護衛任務</p></li>
                                        <li><p id="ensei10" onClick={() => onClicklistElem(15)}>強行偵察任務</p></li>
                                        <li><p id="ensei11" onClick={() => onClicklistElem(16)}>ボーキサイト輸送任務</p></li>
                                        <li><p id="ensei12" onClick={() => onClicklistElem(17)}>資源輸送任務</p></li>
                                        <li><p id="ensei13" onClick={() => onClicklistElem(18)}>鼠輸送作戦</p></li>
                                        <li><p id="ensei14" onClick={() => onClicklistElem(19)}>包囲陸戦隊撤収作戦</p></li>
                                        <li><p id="ensei15" onClick={() => onClicklistElem(20)}>囮機動部隊支援作戦</p></li>
                                        <li><p id="ensei16" onClick={() => onClicklistElem(21)}>艦隊決戦援護作戦</p></li>
                                        <li><p id="enseib1" onClick={() => onClicklistElem(22)}>南西方面航空偵察作戦</p></li>
                                        <li><p id="enseib2" onClick={() => onClicklistElem(23)}>敵泊地強襲反撃作戦</p></li>
                                        <li><p id="enseib3" onClick={() => onClicklistElem(24)}>南西諸島離島哨戒作戦</p></li>
                                        <li><p id="enseib4" onClick={() => onClicklistElem(25)}>南西諸島離島防衛作戦</p></li>
                                        <li><p id="enseib5" onClick={() => onClicklistElem(26)}>南西諸島捜索撃滅戦</p></li>
                                        <li><p id="enseib6" onClick={() => onClicklistElem(27)}>精鋭水雷戦隊夜襲</p></li>
                                    </ul>
                                </div>
                            )}

                            <li className="enseiAreaElem"><p onClick={() => setHoppouOpen(!hoppouOpen)}>☆北方海域</p></li>
                            {hoppouOpen && (
                                <div className="enseiListDiv">
                                    <ul className="enseiList">
                                        <li><p id="ensei17" onClick={() => onClicklistElem(28)}>敵地偵察作戦</p></li>
                                        <li><p id="ensei18" onClick={() => onClicklistElem(29)}>航空機輸送作戦</p></li>
                                        <li><p id="ensei19" onClick={() => onClicklistElem(30)}>北号作戦</p></li>
                                        <li><p id="ensei20" onClick={() => onClicklistElem(31)}>潜水艦哨戒任務</p></li>
                                        <li><p id="ensei21" onClick={() => onClicklistElem(32)}>北方鼠輸送作戦</p></li>
                                        <li><p id="ensei22" onClick={() => onClicklistElem(33)}>艦隊演習</p></li>
                                        <li><p id="ensei23" onClick={() => onClicklistElem(34)}>航空戦艦運用演習</p></li>
                                        <li><p id="ensei24" onClick={() => onClicklistElem(35)}>北方航路海上護衛</p></li>
                                    </ul>
                                </div>
                            )}

                            <li className="enseiAreaElem"><p onClick={() => setNanseiOpen(!nanseiOpen)}>☆南西海域</p></li>
                            {nanseiOpen && (
                                <div className="enseiListDiv">
                                    <ul className="enseiList">
                                        <li><p id="ensei41" onClick={() => onClicklistElem(36)}>ブルネイ泊地沖哨戒</p></li>
                                        <li><p id="ensei42" onClick={() => onClicklistElem(37)}>ミ船団護衛{'('}一号船団{')'}</p></li>
                                        <li><p id="ensei43" onClick={() => onClicklistElem(38)}>ミ船団護衛{'('}二号船団{')'}</p></li>
                                        <li><p id="ensei44" onClick={() => onClicklistElem(39)}>航空装備輸送任務</p></li>
                                        <li><p id="ensei45" onClick={() => onClicklistElem(40)}>ボーキサイト船団護衛</p></li>
                                        <li><p id="ensei46" onClick={() => onClicklistElem(41)}>南西海域戦闘哨戒</p></li>
                                    </ul>
                                </div>
                            )}

                            <li className="enseiAreaElem"><p onClick={() => setSeihouOpen(!seihouOpen)}>☆西方海域</p></li>
                            {seihouOpen && (
                                <div className="enseiListDiv">
                                    <ul className="enseiList">
                                        <li><p id="ensei25" onClick={() => onClicklistElem(42)}>通商破壊作戦</p></li>
                                        <li><p id="ensei26" onClick={() => onClicklistElem(43)}>敵母港空襲作戦</p></li>
                                        <li><p id="ensei27" onClick={() => onClicklistElem(44)}>潜水艦通商破壊作戦</p></li>
                                        <li><p id="ensei28" onClick={() => onClicklistElem(45)}>西方海域封鎖作戦</p></li>
                                        <li><p id="ensei29" onClick={() => onClicklistElem(46)}>潜水艦派遣演習</p></li>
                                        <li><p id="ensei30" onClick={() => onClicklistElem(47)}>潜水艦派遣作戦</p></li>
                                        <li><p id="ensei31" onClick={() => onClicklistElem(48)}>海外艦との接触</p></li>
                                        <li><p id="ensei32" onClick={() => onClicklistElem(49)}>遠洋練習航海</p></li>
                                        <li><p id="enseid1" onClick={() => onClicklistElem(50)}>西方海域偵察作戦</p></li>
                                        <li><p id="enseid2" onClick={() => onClicklistElem(51)}>西方潜水艦作戦</p></li>
                                        <li><p id="enseid3" onClick={() => onClicklistElem(52)}>欧州方面友軍との接触</p></li>
                                    </ul>
                                </div>
                            )}

                            <li className="enseiAreaElem"><p onClick={() => setNanpouOpen(!nanpouOpen)}>☆南方海域</p></li>
                            {nanpouOpen && (
                                <div className="enseiListDiv">
                                    <ul className="enseiList">
                                        {/* 33,34は支援任務の為欠番 */}
                                        <li><p id="ensei35" onClick={() => onClicklistElem(53)}>MO作戦</p></li>
                                        <li><p id="ensei36" onClick={() => onClicklistElem(54)}>水上機基地建設</p></li>
                                        <li><p id="ensei37" onClick={() => onClicklistElem(55)}>東京急行</p></li>
                                        <li><p id="ensei38" onClick={() => onClicklistElem(56)}>東京急行{"("}弐{")"}</p></li>
                                        <li><p id="ensei39" onClick={() => onClicklistElem(57)}>遠洋潜水艦作戦</p></li>
                                        <li><p id="ensei40" onClick={() => onClicklistElem(58)}>水上機前線輸送</p></li>
                                        <li><p id="enseie1" onClick={() => onClicklistElem(59)}>ラバウル方面艦隊進出</p></li>
                                        <li><p id="enseie2" onClick={() => onClicklistElem(60)}>強行鼠作戦</p></li>
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
        </div>
    );

}

export default App;