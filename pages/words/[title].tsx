import { GetStaticProps, GetStaticPaths } from 'next'

import Layout from '../../components/Layout'
import ListDetail from '../../components/ListDetail'
import { Octokit } from '@octokit/rest'
import { TARGET_REPOSITORY } from '../../constants'
import { Word } from '../../interfaces'

type Props = {
  item?: Word
  errors?: string
}

const repos = new Octokit()

const StaticPropsDetail = ({ item, errors }: Props) => {
  console.log(item)
  if (errors) {
    return (
      <Layout title="Error | Next.js + TypeScript Example">
        <p>
          <span style={{ color: 'red' }}>Error:</span> {errors}
        </p>
      </Layout>
    )
  }

  return (
    <Layout
      title={`${
        item ? item.title : 'User Detail'
      } | Next.js + TypeScript Example`}
    >
      {item && <ListDetail item={item} />}
    </Layout>
  )
}

export default StaticPropsDetail

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await repos.issues.listForRepo(TARGET_REPOSITORY);
  // Get the paths we want to pre-render based on users
  const paths = result.data.map(issue => ({
    params: { title: issue.title },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const result = await repos.issues.listForRepo(TARGET_REPOSITORY);
    const id = params?.id
    const item = result.data.find((issue) => issue.title === id)
    // By returning { props: item }, the StaticPropsDetail component
    // will receive `item` as a prop at build time
    return { props: { item } }
  } catch (err) {
    return { props: { errors: err.message } }
  }
}
