import React, { useEffect } from 'react';
import useModule from '../hooks/useModule'

const App = () => {
    const scriptUrl = '/wallet-ui.js';
    const { module, error } = useModule(scriptUrl, 'walletUI');


    if (error) {
        return <div>Error loading wallet UI: {error.message}</div>;
    }

    if (!module) {
        return <div>Loading...</div>;
    }

    const { COMPANY, App, increment } = module.default;



    return (
        <div>
            <h1>Main Application</h1>
            <h1>Wallet-UI resources</h1>
            <p>const COMPANY= {COMPANY}</p>
            <p>App:</p>
            {App && <App />}
            {/* {WrappedApp && <WrappedApp />}  // This will render the App with the Provider */}
            {/* <button onClick={increment}>Increment (from Wallet UI)</button> */}
        </div>
    );
};

export default App;