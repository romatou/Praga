import background from '@assets/landing-background.jpg'

const styles = {
  page: {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100vw',
  },
  title: {
    padding: '3.5rem 1rem 0',
    letterSpacing: '15px',
    fontWeight: '500',
    wordSpacing: '20px',
    textTransform: 'uppercase',
  },
  window: {
    border: '2px solid #000',
    background: '#fff',
    boxShadow: '2px 4px 4px rgba(0, 0, 0, 0.25)',
    width: '75%',
    height: 'auto',
    borderRadius: '6px',
    position: 'relative',
  },
  heading: {
    background: '#000',
    borderRadius: '0 6px 6px 0',
    padding: '0.5rem 2rem',
    left: '-2px',
    color: '#fff',
    marginBottom: '2rem',
    display: 'inline-block',
    position: 'relative',
    top: '2rem',
  },
  containerCentered: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCaption: {
    textAlign: 'left',
    fontWeight: '300',
    fontSize: '14px',
    background: 'lightblue',
    padding: '1rem',
    margin: '1rem 0',
    borderRadius: '6px',
  },
}

export default styles
