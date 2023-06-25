const filterRole = (
  e: React.ChangeEvent<HTMLSelectElement>,
  setItems: any,
  allItems: any,
  role: any // pass the role array as a parameter
) => {
  console.log(allItems);

  if (e.target.value === "all") {
    setItems(allItems);
    return;
  }
  console.log(e.target.value);
  setItems(
    allItems.filter((item: any) =>
      item.category !== undefined
        ? item.category === e.target.value
        : item.session !== undefined
        ? item.session === e.target.value
        : item.status !== undefined
        ? item.status === e.target.value
        : item.deliveryStatus === e.target.value
        ? item.deliveryStatus === undefined
        : role.find((p: any) => p.role_id === item.roleId)?.role_name ===
        e.target.value // find the role name based on roleId
    )
  );
};

export default filterRole;
