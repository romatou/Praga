export const game = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  overflowY: 'auto',
}

export const gameBoard = {
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'flex-start',
  flexWrap: 'wrap',
  padding: '10px',
  height: '28rem',
}

export const containerArea = {
  margin: '0 3rem',
}

export const containerAreaBoard = {
  position: 'relative',
}

export const status1 = {
  marginBottom: '10px',
  color: 'red',
}

export const status2 = {
  marginBottom: '15px',
}

export const letterCoords = {
  display: 'flex',
  justifyContent: 'space-around',
  marginBottom: '5px',
}

export const letterCoord = {
  width: '37px',
  textAlign: 'center',
  color: 'blue',
}

export const numberCoords = {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  bottom: '22px',
  left: '-23px',
}

export const numberCoord = {
  height: '37px',
  textAlign: 'right',
  margin: '.5px 0',
  color: 'blue',
}

export const canvas = {
  width: '300px',
  height: '300px',
  boxShadow: '0 0 0 1px #000',
  backgroundColor: '#eee',
}

export const computerCanvas = {
  cursor: 'pointer',
}

export const namesBoard = {
  marginBottom: '10px',
  marginTop: '10px',
  textAlign: 'center',
  background: 'burlywood',
}

export const wrapButton = {
  maxWidth: '47rem',
  display: 'flex',
  flexDirection: 'column',
  padding: '5px',
  justifyContent: 'flexStart',
  alignItems: 'stretch',
  minHeight: '100%',
  marginLeft: '1rem',
}

export const buttonStyles = {
  position: 'static',
  backgroundColor: '#000',
  margin: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}
