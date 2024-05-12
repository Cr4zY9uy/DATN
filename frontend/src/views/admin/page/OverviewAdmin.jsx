import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Sector, YAxis, Line, Bar, Legend, ResponsiveContainer, ComposedChart, CartesianGrid, XAxis } from 'recharts'
import { count_order, count_product_category, count_statitics, order_per_day, order_per_month } from '../../../services/statitics_service';
import { getLabelByValue } from '../../../utils/getLabelByValue';
import { orderStatusOptions, paymentStatusOptions, shippingStatusOptions } from '../../../utils/options';
import { Button, Card, Flex, Image, Typography } from 'antd';
import { LoginOutlined, ProductOutlined, ShoppingCartOutlined, TagOutlined, UsergroupDeleteOutlined } from '@ant-design/icons';
import randomHexColorCode from '../../../utils/randomColor';
import './OverviewAdmin.css'
import { useNavigate } from 'react-router';
import { detailCategory } from '../../../services/category_service';

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value, setCurrentValue } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${payload.name}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`${payload.value} (Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

const customTooltipOnYourLine = (e) => {
    if (e.active && e.payload != null && e.payload[0] != null) {
        return (<div className="custom-tooltip">
            <p>{e.payload[0].payload["date"]}</p>
            <p>{e.payload[0].payload["revenue"]}</p>
        </div>);
    }
    else {
        return "";
    }
}
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload; // Dữ liệu của điểm trên biểu đồ
        return (
            <div style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '10px' }}>
                <p>Date: {data.date}</p>
                <p>Revenue: {data.revenue}</p>
            </div>
        );
    }

    return null;
};
export const Overview = () => {
    const [state, setState] = useState({ activeIndex: 0 })
    const onPieEnter = (_, index) => {
        setState({
            activeIndex: index,
        });
    };
    const [perMonth, setPerMonth] = useState([])
    const [perDay, setPerDay] = useState([])
    const [info, setInfo] = useState({})
    const [currentCategoryId, setCurrentCategoryId] = useState('')
    const [products, setProducts] = useState(0)
    const [categories, setCategories] = useState(0)
    const [orders, setOrders] = useState(0)
    const [customers, setCustomers] = useState(0)

    const [productCategory, setProductCategory] = useState([])
    const [orderByShippingStatus, setOrderByShippingStatus] = useState([])
    const [orderByPaymentStatus, setOrderByPaymentStatus] = useState([])
    const [orderByOrderStatus, setOrderByOrderStatus] = useState([])

    const navigate = useNavigate()

    const queryProductCategory = useQuery({
        queryKey: ['product_category_statitics'],
        queryFn: () => count_product_category()
    })

    const queryOrder = useQuery({
        queryKey: ['order_statitics'],
        queryFn: () => count_order()
    })


    useEffect(() => {
        if (productCategory.length === 0) return
        setCurrentCategoryId(productCategory[state.activeIndex]?.categoryId);
        return () => {
            setCurrentCategoryId('')
        }
    }, [state, productCategory])

    const queryStatitics = useQuery({
        queryKey: ['total_statitics'],
        queryFn: () => count_statitics()
    })

    const orderPerMonth = useQuery({
        queryKey: ['order_per_month'],
        queryFn: () => order_per_month()
    })

    const orderPerDay = useQuery({
        queryKey: ['order_per_day'],
        queryFn: () => order_per_day()
    })

    const detailCategoryOverview = useQuery({
        queryKey: ['detail_category', currentCategoryId],
        queryFn: () => detailCategory(currentCategoryId),
        enabled: !!currentCategoryId
    })

    useEffect(() => {
        if (!detailCategoryOverview?.isSuccess) return
        const rawData = detailCategoryOverview?.data?.data
        setInfo(rawData)
        return () => {
            setInfo({})
        }
    }, [detailCategoryOverview?.isSuccess, detailCategoryOverview?.data])


    useEffect(() => {
        if (!orderPerDay?.isSuccess) return
        const rawData = orderPerDay?.data?.data
        setPerDay(rawData?.map((item) => ({
            date: item?.date,
            revenue: item?.totalRevenue
        })))
        return () => {
            setPerDay([])
        }
    }, [orderPerDay?.isSuccess, orderPerDay?.data])


    useEffect(() => {
        if (!orderPerMonth?.isSuccess) return
        const rawData = orderPerMonth?.data?.data
        setPerMonth(rawData?.map((item, index) => ({
            index: index,
            Orders: item?.totalOrders,
            month: item?.month,
            Revenue: item?.totalRevenue
        })))
        return () => {
            setPerMonth([])
        }
    }, [orderPerMonth?.isSuccess, orderPerMonth?.data])

    useEffect(() => {
        if (!queryStatitics?.isSuccess) return
        const rawData = queryStatitics?.data?.data
        setCustomers(rawData?.countCustomer)
        setOrders(rawData?.countTotalOrder)
        setCategories(rawData?.countCategory)
        setProducts(rawData?.countProduct)
        return () => {
            setOrders(0)
            setCustomers(0)
            setCategories(0)
            setProducts(0)
        }
    }, [queryStatitics?.isSuccess, queryStatitics?.data])


    useEffect(() => {
        if (!queryProductCategory?.isSuccess) return
        const rawData = queryProductCategory?.data?.data?.countProductInEachCategory
        setProductCategory(
            rawData.map(item => ({
                categoryId: item?.categoryIds[0],
                name: item?.categoryName,
                value: item?.totalCount,
                fill: randomHexColorCode()
            }))
        )
        return () => {
            setProductCategory([])
        }
    }, [queryProductCategory?.isSuccess, queryProductCategory?.data])


    useEffect(() => {
        if (!queryOrder?.isSuccess) return
        const rawData = queryOrder?.data?.data
        setOrderByShippingStatus(
            rawData?.countOrderByShippingStatus.map(item => ({
                name: getLabelByValue(item?._id, shippingStatusOptions),
                value: item?.totalCount,
                fill: randomHexColorCode()

            }))
        )

        setOrderByPaymentStatus(
            rawData?.countOrderByPaymentStatus.map(item => ({
                name: getLabelByValue(item?._id, paymentStatusOptions),
                value: item?.totalCount,
                fill: randomHexColorCode()

            }))
        )

        setOrderByOrderStatus(
            rawData?.countOrderByOrderStatus.map(item => ({
                name: getLabelByValue(item?._id, orderStatusOptions),
                value: item?.totalCount,
                fill: randomHexColorCode()

            }))
        )
        return () => {
            setOrderByShippingStatus([])
            setOrderByPaymentStatus([])
            setOrderByOrderStatus([])
        }
    }, [queryOrder?.isSuccess, queryOrder?.data])


    return (
        <Flex vertical className='overview' gap={"20px"}>
            <Flex justify='space-between'>
                <Flex

                    className='card'
                >
                    <Flex className='card_item green'>
                        <ProductOutlined />
                    </Flex>
                    <Card.Meta title="Product total" description={
                        <Flex vertical>
                            <Typography.Text>{products}</Typography.Text>
                            <Button type='link' onClick={() => navigate('product', { replace: true })} icon={<LoginOutlined />}>View detail</Button>
                        </Flex>
                    } />
                </Flex>
                <Flex
                    className='card'
                >
                    <Flex className='card_item blue'>
                        <TagOutlined />
                    </Flex>
                    <Card.Meta title="Category total" description={<Flex vertical>
                        <Typography.Text>{categories}</Typography.Text>
                        <Button type='link' onClick={() => navigate('category', { replace: true })} icon={<LoginOutlined />}>View detail</Button>
                    </Flex>} />
                </Flex>
                <Flex

                    className='card'
                >
                    <Flex className='card_item yellow'>
                        <ShoppingCartOutlined />
                    </Flex>
                    <Card.Meta title="Order total" description={<Flex vertical>
                        <Typography.Text>{orders}</Typography.Text>
                        <Button type='link' onClick={() => navigate('order', { replace: true })} icon={<LoginOutlined />}>View detail</Button>
                    </Flex>} />
                </Flex>
                <Flex

                    className='card'
                >
                    <Flex className='card_item red'>
                        <UsergroupDeleteOutlined />
                    </Flex>
                    <Card.Meta title="Customer total" description={<Flex vertical>
                        <Typography.Text>{customers}</Typography.Text>
                        <Button type='link' onClick={() => navigate('customer', { replace: true })} icon={<LoginOutlined />}>View detail</Button>
                    </Flex>} />
                </Flex>
            </Flex>
            <Card title="Product sort by category" style={{ height: 700 }}>
                <Flex>
                    <PieChart width={550} height={300}>
                        <Pie
                            activeIndex={state.activeIndex}
                            data={productCategory}
                            dataKey="value"
                            nameKey="name"
                            cx="50%" cy="50%"
                            innerRadius={85}
                            outerRadius={100} fill="#8884d8"
                            activeShape={renderActiveShape}
                            onMouseEnter={onPieEnter}
                        />
                    </PieChart>
                    <Card hoverable
                        style={{
                            width: 300,
                        }}
                        cover={<Image src={info?.image} preview={false} onClick={() => navigate(`/admin/category/${currentCategoryId}`)} />}>
                        <Card.Meta title={info?.name} description={info?.description} />
                    </Card>
                </Flex>
            </Card>
            <Card title="Order">

                <Flex justify='space-between'>
                    <Flex vertical align='center'>
                        <PieChart width={250} height={250}>
                            <Tooltip />
                            <Pie
                                data={orderByShippingStatus}
                                dataKey="value"
                                nameKey="name"
                                cx="50%" cy="50%"

                                outerRadius={100} fill="#8884d8" />
                        </PieChart>
                        <Typography.Title level={5}>Order by shipping status</Typography.Title>
                    </Flex>
                    <Flex vertical align='center'>
                        <PieChart width={250} height={250}>
                            <Tooltip />
                            <Pie
                                data={orderByPaymentStatus}
                                dataKey="value"
                                nameKey="name"
                                cx="50%" cy="50%"

                                outerRadius={100} fill="#8884d8" />
                        </PieChart>
                        <Typography.Title level={5}>Order by payment status</Typography.Title>
                    </Flex>
                    <Flex vertical align='center'>

                        <PieChart width={250} height={250}>
                            <Tooltip />
                            <Pie
                                data={orderByOrderStatus}
                                dataKey="value"
                                nameKey="name"
                                cx="50%" cy="50%"

                                outerRadius={100} fill="#8884d8" />
                        </PieChart>
                        <Typography.Title level={5}>Order by order status</Typography.Title>
                    </Flex>
                </Flex>
            </Card>
            <Card title="Order in month" className='inMonth'>
                <ResponsiveContainer width={'99%'} height={300}>
                    <ComposedChart width={730} height={250} data={perDay}>
                        <XAxis dataKey="date" />
                        <Tooltip content={<CustomTooltip />} />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Bar dataKey="revenue" barSize={20} fill="#413ea0" yAxisId="left"
                        />
                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#ff7300"
                            yAxisId="left"
                        />
                        <YAxis
                            orientation="left"
                            yAxisId="left"
                            tickLine={false}
                            domain={[5, "dataMax + 5"]}
                            tickCount={5}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </Card>
            <Card title="Order in year">
                <ResponsiveContainer width={'99%'} height={300}>
                    <ComposedChart width={730} height={250} data={perMonth}>
                        <XAxis dataKey="month" />
                        <YAxis
                            orientation="right"
                            yAxisId="right"
                            tickLine={false}
                            domain={[5, "dataMax +5000"]}
                            tickCount={5}
                        />

                        <Tooltip />
                        <Legend />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Bar dataKey="Orders" barSize={20} fill="#5fcfe3" yAxisId="left"
                        />
                        <Line
                            type="monotone"
                            dataKey="Revenue"
                            stroke="#ff7300"
                            yAxisId="right"
                        />
                        <YAxis
                            orientation="left"
                            yAxisId="left"
                            tickLine={false}
                            domain={[5, "dataMax + 5"]}
                            tickCount={5}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </Card>
        </Flex>
    )
}
