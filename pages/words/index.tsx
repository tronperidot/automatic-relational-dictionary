import { GetStaticProps } from 'next'
import Link from 'next/link'

import { Word } from '../../interfaces'
import Layout from '../../components/Layout'
import List from '../../components/List'
import { Octokit } from '@octokit/rest'
import { TARGET_REPOSITORY } from '../../constants'

type Props = {
  items: Word[]
}

const repos = new Octokit()

const WithStaticProps = ({ items }: Props) => (
  <Layout title="Words List | Next.js + TypeScript Example">
    <h1>Words List</h1>
    <p>
      Example fetching data from inside <code>getStaticProps()</code>.
    </p>
    <p>You are currently on: /users</p>
    <List items={items} />
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
)

export const getStaticProps: GetStaticProps = async () => {
  try {
    const result = await repos.issues.listForRepo(TARGET_REPOSITORY);
    const items: Word[] = result.data
    // By returning { props: item }, the StaticPropsDetail component
    // will receive `item` as a prop at build time
    return { props: { items } }
  } catch (err) {
    return { props: { errors: err.message } }
  }
}

export default WithStaticProps
