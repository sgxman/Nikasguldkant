import React from 'react';

interface NgkTitleSubtitleProps {
    title: string;
    subtitle: string;
    nineGridAlign?: 'topleft' | 'topcenter' | 'topright' | 'centerleft' | 'center' | 'centerright' | 'bottomleft' | 'bottomcenter' | 'bottomright';
}


const NgkTitleSubtitle: React.FC<NgkTitleSubtitleProps> = ({ title, subtitle, nineGridAlign = 'bottomright' }) => {

    let calculatedClass = calculateClassBasedOnNineGridAlign(nineGridAlign);

    return (
        <div className={calculatedClass}>
            <div className={`max-w-6xl mx-auto relative z-10`}>
                <h1 className="text-5xl md:text-7xl font-logo text-stone-800 mb-6 leading-tight">
                    {title}
                </h1>
                <p className="text-3xl md:text-4xl font-logo text-stone-900 mb-8">
                    {subtitle}
                </p>
            </div>
        </div>
    );
}

function calculateClassBasedOnNineGridAlign(nineGridAlign: any): string {

    return `absolute ${nineGridAlign.includes('top')
        ? 'top-8'
        : nineGridAlign.includes('bottom')
            ? 'bottom-8'
            : 'top-1/2 transform -translate-y-1/2'} 
    ${nineGridAlign.includes('left')
            ? 'left-8'
            : nineGridAlign.includes('right')
                ? 'right-8'
                : 'left-1/2 transform -translate-x-1/2'} 
                        text-center md:text-left px-4 sm:px-0`
}



export default NgkTitleSubtitle;

