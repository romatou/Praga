const Square = props => {
  let classN = 'square'
  const rand = props.name === 'player' ? props.randPlayer : props.randComp
  if (props.name === 'player') {
    classN = 'square computer' //класс "computer" применяется к ячейкам компьютера (левое пооле)
    if (!isNaN(rand.find(elem => elem === props.index)))
      //если находим корабли
      classN += ' colorize' //добавляем данный класс ячейке с кораблями
  }

  return (
    //при клике по кнопке выполняется функция handlrClick (ниже)
    <button className={classN} onClick={props.onClick}>
      {props.value}
    </button>
  )
}

export default Square
