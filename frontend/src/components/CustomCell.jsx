import Paragraph from "antd/es/typography/Paragraph";
import { Tooltip } from "antd";
import { useState } from "react";

const CustomCell = ({
    children,
    ellipsis,
    ...props
}) => {
    const [truncated, setTruncated] = useState(false);

    return (
        <Tooltip title={truncated ? children : undefined}>
            <Paragraph
                {...props}
                ellipsis={{ ...ellipsis, onEllipsis: setTruncated }}
            >
                {/* NOTE: Fragment is necessary to avoid showing the title */}
                <>{children}</>
            </Paragraph>
        </Tooltip>
    );
};

export default CustomCell;