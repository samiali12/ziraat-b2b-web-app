
const CheckoutProducts = ({imageUrl, name, category, price}) => {
    return (
        <div className="flex justify-between">
            <div className="inline-flex">
                <img src={imageUrl} alt={name} className="max-h-16" />
                <div className="ml-3">
                    <p className="text-base font-semibold text-white">{name}</p>
                    <p className="text-sm font-medium text-white text-opacity-80">{category}</p>
                </div>
            </div>
            <p className="text-sm font-semibold text-white">{price} PKR</p>
        </div>
    )
}

export default CheckoutProducts;