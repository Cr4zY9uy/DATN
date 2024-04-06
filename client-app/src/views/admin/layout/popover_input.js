import "./../style/popover_input.css";
import { Popover, OverlayTrigger } from "react-bootstrap";
import { Form, Button, Space, Input } from "antd";
function Popover_Input(props) {
    const data = props.info;
    const price = props.info_price;
    const popover_right = (
        <Popover id="popover-input">
            <Popover.Header as="h3">First name:</Popover.Header>
            <Popover.Body>
                <div>
                    <Form.Item
                        hasFeedback
                        validateStatus=""
                        help="Maximum 200 characters"
                    >
                        <Input value={data} />
                    </Form.Item>
                    <Space>
                        <Button onClick={() => document.body.click()} className="saveBtn"><i class="bi bi-check-lg"></i></Button>
                        <Button onClick={() => document.body.click()} className="delBtn"><i class="bi bi-x-lg"></i></Button>
                    </Space>
                </div>
            </Popover.Body>
        </Popover>
    );
    return (
        <OverlayTrigger trigger="click" placement="right" overlay={popover_right} rootClose={true}>
            <Button type="link">{data ? data : price+'$'}</Button>
        </OverlayTrigger>
    );
}

export default Popover_Input;