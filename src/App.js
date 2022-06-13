import React, { useState } from 'react';



const App = () => {
    return(<>
    <Counter value={3} onClick={() => console.log("hello")}/>
    <Counter value={30}/>
    </>)
}


export function Counter(props)
{
    /*constructor(props)
    {
        super(props);
        this.state = {
            value : 0
        }
    }*/

    const [value,setValue]=useState(props.value)

    // インクリメントする関数
    const onIncrement = () => {
        //setStateでstateの値を更新します
        //this.setState({ value: this.state.value + 1 });
        setValue(value+1)
    }


    // デクリメントする関数
    const onDecrement = () => {
        //setStateでstateの値を更新します
        //this.setState({ value: this.state.value - 1 });
        setValue(value-1)
    }



    
        return (
            <div>
                <div onClick={() => props.onClick}>
                    カウント値:{value}

                </div>
                <div>
                    <button type="button" onClick={onIncrement}>+</button>
                    <button type="button" onClick={onDecrement}>-</button>
                </div>
            </div>
        );
    
}
export default App;