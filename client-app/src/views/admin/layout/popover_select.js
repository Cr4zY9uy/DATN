import "./../style/popover_select.css";
import { Popover, OverlayTrigger } from "react-bootstrap";
import { Form, Button, Space, Select } from "antd";
function Popover_Select(props) {
    const info = props.info;

    const popover_right = (
        <Popover id="popover-select">
            <Popover.Header as="h3">Order status:</Popover.Header>
            <Popover.Body>
                <div className="d-flex  justify-content-between align-items-center">
                    <Form.Item className="wrap_select">
                        <select class="custom_select">
                            <option>
                                a
                            </option>
                            <option>
                                b
                            </option>
                        </select>
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
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover_right} rootClose={true}>
            <Button type="link">{info}</Button>
        </OverlayTrigger>
    );
}

export default Popover_Select;