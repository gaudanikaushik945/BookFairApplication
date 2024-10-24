const { where } = require("sequelize");
const db = require("../model/db")
const { v4: uuidV4 } = require("uuid");
const { logger } = require("sequelize/lib/utils/logger");
const { paginate } = require("sequelize-paginate");
const bcrypt = require("bcrypt")


exports.createOrder = async (req, res) => {
    try {
        const buyerToken = tokenChek
        console.log("__________ buyerToken _____________", buyerToken);

        const reqBody = req.body
        const orderData = {
            order_uuid: uuidV4()
        }


        for (const iterator of reqBody) {
            iterator.buyer_id = buyerToken.id
            iterator.order_uuid = orderData.order_uuid
            const bookData = await db.books.findOne({ where: { id: iterator.books_id } })
            console.log("++++++++++ bookData ++++++++++++", bookData)
            if (iterator.quantity <= bookData.stock_count) {
                bookData.stock_count -= iterator.quantity
                await bookData.save()

            } else {
                return res.status(404).json({
                    message: "book is not avaible"
                })
            }
        }
        console.log("_______ reqBody ___________", reqBody)

        const pendingOrder = await db.orders.bulkCreate(reqBody)
        console.log("+++++++++ pendingOrder ++++++++++++", pendingOrder);


        return res.status(200).json({
            message: "order created successFully"
        })
    } catch (error) {
        console.log("---- error ---", error);
        return res.status(404).json({
            data: false,
            message: "order data not correct"
        })
    }
}



exports.cancleOrder = async (req, res) => {
    try {
        const buyerToken = tokenChek
        console.log("******** buyerToken ***********", buyerToken);

        const getOrder = await db.orders.findOne({ where: { order_uuid: req.query.order_uuid } })
        console.log("+++++++++ getOrder ++++++++++++=", getOrder)
        if (!getOrder) {
            return res.status(404).json({
                data: false,
                message: "Order not found"
            });
        }


        const bookData = await db.books.findOne({ where: { id: req.params.books_id } });
        console.log("........ bookData ............", bookData);

        if (!bookData) {
            return res.status(404).json({
                data: false,
                message: "Book not found"
            });
        }

        // const bookData = await db.books.findOne({where: {id: req.query.books_id}})
        // console.log("........ bookData ............", bookData)

        if (buyerToken.id === getOrder.buyer_id) {
            const orderCancel = await db.orders.update(
                req.body,
                { where: { books_id: req.params.books_id, order_uuid: req.query.order_uuid } }
            );
            console.log("++++++++ orderCancel +++++++++++++", orderCancel);
            bookData.stock_count += getOrder.quantity
            await bookData.save()
            console.log("++++++++++++++++++++++++++++++++++++++ bookData =============================", await bookData.save());
        } else {
            return res.status(403).json({
                data: false,
                message: "You are not authorized to cancel this order"
            });
        }

        return res.status(200).json({
            message: "order cancle successFully"
        })
    } catch (error) {
        console.log("****** error ***********", error);
        return res.status(404).json({
            data: false,
            message: "order not cancle"
        })
    }
}







exports.getOrdersPagination = async (req, res) => {
    try {


        let offset = Number(req.query.offset)
        const limit = Number(req.query.limit)
        offset = offset * limit


        const getOrder = await db.orders.findAndCountAll({
            offset: offset,
            limit: limit,
            order: [["id", "DESC"]]
        })
        // if (getOrder.rows == 0) {
        //     return res.status(404).json({
        //         data: false,
        //         message: "orderData not available"
        //     })
        // }

        console.log("------ limit ------", limit)
        console.log("===== offset =====", offset)

        console.log("++++++++++++++++ getOrder ++++++++++++", getOrder.rows)


        return res.status(200).json({
            data: getOrder,
            message: "order data get succesFully"
        })
    } catch (error) {
        console.log("******* error ***********", error)
        return res.status(404).json({
            data: false,
            message: "order not found"

        })
    }
}





exports.transtionUserUnmanage = async (req, res) => {

    const b = await db.sequelize.transaction( )
    const securePassword = await bcrypt.hash(req.body.password, 10)

    const buyerData = {
        name: req.body.name,
        email: req.body.email,
        password: securePassword
    }
    const data = await db.buyers.create(buyerData, {transaction: b})
    console.log("=== data ====", data);
    if (data && data.id) {
        try {
            const orderData = {
                order_uuid: uuidV4()
            }
            console.log(" ==========", req.body.buyer_id);
            await db.orders.create({ buyer_id: req.body.buyer_id, quantity: req.body.quantity, shop_id: req.body.shop_id, books_id: req.body.books_id, order_uuid: orderData.order_uuid, order_status: req.body.order_status }, {transaction: b})
            await b.commit()
            console.log("+++++ commit +++++++");
        } catch (error) {
            console.log("------ error ------", error);
            await b.rollback()

            console.log("====== rollback ========")

        }
        res.status(200).json({ data: data })
    }

}



exports.transtionUserManage = async(req, res) => {
    const b = await db.sequelize.transaction( )

    try {
        let manageTransation

        await db.sequelize.transaction(async(transaction) => {
            const newUser = await db.buyers.create(
                {
                    name: req.body.name, 
                    email: req.body.email,
                    password: req.body.password
                },
                {
                    transaction: transaction
                }
            )
            return res.status(200).json(newUser)
        })
    } catch (error) {
        console.log("..... error .....", error.message);
       return res.status(500).json({
            data: false
        })

    }
}