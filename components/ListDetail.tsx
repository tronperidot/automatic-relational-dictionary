import * as React from 'react'
import { Word } from '../interfaces'

type ListDetailProps = {
  item: Word
}

const ListDetail = ({ item }: ListDetailProps) => (
  <div>
    <h1>Detail for {item.title}</h1>
    <p>{item.body}</p>
  </div>
)

export default ListDetail
