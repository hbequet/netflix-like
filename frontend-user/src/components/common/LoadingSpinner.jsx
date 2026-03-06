function LoadingSpinner() {
    return <div className="loading-screen" style={{ backgroundColor: '#000', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner" />
        <p style={{ marginTop: '20px', fontSize: '1.2rem' }}>Chargement...</p>
    </div>;
}

export default LoadingSpinner;
