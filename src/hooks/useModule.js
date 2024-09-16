import { useState, useEffect } from 'react';

const useModule = (scriptUrl, globalVariableName) => {
    const [module, setModule] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadScript = async () => {
            try {
                if (window[globalVariableName]) {
                    setModule(window[globalVariableName]);
                    return;
                }

                const script = document.createElement('script');
                script.src = scriptUrl;
                script.async = true;

                script.onload = () => {
                    if (window[globalVariableName]) {
                        setModule(window[globalVariableName]);
                    } else {
                        throw new Error(`Global variable "${globalVariableName}" not found`);
                    }
                };

                script.onerror = () => {
                    throw new Error('Failed to load script');
                };

                document.body.appendChild(script);
            } catch (err) {
                setError(err);
            }
        };

        loadScript();
    }, [scriptUrl, globalVariableName, module]);

    return { module, error };
};

export default useModule;