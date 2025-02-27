import React from "react";
import "./styles.sass";
import {importAllImagesFromFolder} from "../../../../utils/images";

type PropsType = {
    image: string;
};

const Backgrounds = importAllImagesFromFolder(
    require.context("../../../../assets/EscMenuHelp/", false, /.png$/),
);

export const HelpBackground: React.FC<PropsType> = ({image}) => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 801 633"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            // xmlns:xlink="http://www.w3.org/1999/xlink"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 0H789C789 6.62742 794.373 12 801 12V621C794.373 621 789 626.373 789 633H12C12 626.373 6.62742 621 0 621V12C6.62742 12 12 6.62742 12 0Z"
                fill="#141414"
            />
            <mask
                id="mask0_2334_129299"
                mask={"alpha"}
                maskUnits="userSpaceOnUse"
                x="8"
                y="8"
                width="785"
                height="450"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M793 20V458H8V20C14.6274 20 20 14.6274 20 8H781C781 14.6274 786.373 20 793 20Z"
                    fill="url(#paint0_linear_2334_129299)"
                />
            </mask>
            <g mask="url(#mask0_2334_129299)">
                <rect x="8" y="8" width="785" height="450" fill="url(#pattern0)"/>
            </g>
            <mask
                id="mask1_2334_129299"
                mask={"alpha"}
                maskUnits="userSpaceOnUse"
                x="8"
                y="8"
                width="785"
                height="617"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20 8H781C781 14.6274 786.373 20 793 20V613C786.373 613 781 618.373 781 625H20C20 618.373 14.6274 613 8 613V20C14.6274 20 20 14.6274 20 8Z"
                    fill="#D9D9D9"
                />
            </mask>
            <g mask="url(#mask1_2334_129299)">
                <g filter="url(#filter0_f_2334_129299)">
                    <ellipse cx="792.5" cy="624.5" rx="510.5" ry="153.5" fill="#2A2A2A"/>
                </g>
            </g>
            <g opacity="0.1">
                <mask id="path-6-inside-1_2334_129299" fill="white">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M20 8H781C781 14.6274 786.373 20 793 20V613C786.373 613 781 618.373 781 625H20C20 618.373 14.6274 613 8 613V20C14.6274 20 20 14.6274 20 8Z"
                    />
                </mask>
                <path
                    d="M781 8H782V7H781V8ZM20 8V7H19V8H20ZM793 20H794V19H793V20ZM793 613V614H794V613H793ZM781 625V626H782V625H781ZM20 625H19V626H20V625ZM8 613H7V614H8V613ZM8 20V19H7V20H8ZM781 7H20V9H781V7ZM793 19C786.925 19 782 14.0751 782 8H780C780 15.1797 785.82 21 793 21V19ZM794 613V20H792V613H794ZM782 625C782 618.925 786.925 614 793 614V612C785.82 612 780 617.82 780 625H782ZM20 626H781V624H20V626ZM8 614C14.0751 614 19 618.925 19 625H21C21 617.82 15.1797 612 8 612V614ZM7 20V613H9V20H7ZM19 8C19 14.0751 14.0751 19 8 19V21C15.1797 21 21 15.1797 21 8H19Z"
                    fill="white"
                    mask="url(#path-6-inside-1_2334_129299)"
                />
            </g>
            <defs>
                <pattern
                    id="pattern0"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                >
                    <use
                        href="#image0_2334_129299"
                        transform="matrix(0.000911965 0 0 0.00159087 -0.0416567 -0.175851)"
                    />
                </pattern>
                <filter
                    id="filter0_f_2334_129299"
                    x="-118"
                    y="71"
                    width="1821"
                    height="1107"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    />
                    <feGaussianBlur
                        stdDeviation="200"
                        result="effect1_foregroundBlur_2334_129299"
                    />
                </filter>
                <linearGradient
                    id="paint0_linear_2334_129299"
                    x1="400.5"
                    y1="8"
                    x2="401"
                    y2="458"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="white"/>
                    <stop offset="0.25" stopColor="white"/>
                    <stop offset="0.5" stopColor="white" stopOpacity="0.5"/>
                    <stop offset="0.75" stopColor="white" stopOpacity="0.2"/>
                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                </linearGradient>
                <image
                    id="image0_2334_129299"
                    x={0}
                    y={80}
                    width="1200"
                    height="751"
                    href={`${Backgrounds[`${image}.png`]}`}
                />
            </defs>
        </svg>
    );
};
