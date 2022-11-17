import * as RB from '@mui/material'

interface Props {
  name: string
  text: string
  data: string
}

const CardMessange = (props: Props) => {
  return (
    <RB.Card sx={{ maxWidth: 478 }}>
      <RB.CardContent>
        <RB.Typography gutterBottom variant="subtitle2" component="div">
          {props.name}
        </RB.Typography>
        <RB.Typography variant="body2" color="text.secondary">
          {props.text}
        </RB.Typography>
      </RB.CardContent>
      <RB.CardActions>
        <RB.Typography
          variant="caption"
          color="inherit"
          sx={{ marginLeft: 'auto' }}>
          {props.data}
        </RB.Typography>
      </RB.CardActions>
    </RB.Card>
  )
}

export default CardMessange
