import { hot } from 'react-hot-loader/root';
import React from 'react';
import { HelloWorld } from '../components/HelloWorld';

const App: React.FC = () => {

    return (
        <>
            <HelloWorld firstName="Bailey" lastName="Spell" />	  
        </>
    );
}

export default hot(App);
