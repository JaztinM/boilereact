import React from 'react';

interface WaveBackgroundProps {
    className?: string;
}

const WaveBackground: React.FC<WaveBackgroundProps> = ({ className }) => {
    return (
        <svg
            className={className}
            preserveAspectRatio="none"
            viewBox="0 0 1440 320"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill="#5b99d6"
                fillOpacity="1"
                d="M0,224L60,218.7C120,213,240,203,360,213.3C480,224,600,256,720,261.3C840,267,960,245,1080,218.7C1200,192,1320,160,1380,144L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            />
        </svg>
    );
};

export default WaveBackground; 