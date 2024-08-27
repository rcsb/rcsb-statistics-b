import React, { useEffect } from 'react';
import styled from 'styled-components';

const Heading = styled.h3`
    margin-top: 70px;
    font-size: 1.9rem;
    font-weight: bold;
    padding-left: 22px;
`;

interface BarChartRaceProps {
    plotname: string;
}

const BarChartRace: React.FC<BarChartRaceProps> = ({ plotname }) => {
    useEffect(() => {
        const scriptId = 'flourish-embed-script';

        const existingScript = document.getElementById(scriptId);
        if (existingScript) {
            existingScript.remove();
        }

        const script = document.createElement('script');
        script.id = scriptId;
        script.src = "https://public.flourish.studio/resources/embed.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            if (script.parentElement) {
                script.parentElement.removeChild(script);
            }
        };
    }, [plotname]);

    const getVisualizationId = () => {
        switch (plotname) {
            case 'experimental-method':
                return '19199781';
            case 'molecular-composition': 
                return '19199538';
            default:
                return 'default-visualisation-id'; // Optional default case
        }
    };

    const headingText = plotname === 'experimental-method'
        ? '(ANIMATION) X-ray Leads the way, but other methods are emerging.'
        : plotname === 'molecular-composition'
        ? '(ANIMATION) Molecular Composition in PDB Entries'
        : 'Default Heading for Other Plots';

    return (
        <>
            <Heading>{headingText}</Heading>
            <div className={`flourish-embed flourish-bar-chart-race`} data-src={`visualisation/${getVisualizationId()}`}>
                <noscript>
                    <img src={`https://public.flourish.studio/visualisation/${getVisualizationId()}/thumbnail`} width="100%" alt="bar-chart-race visualization" />
                </noscript>
            </div>
        </>
    );
};

export default BarChartRace;

