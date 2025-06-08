import React, { useEffect } from 'react'

const loaderStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#f8f8f8',
}

const spinnerStyle: React.CSSProperties = {
    width: '50px',
    height: '50px',
    border: '6px solid #ccc',
    borderTop: '6px solid #333',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
}

const Loader = () => {
    useEffect(() => {
        const style = document.createElement('style')
        style.innerHTML = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `
        document.head.appendChild(style)
        return () => {
            document.head.removeChild(style)
        }
    }, [])

    return (
        <div style={loaderStyle}>
            <div style={spinnerStyle}></div>
        </div>
    )
}

export default Loader
