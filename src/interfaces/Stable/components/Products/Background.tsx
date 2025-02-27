import React from "react";
import { Quality } from "../../../../shared/inventory/itemType";
import { QualityColor } from "../../../DonateStore/data/quality";

type Props = {
  quality: Quality;
};

const Background: React.FC<Props> = ({ quality }) => {
  return (
    <div className="background">
      <div className="bg">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 350 103"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_1036_9491)">
            <mask id="path-1-inside-1_1036_9491" fill="white">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M342 0H8C8 4.41828 4.41828 8 0 8V95C4.41828 95 8 98.5817 8 103H342C342 98.5817 345.582 95 350 95V8C345.582 8 342 4.41828 342 0Z"
              />
            </mask>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M342 0H8C8 4.41828 4.41828 8 0 8V95C4.41828 95 8 98.5817 8 103H342C342 98.5817 345.582 95 350 95V8C345.582 8 342 4.41828 342 0Z"
              fill="#141414"
            />
            <path
              className="stroke"
              style={{ transition: "all .2s ease" }}
              d="M8 0V-1H7V0H8ZM342 0H343V-1H342V0ZM0 8V7H-1V8H0ZM0 95H-1V96H0V95ZM8 103H7V104H8V103ZM342 103V104H343V103H342ZM350 95V96H351V95H350ZM350 8H351V7H350V8ZM8 1H342V-1H8V1ZM0 9C4.97056 9 9 4.97056 9 0H7C7 3.86599 3.86599 7 0 7V9ZM1 95V8H-1V95H1ZM9 103C9 98.0294 4.97056 94 0 94V96C3.86599 96 7 99.134 7 103H9ZM342 102H8V104H342V102ZM343 103C343 99.134 346.134 96 350 96V94C345.029 94 341 98.0294 341 103H343ZM349 8V95H351V8H349ZM341 0C341 4.97056 345.029 9 350 9V7C346.134 7 343 3.86599 343 0H341Z"
              mask="url(#path-1-inside-1_1036_9491)"
            />
          </g>
          <defs>
            <clipPath id="clip0_1036_9491">
              <rect width="350" height="103" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className="quality">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 350 103"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask
            id="mask0_1036_9371"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="4"
            y="4"
            width="342"
            height="95"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 4H338C338 8.41828 341.582 12 346 12V91C341.582 91 338 94.5817 338 99H12C12 94.5817 8.41828 91 4 91V12C8.41828 12 12 8.41828 12 4Z"
              fill="#D9D9D9"
            />
          </mask>
          <g mask="url(#mask0_1036_9371)">
            <g filter="url(#filter0_f_1036_9371)">
              <ellipse
                cx="3.5"
                cy="-5"
                rx="82.5"
                ry="60"
                fill={QualityColor[quality]}
              />
            </g>
          </g>
          <g opacity="0.1">
            <mask id="path-3-inside-1_1036_9371" fill="white">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 4H338C338 8.41828 341.582 12 346 12V91C341.582 91 338 94.5817 338 99H12C12 94.5817 8.41828 91 4 91V12C8.41828 12 12 8.41828 12 4Z"
              />
            </mask>
            <path
              d="M338 4H339V3H338V4ZM12 4V3H11V4H12ZM346 12H347V11H346V12ZM346 91V92H347V91H346ZM338 99V100H339V99H338ZM12 99H11V100H12V99ZM4 91H3V92H4V91ZM4 12V11H3V12H4ZM338 3H12V5H338V3ZM346 11C342.134 11 339 7.86599 339 4H337C337 8.97056 341.029 13 346 13V11ZM347 91V12H345V91H347ZM339 99C339 95.134 342.134 92 346 92V90C341.029 90 337 94.0294 337 99H339ZM12 100H338V98H12V100ZM4 92C7.86599 92 11 95.134 11 99H13C13 94.0294 8.97056 90 4 90V92ZM3 12V91H5V12H3ZM11 4C11 7.86599 7.86599 11 4 11V13C8.97056 13 13 8.97056 13 4H11Z"
              fill="white"
              mask="url(#path-3-inside-1_1036_9371)"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_1036_9371"
              x="-279"
              y="-265"
              width="565"
              height="520"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="100"
                result="effect1_foregroundBlur_1036_9371"
              />
            </filter>
          </defs>
        </svg>
      </div>
      <div className="hover">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 350 103"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_1036_9402)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M342 0H8C8 4.41828 4.41828 8 0 8V95C4.41828 95 8 98.5817 8 103H342C342 98.5817 345.582 95 350 95V8C345.582 8 342 4.41828 342 0Z"
              fill="url(#paint0_linear_1036_9402)"
              fillOpacity="0.12"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_1036_9402"
              x1="0"
              y1="0"
              x2="350"
              y2="103"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <clipPath id="clip0_1036_9402">
              <rect width="350" height="103" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default Background;
