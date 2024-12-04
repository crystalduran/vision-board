import './Home.css'

function Home() {

  return (
    <>
      <header>
        <img src="/Logo.svg" alt="logo sparkles" width={60} height={60} />
      </header>

      <main className="hero-container">
        <section className="hero">
          <h1>Create the vision of your ideal life with <span>DreamCraft</span> in minutes</h1>
          <h4>Imagine your ideal life and turn it into a downloadable visual plan, free and without the need to sign up.</h4>
          <a href="create">Get started</a>
        </section>
      </main >
      <div className="circle-purple"></div>
    </>
  );
}

export default Home;
