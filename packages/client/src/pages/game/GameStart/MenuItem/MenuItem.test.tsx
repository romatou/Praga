import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person'

import MenuItem from './MenuItem'

const title = 'Title'

describe('MenuItem component', () => {
  it('MenuItem renders', () => {
    render(
      <BrowserRouter>
        <MenuItem
          Icon={<PersonIcon sx={{ fontSize: 40 }} color="secondary" />}
          title={title}
          to="/"
        />
      </BrowserRouter>
    )

    expect(screen.getByRole('listitem')).toBeInTheDocument()
    expect(screen.getByText(title)).toBeInTheDocument()
  })

  it('MenuItem not renders without param - "to"', () => {
    render(
      <BrowserRouter>
        <MenuItem
          Icon={<PersonIcon sx={{ fontSize: 40 }} color="secondary" />}
          title={title}
          to=""
        />
      </BrowserRouter>
    )

    expect(screen.queryByRole('listitem')).toBeNull()
  })

  // it('MenuItem snapshot', () => {
  //   const item = render(
  //     <BrowserRouter>
  //       <MenuItem  Icon={<PersonIcon sx={{ fontSize: 40 }} color="secondary" />} title={title} to="/" />
  //     </BrowserRouter>
  //   )

  //   expect(item).toMatchSnapshot()
  // })

  // it('MenuItem empty snapshot', () => {
  //   const item = render(
  //     <BrowserRouter>
  //       <MenuItem  Icon={<PersonIcon sx={{ fontSize: 40 }} color="secondary" />} title={title} to="" />
  //     </BrowserRouter>
  //   )

  //   expect(item).toMatchSnapshot()
  // })
})
