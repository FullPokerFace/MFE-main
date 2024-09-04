import React, { useState, useEffect } from 'react';

const App = () => {
    const [UMDComponent, setUMDComponent] = useState(null);

    useEffect(() => {
        const loadComponent = async () => {
            try {
                // Load the script
                const script = document.createElement('script');
                // script.src = 'https://fullpokerface.github.io/MFE-component/index.js';
                script.src = 'http://localhost:3001/index.js';

                script.async = true;

                // Wait for the script to load
                await new Promise((resolve, reject) => {
                    script.onload = resolve;
                    script.onerror = reject;
                    document.body.appendChild(script);
                });

                // Access the loaded component
                const loadedComponent = window.ReactWebpackModule.App;
                setUMDComponent(() => loadedComponent);
            } catch (error) {
                console.error('Failed to load UMD component:', error);
            }
        };

        loadComponent();
    }, []);

    return (
        <div>
            {UMDComponent ? <UMDComponent /> : <p>Loading button...</p>}
        </div>
    );
};

export default App;