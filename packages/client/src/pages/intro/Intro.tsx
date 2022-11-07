import { Link } from 'react-router-dom'

export default function Intro() {
  return (
    <div>
      <h1>Мини-лэндинг - Главная страница</h1>
      <p>Это временная страница-заглушка. Здесь позже будет мини-лэндинг</p>
      <ul>
        <li>
          <Link to="/auth">Авторизация</Link>
        </li>
        <li>
          <Link to="/register">Регистрация</Link>
        </li>
        <li>
          <Link to="/profile">Профиль</Link>
        </li>
        <li>
          <Link to="/ranking">Лидерборд</Link>
        </li>
        <li>
          <Link to="/game/start">Начало игры</Link>
        </li>
        <li>
          <Link to="/game/play">Игра</Link>
        </li>
        <li>
          <Link to="/game/result">Завершение игры</Link>
        </li>
        <li>
          <Link to="/forum">Форум</Link>
        </li>
        <li>
          <Link to="/404">Страница не найдена</Link>
        </li>
        <li>
          <Link to="/500">Ошибка на сервере</Link>
        </li>
      </ul>
    </div>
  )
}
