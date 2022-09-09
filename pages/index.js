import NavBar from '../components/nav-bar';

export default function Home() {
    return (
        <>
            <section className="place-content-center text-center  grid bg-secondary text-white p-44">
                <h1 className=" text-9xl font-mono font-bold m-4">
                    I <span className=" text-red-600">❤️</span> JS
                </h1>
                <p className="text-fourth">
                    Sitio para ejecutar y probar codigo js, ademas de enseñar js
                    en español
                </p>
            </section>
            <h1 className="text-3xl font-bold underline"> home </h1>
        </>
    );
}
