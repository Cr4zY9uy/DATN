import nodemailer from 'nodemailer'
import { Router } from "express";
const router = Router();

const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: true,
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD
    }
});
router.post('/mail', async (req, res) => {
    transporter.sendMail({
        from: "heronakamura123@gmail.com",
        to: "uzumakicf@gmail.com",
        subject: 'Your order is placed successfully',
        text: `This is your order below.`,
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,500;1,700;1,900&display=swap"
            rel="stylesheet">      
        <style>
        *{
            margin:0;
            padding:0;
            border-box:box-sizing;
        }
        .infor_orderdetail{
        margin-bottom: 30px;
        }
        .infor_orderdetail tr td:nth-child(2){
            padding-left: 100px;
        }
        .infor_detail{
            font-weight: 300;
            font-size: 15px;
            color: #495057c6;
            text-align: left;

        }
        .title_info {
            font-size:17px;
            font-weight: 500;
            text-align: left;
        }
        </style>
        </head>
        <body>
            <section className="container">
            <h1>Order detail</h1>
            <table className="infor_orderdetail">
                <tbody>
                    <tr>
                        <td className="title_info ">Full name:</td>
                        <td className="infor_detail ">asdnasd</td>
                    </tr>
                    <tr>
                        <td className="title_info ">Phone: </td>
                        <td className="infor_detail ">qweqwe</td>
                    </tr>
                    <tr>
                        <td className="title_info ">Address:</td>
                        <td className="infor_detail ">qwwqfwdf</td>
                    </tr>
                    <tr>
                        <td className="title_info ">Payment method:</td>
                        <td className="infor_detail ">wef3rwefq</td>
                    </tr>
                    <tr>
                        <td className="title_info ">Shipping:</td>
                        <td className="infor_detail ">dsff2323</td>
                    </tr>
                </tbody>
            </table>
            <table >
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Image</th>
                        <th>QTY</th>
                        <th>Price</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>

            <tr>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td><img src={item.thumbnail} width={"120px"} height={"150px"} alt="product" /></td>
                <td>{item.quantity}</td>
                <td>{item.price}$</td>
                <td>{item.price * item.quantity}$</td>
            </tr>
                </tbody>
            </table>
        </section>
        </body>
        </html>`
    }, (err) => {
        if (err)
            res.status(500).json({ message: err })
        else {
            transporter.close();
            res.status(200).json({ message: "ok" })
        }
    });
})
export { transporter, router }