export function PageNotFound() {
    return (
        <>
            <header>
                <a href="/" style={{ backgroundColor: 'transparent' }}><img className='logo' src="/Logo.svg" alt="logo sparkles" width={60} height={60} /></a>
            </header>
            <main className="notFound-container">
                <div>
                    <h1>The page you are looking for does not exist</h1>
                    <h4>Oops, looks like you’re manifesting the wrong link! Go back to <a href="/" style={{ backgroundColor: 'transparent', textDecoration: 'underline', padding: '0' }}>home</a></h4>
                </div>
            </main>
        </>
    );
}