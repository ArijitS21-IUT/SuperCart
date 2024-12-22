import  Order from "../../models/order.js";
import  Branch  from "../../models/branch.js";
import  Customer, { DeliveryPartner }  from "../../models/user.js";

export const createOrder = async(req,reply)=>{
    try{
        const {userId} = req.user;
        const {items,branch,totalPrice} = req.body;

        const customerData = await Customer.findById(userId);
        const branchData = await Branch.find(branch);

        if(!customerData){
            return reply.status(404).send({message: "Customer not found"});
        }

        const newOrder = new Order({
            customer:userId,
            items:items.map((item)=>({
                id:item.id,
                item:item.item,
                count:item.count
            })),
            branch,
            totalPrice,
            deliveryLocation:{
                latitude:customerData.liveLocation.latitude,
                longitude:customerData.liveLocation.longitude,
                address:customerData.address || "No address available"
            },
            pickupLocation:{
                latitude:branchData.liveLocation.latitude,
                longitude:branchData.liveLocation.longitude,
                address:branchData.address || "No address available"
            },
        })
        
        const savedOrder = await newOrder.save();
        return reply.status(201).send(savedOrder);



    }catch(err){
        return reply.status(500).send({message: "Failed to create order",err});
    }
};

export const confirmOrder = async (req,reply) =>{
    try{
        const {orderId} = req.params;
        const {userId} = req.user;
        const {deliveryPersonLocation} = req.body;

        const deliveryPerson = await DeliveryPartner.findById(userId)
        if(!deliveryPerson){
            return reply.status(404),send({message: "Delivery person not found"});
        }
        const order = await Order.findById(orderId)
        if(!order) return reply.status(404).send({message: "Order not found"})

        if(order.status!=='available'){
            return reply.status(400).send({message: "Order is not available"});
        }
        order.status = 'confirmed';

        order.deliveryPartner = userId;
        order.deliveryPersonLocation={
            latitude:deliveryPersonLocation?.latitude,
            longitude:deliveryPersonLocation?.longitude,
            address:deliveryPersonLocation.address || ""
        }

        await order.save();

        return reply.send(order);

    }catch(error){
        return reply.status(500).send({message: "Failed to confirm order", error});
    }
};

export const updateOrderStatus = async (req,reply) =>{
    try{
        const {orderId}= req.params;
        const{status,deliveryPersonLocation}=req.body;

        const {userId}= req.user;

        const deliveryPerson = await DeliveryPartner.findById(userId)
        if(!deliveryPerson){
            return reply.status(404).send({message: "Delivery person not found"});
        }

        const order = await Order.findById(orderId)
        if(!order) return reply.status(404).send({message: "Order not found"})

        if(['cancelled','delivered'].includes(order.status)){
            return reply.status(400).send({message: "Order can not be updated"});
        }
        if(order.deliveryPartner.toString()!==userId){
            return reply.status(403).send({message: "Unauthorized"});
        }

        order.status = status;

        
        order.deliveryPersonLocation= deliveryPersonLocation
        await order.save();
        return reply.send(order);
    }catch(error){
        return reply.status(500).send({message: "Failed to update order status", error});
    }
};