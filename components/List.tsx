import * as React from 'react'
import ListItem from './ListItem'
import { Word } from '../interfaces'

type Props = {
  items: Word[]
}

const List = ({ items }: Props) => (
  <ul>
    {items.map((item) => (
      <li key={item.title}>
        <ListItem data={item} />
      </li>
    ))}
  </ul>
)

export default List
