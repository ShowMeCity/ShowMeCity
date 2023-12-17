import React from 'react';

const TransparentScreen = () => {
    const styles:React.CSSProperties = {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0)',
        height: '100%',
        zIndex: 10,
    }
    return (
        <div style={styles} >
        </div>
    );
}
export default TransparentScreen;