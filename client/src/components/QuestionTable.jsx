import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Typography,
} from '@mui/material'
import { Star, StarBorder } from '@mui/icons-material'

export default function QuestionTable({ questions, store }) {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Category</TableCell>
          <TableCell>Difficulty</TableCell>
          <TableCell>Favorite</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {questions.map(q => (
          <TableRow key={q.id}>
            <TableCell>{q.id}</TableCell>
            <TableCell>
              <Typography variant="body2">{q.title || q.question}</Typography>
            </TableCell>
            <TableCell>{q.category}</TableCell>
            <TableCell>{q.difficulty || '-'}</TableCell>
            <TableCell>
              <IconButton onClick={() => store.toggleFavorite(q.id)} color="warning">
                {store.favorites.includes(q.id) ? <Star /> : <StarBorder />}
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
