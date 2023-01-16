import logo from './logo.svg';
import './App.css';
import {Hello} from "./components/Hello";
import {Button, Space} from "antd";

import {
    HomeOutlined,
    LoadingOutlined,
    SettingFilled,
    SmileOutlined,
    SyncOutlined,
} from '@ant-design/icons';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
            <Hello/>
            <Space>
                <HomeOutlined/>
                <SettingFilled/>
                <SmileOutlined/>
                <SyncOutlined spin/>
                <SmileOutlined rotate={180}/>
                <LoadingOutlined/>
                <Button type="link">Link Button</Button>
                <Button type="primary">Primary Button</Button>
            </Space>
        </div>
    );
}

export default App;
