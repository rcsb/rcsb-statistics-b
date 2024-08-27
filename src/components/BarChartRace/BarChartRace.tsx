import React, { useEffect } from 'react';
import styled from 'styled-components';

const Heading = styled.h4`
    margin-top: 60px;
`;

const FlourishEmbed: React.FC = () => {
    useEffect(() => {
        const scriptId = 'flourish-embed-script';
        
        // Remove the script if it already exists
        const existingScript = document.getElementById(scriptId);
        if (existingScript) {
            existingScript.remove();
        }

        // Create and append a new script
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = "https://public.flourish.studio/resources/embed.js";
        script.async = true;
        document.body.appendChild(script);

        // Clean up on unmount
        return () => {
            if (script.parentElement) {
                script.parentElement.removeChild(script);
            }
        };
    }, []);

    return (
        <>
            <Heading>(INTERACTIVE) X-ray Leads the way, but other methods are emerging.</Heading>
            <div className="flourish-embed flourish-bar-chart-race" data-src="visualisation/19191628">
                <noscript>
                    <img src="https://public.flourish.studio/visualisation/19191628/thumbnail" width="100%" alt="bar-chart-race visualization" />
                </noscript>
            </div>
        </>
    );
};

export default FlourishEmbed;
