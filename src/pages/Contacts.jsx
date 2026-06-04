import { useState } from "react";
import "./Contacts.css";

function Contacts() {
    const [message, setMessage] = useState("");
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = event => {
        event.preventDefault();
        if (!message.trim()) return;
        setIsSent(true);
        setMessage("");
    };

    return (
        <section id="contacts" className="contacts-section section">
            <div className="container">
                <h2>Контакты</h2>
                <p className="contacts-intro">
                    Мы всегда открыты для сотрудничества и готовы ответить на ваши вопросы.
                    Здесь вы найдёте юридическую информацию, расположение на карте и форму обратной связи.
                </p>

                <div className="contacts-columns">
                    <div className="contacts-info">
                        <h3>Юридическая информация:</h3>
                        <p><strong>Наименование:</strong> ТОО «Project AlphaEdu»</p>
                        <p><strong>Адрес:</strong> г. Астана, ул. Хусейн бен Талал, 21/1</p>
                        <p><strong>БИН:</strong> 111111111111</p>

                        <h3>Контакты:</h3>
                        <p><strong>Тел:</strong> +7-777-777-77-77</p>

                        <h3>Форма обратной связи</h3>
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <textarea
                                value={message}
                                onChange={event => setMessage(event.target.value)}
                                placeholder="Напишите ваш вопрос..."
                            />
                            <button type="submit">Отправить</button>
                        </form>
                        {isSent && <p className="form-success">Спасибо! Ваше сообщение принято.</p>}
                    </div>

                    <div className="contacts-map">
                        <h3>Мы на карте</h3>
                        <iframe
                            src="https://yandex.ru/map-widget/v1/?ll=71.398315%2C51.085483&z=17&pt=71.398315,51.085483,pm2rdm"
                            width="100%"
                            height="400"
                            frameBorder="0"
                            title="AlphaEdu Location"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contacts;
