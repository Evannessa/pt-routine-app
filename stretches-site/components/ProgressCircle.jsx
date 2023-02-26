import React from "react";

export default function ProgressCircle(props) {
    const [percentage, setPercentage] = React.useState(1.0);
    React.useEffect(() => {
        startDecreasingPercentage();
    }, []);
    function startDecreasingPercentage() {
        setInterval(() => {
            setPercentage((prevValue) => {
                return prevValue - 0.1;
            });
        }, 1000);
    }
    return (
        <div>
            <svg viewBox="0 0 100 100">
                <defs>
                    <linearGradient id="gradient">
                        <stop offset="5%" stopColor="#FFC338" />
                        <stop offset="95%" stopColor="#FFEA68" />
                    </linearGradient>
                </defs>
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    strokeDasharray={2 * Math.PI * 45}
                    strokeDashoffset={percentage * (2 * Math.PI * 45)}
                    className="progressCircle"
                    fill="none"
                    stroke="url(#gradient)"
                ></circle>
            </svg>
        </div>
    );
}
