import React, {Component} from "react";
import home from './index.module.css';
import {} from "react-router-dom";
/**
 * lazyLoad
 * 路由组件的懒加载
 *  react中的lazy函数
 *  const xxx= lazy(()=>import('xxx'))
 *
 *  <Suspense fallback={<div>loading</div>}>
 *  <Route path="/xxx" component={xxx}/>
 *  </Suspense>
 */
//路由组件
export class Home extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        count: 0
    }

    render() {
        console.log(this.props);//{history: {…}, location: {…}, match: {…}, staticContext: undefined}
        return <h1 className={home.title}>Hello World</h1>;
    }
}
