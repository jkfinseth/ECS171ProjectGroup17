import { Button, Card, Col, Form, Input, Row, Select, Typography, Space } from "antd";
import { useEffect, useState } from "react";
import "./App.css";

const { Text } = Typography;

function App() {
  const [form] = Form.useForm();
  const [nn, setNn] = useState('N/A');
  const [nb_cat, setNbCat] = useState('N/A');
  const [nb_num, setNbNum] = useState('N/A');
  const [dt, setDt] = useState('N/A');
  const [en, setEn] = useState('N/A');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let sum = 0;
    if (nn !== '') sum++;
    if (nb_cat !== '') sum++;
    if (nb_num !== '') sum++;
    if (dt !== '') sum++;
    if (en !== '') sum++;

    setProgress(sum);

  }, [nn, nb_cat, nb_num, dt, en])

  function handleRandomOb() {
    fetch('/api/example_data')
      .then(res => res.json())
      .then(data => {
        for (let field in data) {
          form.setFieldValue(field, data[field]);
        }
      });
  }

  function handleRandom() {
    fetch('/api/random_data')
      .then(res => res.json())
      .then(data => {
        for (let field in data) {
          form.setFieldValue(field, data[field]);
        }
      });
  }


  function handleFinish(values) {
    console.log(values);

    setNn('');
    setNbCat('');
    setNbNum('');
    setDt('');
    setEn('');
    setProgress(0);

    fetch('/api/nn', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    }).then(res => res.json())
      .then(data => {
        console.log('NN:', data.prediction);
        setNn(data.prediction === 0 ? "Not Canceled" : "Canceled");
      })

    fetch('/api/nb_cat', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    }).then(res => res.json())
      .then(data => {
        console.log('NB_cat:', data.prediction);
        setNbCat(data.prediction === 0 ? "Not Canceled" : "Canceled");
      })

    fetch('/api/nb_num', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    }).then(res => res.json())
      .then(data => {
        console.log('NB_num:', data.prediction);
        setNbNum(data.prediction === 0 ? "Not Canceled" : "Canceled");
      })

    fetch('/api/dt', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    }).then(res => res.json())
      .then(data => {
        console.log('DT:', data.prediction);
        setDt(data.prediction === 0 ? "Not Canceled" : "Canceled");
      })

    fetch('/api/en', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    }).then(res => res.json())
      .then(data => {
        console.log('EN:', data.prediction);
        setEn(data.prediction === 0 ? "Not Canceled" : "Canceled");
      })
  }

  return (
    <main style={{ width: "100%", maxWidth: 1080, margin: "0 auto" }}>
      <Typography.Title>
        ECS 171 Term Project: Group 17
      </Typography.Title>

      <Row gutter={16}>
        <Col xs={24} sm={16}>
          <Card title={"Input information"}>
            <Space>
              <Button onClick={handleRandomOb}>Get Random Observation From Dataset</Button>
              <Button onClick={handleRandom}>Generate Random Values</Button>
            </Space>
            <br />
            <br />

            <Form layout="vertical"
              onFinish={handleFinish}
              form={form}>
              <Row gutter={8}>
                <Col xs={24} sm={6}>
                  <Form.Item
                    label={"# of Adults"}
                    name={"no_of_adults"}
                  >
                    <Input type="number" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={6}>

                  <Form.Item
                    label={"# of Children"}
                    name={"no_of_children"}
                  >
                    <Input type={"number"} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={6}>
                  <Form.Item
                    label={"# of Weekend Nights"}
                    name={"no_of_weekend_nights"}
                  >
                    <Input type={"number"} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={6}>
                  <Form.Item
                    label={"# of Week Nights"}
                    name={"no_of_week_nights"}
                  >
                    <Input type={"number"} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col xs={24} sm={7}>
                  <Form.Item
                    label={"Type of Meal Plan"}
                    name={"type_of_meal_plan"}
                  >
                    <Select
                      options={[
                        { value: "Not Selected", label: "Not Selected" },
                        { value: "Meal Plan 1", label: "Meal Plan 1" },
                        { value: "Meal Plan 2", label: "Meal Plan 2" },
                        { value: "Meal Plan 3", label: "Meal Plan 3" }
                      ]} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={7}>
                  <Form.Item
                    label={"Required Car Parking Space"}
                    name={"required_car_parking_space"}
                  >
                    <Select
                      options={[
                        { value: 0, label: 'No' },
                        { value: 1, label: 'Yes' }
                      ]} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={7}>
                  <Form.Item
                    label={"Room Type Reserved"}
                    name={"room_type_reserved"}
                  >
                    <Select
                      options={[
                        { value: "Room_Type 1", label: "Room Type 1" },
                        { value: "Room_Type 2", label: "Room Type 2" },
                        { value: "Room_Type 3", label: "Room Type 3" },
                        { value: "Room_Type 4", label: "Room Type 4" },
                        { value: "Room_Type 5", label: "Room Type 5" },
                        { value: "Room_Type 6", label: "Room Type 6" },
                        { value: "Room_Type 7", label: "Room Type 7" },
                      ]} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col xs={24} sm={4}>
                  <Form.Item
                    label={"Lead Time"}
                    name={"lead_time"}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={4}>
                  <Form.Item
                    label={"Arrival Month"}
                    name={"arrival_month"}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={4}>
                  <Form.Item
                    label={"Arrival Date"}
                    name={"arrival_date"}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={8}>
                  <Form.Item
                    label={"Market Segment Type"}
                    name={"market_segment_type"}
                  >
                    <Select
                      options={[
                        { value: "Offline", label: "Offline" },
                        { value: "Online", label: "Online" },
                        { value: "Coporate", label: "Corporate" },
                        { value: "Aviation", label: "Aviation" },
                        { value: "Complementary", label: "Complementary" }
                      ]} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col xs={24} sm={4}>
                  <Form.Item
                    label={"Repeated Guest"}
                    name={"repeated_guest"}
                  >
                    <Select
                      options={[
                        { value: 0, label: 'No' },
                        { value: 1, label: 'Yes' }
                      ]} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={7}>
                  <Form.Item
                    label={"# of Previous Cancellations"}
                    name={"no_of_previous_cancellations"}
                  >
                    <Input type={"number"} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={10}>
                  <Form.Item
                    label={"# of Previous Bookings Not Canceled"}
                    name={"no_of_previous_bookings_not_canceled"}
                  >
                    <Input type={"number"} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={8}>
                <Col xs={24} sm={8}>
                  <Form.Item
                    label={"Avg. Price per Room"}
                    name={"avg_price_per_room"}
                  >
                    <Input type={"number"} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                  <Form.Item
                    label={"# of Special Requests"}
                    name={"no_of_special_requests"}
                  >
                    <Input type={"number"} />
                  </Form.Item>
                </Col>
              </Row>
              <Button type="primary" htmlType="submit">
                Predict!
              </Button>
            </Form>
          </Card >
        </Col>

        <Col xs={24} sm={8}>
          <Card title="Predictions" bodyStyle={{ position: "relative" }}>
            <div className="Progress"><div style={{
              width: `${progress * 20}%`,
            }} className="ProgressBar" /></div>

            <div style={{ opacity: progress < 5 ? 0.4 : 1 }}>
              <b>Neural Network:</b> <Text type={nn === "Canceled" ? "danger" : "success"}>{nn}</Text><br />
              <b>Naive Bayes Cat.:</b> <Text type={nb_cat === "Canceled" ? "danger" : "success"}>{nb_cat}</Text><br />
              <b>Naive Bayes Num.:</b> <Text type={nb_num === "Canceled" ? "danger" : "success"}>{nb_num}</Text><br />
              <b>Decision Tree:</b> <Text type={dt === "Canceled" ? "danger" : "success"}>{dt}</Text><br />
              <b>Ensemble:</b> <Text type={en === "Canceled" ? "danger" : "success"}>{en}</Text><br />
            </div>
          </Card>
        </Col>
      </Row>
    </main>
  );
}

export default App;
