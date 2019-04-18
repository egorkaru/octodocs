import * as React from 'react'

const Spinner: React.FC = () => (
  <div className="lds-ring">
    <div/><div/><div/><div/>
    <style jsx={true}>
    {`
      .lds-ring {
        display: inline-block;
        position: relative;
        width: 64px;
        height: 64px;
      }
      .lds-ring div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 51px;
        height: 51px;
        margin: 6px;
        border: 6px solid cadetblue;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: cadetblue transparent transparent transparent;
      }
      .lds-ring div:nth-child(1) {
        animation-delay: -0.45s;
      }
      .lds-ring div:nth-child(2) {
        animation-delay: -0.3s;
      }
      .lds-ring div:nth-child(3) {
        animation-delay: -0.15s;
      }
      @keyframes lds-ring {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}
    </style>
  </div>
)

type LoadingSpinnerProps = {
  isFullScreen?: boolean
  backgroundColor?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isFullScreen = false, backgroundColor = 'transparent' }) => {
  if (!isFullScreen) return <Spinner/>
  return (
    <div className="loadingSpinner__holder">
      <div className="loadingSpinner--spinner">
        <Spinner/>
      </div>
      <style jsx={true}>
      {`
        .loadingSpinner__holder {
          position: fixed;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          background-color: ${backgroundColor};
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loadingSpinner--spinner{
          position: relative;
        }
      `}
      </style>
    </div>
  )
}

export default LoadingSpinner
