const filteringProduct = (
    e: React.ChangeEvent < HTMLSelectElement > ,
    setItems: any,
    allItems: any
) => {
    console.log(allItems);

    if (e.target.value === "all") {
        setItems(allItems);
        return;
    }
    console.log(e.target.value);
    setItems(
        allItems.filter((item: any) =>
            item.category !== undefined ?
            item.category === e.target.value :
            item.session !== undefined ?
            item.session === e.target.value :
            item.status !== undefined ?
            item.status === e.target.value :
            item.deliveryStatus !== undefined ?
            item.deliveryStatus === e.target.value :
            item.shiftStatus === e.target.value

        )
    );
};

export default filteringProduct;