import React from 'react';
import Svg, {Circle, G, Path} from "react-native-svg";


interface IQuoteSvgProps {
    color: string;
    size: number;
}

const QuoteSvg: React.FC<IQuoteSvgProps> = ({color, size}) => {
    return (
        <Svg
            width={size}
            height={size}
            viewBox="0 0 57 57"
        >

            <G>
                <Circle fill={color} cx="18.5" cy="31.5" r="5.5" />
                <Path
                    fill={color}
                    d="M18.5,38c-3.584,0-6.5-2.916-6.5-6.5s2.916-6.5,6.5-6.5s6.5,2.916,6.5,6.5S22.084,38,18.5,38zM18.5,27c-2.481,0-4.5,2.019-4.5,4.5s2.019,4.5,4.5,4.5s4.5-2.019,4.5-4.5S20.981,27,18.5,27z"
                />
            </G>
            <G>
                <Circle fill={color} cx="35.5" cy="31.5" r="5.5" />
                <Path
                    fill={color}
                    d="M35.5,38c-3.584,0-6.5-2.916-6.5-6.5s2.916-6.5,6.5-6.5s6.5,2.916,6.5,6.5S39.084,38,35.5,38zM35.5,27c-2.481,0-4.5,2.019-4.5,4.5s2.019,4.5,4.5,4.5s4.5-2.019,4.5-4.5S37.981,27,35.5,27z"
                />
            </G>
            <Path
                fill={color}
                d="M13,32c-0.553,0-1-0.447-1-1c0-7.72,6.28-14,14-14c0.553,0,1,0.447,1,1s-0.447,1-1,1c-6.617,0-12,5.383-12,12C14,31.553,13.553,32,13,32z"
            />
            <Path
                fill={color}
                d="M30,32c-0.553,0-1-0.447-1-1c0-7.72,6.28-14,14-14c0.553,0,1,0.447,1,1s-0.447,1-1,1c-6.617,0-12,5.383-12,12C31,31.553,30.553,32,30,32z"
            />
        </Svg>
    );
};

export default QuoteSvg;