import * as React from "react"
import Layout from "../components/layout"
import { StaticImage } from "gatsby-plugin-image"

const IndexPage = () => {
  return (
    <Layout>
      <div className="container mx-auto m-8">
        <h1 className="text-blue-400">Add New Record</h1>
        <p className="text-align-center">Form Coming Soon</p>
        <StaticImage src="../images/3dprinter.jpg" alt="not stupid image" width={100} height={200} />
      </div>
    </Layout>
  )
}

export default IndexPage
