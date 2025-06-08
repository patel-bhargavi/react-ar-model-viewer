import React from "react";

const NotFound: React.FC = () => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                overflow: "hidden",
            }}
        >
            <div style={{ textAlign: "center" }}>
                {/* 404 Text */}
                <div
                    style={{
                        fontSize: "188px",
                        color: "#B3C7F4",
                        fontWeight: 700,
                        lineHeight: "188px",
                    }}
                >
                    404
                </div>
                <p
                    style={{
                        fontSize: "32px",
                        fontWeight: 500,
                        color: "#6A6A6A",
                        margin: "10px 0",
                    }}
                >
                    Looks like this page does’t exist
                </p>
            </div>
        </div>
    );
};

export default NotFound;
