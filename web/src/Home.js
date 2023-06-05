import { Button, Space, Card } from 'antd';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <h1>ECS 171 Term Project: Group 17</h1>
      <b>Group members</b>: []

      <br />

      <Space>

        <Card title={"Naive Bayes"} size='small'>
          <p>Model implemented with decision tree</p>
          <Button type="primary">Try</Button>
        </Card>

        <Card title={"Neural Network"} size='small'>
          <p>Model implemented with decision tree</p>
          <Button type="primary">Try</Button>
        </Card>

        <Card title={"Decision Tree"} size='small'>
          <p>Model implemented with decision tree</p>
          <Link to={"/decision-tree"}>
            <Button type="primary">Try</Button>
          </Link>
        </Card>

      </Space>
    </>
  )
}

export default Home;