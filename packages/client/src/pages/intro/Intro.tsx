import { Box, Button } from '@mui/material';
import { logout } from '@store/actions/AuthActionCreators';
import { useAppDispatch } from '@store/index';
import { useUser } from '../../hooks/useUser';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export default function Intro() {
  const user = useUser()

 const navigate = useNavigate();
 const dispatch = useAppDispatch()
 const logOut = (event: any) => {
   event.preventDefault();
   dispatch(logout())

 }
 console.count('render mainPage')

  return ( 
    <div>
      <h1>Мини-лэндинг - Главная страница</h1>
      <h2>Hello {user.first_name} {user.second_name}</h2>
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
      <Box onClick={logOut} sx={{width: 150}}>
          <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            > выйти
            </Button>
          </Box>
    </div>
    
  )
}
