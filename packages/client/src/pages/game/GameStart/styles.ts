export const containerStyles = {
  position: 'relative',
  width: '100vw',
  height: '100vh',
  margin: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

export const contentStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '96px',
}

export const imgStyles = {
  cursor: 'pointer',
  padding: '16px',
  borderRadius: '16px',
  transition: 'all .2s ease',
  '&:hover': {
    boxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.2)',
  },
}

export const imagesStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '80px',
}

export const startBtnStyles = {
  padding: '24px 32px',
  borderRadius: '6px',
  minWidth: 270,
  fontSize: '20px',
}
