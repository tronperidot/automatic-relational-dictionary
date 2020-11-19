import React from 'react'
import Link from 'next/link'

import { Word } from '../interfaces'

type Props = {
  data: Word
}

const ListItem = ({ data }: Props) => (
  <Link href="/users/[title]" as={`/users/${data.title}`}>
    <a>
      {data.title}
    </a>
  </Link>
)

export default ListItem
