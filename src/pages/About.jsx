import "./About.css";

function About() {
    return (
        <section className="about-page">
            <h1>О проекте</h1>
            <p className="about-lead">
                Alpha Book Store — учебный цифровой продукт на React для поиска и просмотра IT-книг.
            </p>

            <div className="about-grid">
                <article className="about-card">
                    <h3>Маршрутизация</h3>
                    <p>В проекте используются обычные страницы, динамический маршрут книги и страница 404.</p>
                </article>
                <article className="about-card">
                    <h3>Работа с API</h3>
                    <p>Данные загружаются с dBooks API: новые книги, поиск и подробная информация о книге.</p>
                </article>
                <article className="about-card">
                    <h3>Интерактивность</h3>
                    <p>Пользователь может искать книги, менять тему, добавлять книги в избранное и удалять их.</p>
                </article>
            </div>
        </section>
    );
}

export default About;
