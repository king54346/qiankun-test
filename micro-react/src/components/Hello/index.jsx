import React, {Component, useEffect, useId, useState, useTransition} from "react";
import hello from './index.module.scss';
import {Spin} from "antd";
export function Hello() {
    const [count, setCount] = useState(0);
    // 函数组件中使用生命周期hook，相当于componentDidMount和componentDidUpdate
    //第二个参数是一个数组，数组中的值发生变化时，才会执行useEffect中的函数，如果不传第二个参数，那么每次render都会执行useEffect中的函数
    //如果传入空数组，那么useEffect中的函数只会在第一次render时执行
    //effect函数中可以返回一个函数()=>{}，这个函数会在组件卸载时执行
    useEffect(() => {
        console.log('useEffect');
    })
    //  React.useRef() <input ref={inputRef} /> 获取ref数据 inputRef.current.value

    // useTransition 用于在渲染之间创建一个过渡，以便在渲染之间暂停更新
    //提高更重要的组件的提前渲染 ,包裹计算量大的逻辑来降低优先级
    //useDeferredValue 在紧急渲染完成后渲染新的值。
    const [isPending, startTransition] = useTransition();

    // const MyContext=React.createContext(defaultValue) 用于跨组件传递数据
    // <MyContext.provider value='' ><component></MyContext.provider>定义在顶层组件中，子组件中获取
    //component中使用const value = useContext(MyContext);


    //useReducer 用于管理复杂的state
    // const [state, dispatch] = useReducer(reducer, initialArg, init);
    // function reducer(state, action) {
    //     switch (action.type) {
    //         case 'increment':
    //             return {count: state.count + 1};
    //         case 'decrement':
    //             return {count: state.count - 1};
    // }
    // function init(initialArg) {
    //     return {count: initialArg};
    // }
    // dispatch({type: 'increment', payload: 'foo'(init函数中的参数)});

    //useCallback 用于缓存函数 传入一个函数和一个数组，数组中的值发生变化时，才会重新执行doSomething函数
    // 减少子组件的渲染次数，子组件中的定义的函数不会频繁的被定义
    // const memoizedCallback = useCallback(
    //     () => {
    //         doSomething(a, b);
    //     },
    //     [a, b],
    // );
    //<button onClick={memoizedCallback}>Click me</button>
    //父组件更新时，子组件不会重新渲染，子组件中的函数也不会重新定义
    //React.memo(function MyComponent(props) {}); 用于缓存组件，只有props发生变化时，才会重新渲染组件
    //useCallback传给子组件的函数，子组件中使用React.memo包裹，可以减少子组件的渲染次数

    //useMemo 用于缓存数据相当于compute函数 const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
    //第一个参数是用于处理耗时计算并返回需要记录的值，第二个参数是一个数组，数组中的值发生变化时，才会重新执行第一个参数中的函数
    // 函数可以返回dom结构，也可以返回一个value

    function handleClick() {
        startTransition(() => {
            setCount(c => c + 1);
        })
    }

    return (
        <div>
            <h1 className={hello.title}>Hello World</h1>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(value => {
                return value + 1
            })}>
                Click me
            </button>
            <div>
                {isPending && <Spin/>}
                <button onClick={handleClick}>{count}</button>
            </div>
        </div>
    )

}
