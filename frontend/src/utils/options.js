const paymentStatusOptions = [
    { value: 'unpaid', label: "Unpaid" },
    { value: 'partial_payment', label: "Partial payment" },
    { value: 'paid', label: "Paid" }
]

const shippingStatusOptions = [
    { value: 'not_sent', label: "Not sent" },
    { value: 'sending', label: "Sending" },
    { value: 'sent', label: "Done" }
]

const orderStatusOptions = [
    { value: "new", label: "New" },
    { value: "processing", label: "Processing" },
    { value: 'hold', label: "Hold" },
    { value: 'canceled', label: 'Canceled' },
    { value: 'done', label: "Done" }
]

const shippingMethodOptions = [
    { value: "express", label: "Express" },
    { value: "free", label: "Free" },
    { value: 'standard', label: "Standard" },

]

const paymentMethodOptions = [
    { value: "vnpay", label: "VNPAY" },
    { value: "cod", label: "COD" }
]



export { paymentStatusOptions, shippingStatusOptions, orderStatusOptions, paymentMethodOptions, shippingMethodOptions }