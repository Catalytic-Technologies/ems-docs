---
title: Inventory
sidebar_label: Inventory
sidebar_position: 3
---

# Inventory

<span className="role-badge role-badge--admin">School Admin</span>

The Inventory module tracks school assets and consumable stock — from textbooks and sports equipment to stationery and cleaning supplies.

## Inventory Dashboard

Go to **Administration → Inventory** to see the inventory dashboard with:
- Total items in stock
- Low stock alerts
- Recent stock movements

![Inventory dashboard](../../static/img/inventory/dashboard.png)

![Dashboard summary cards](../../static/img/inventory/dashboard-cards.png)

## Adding an Item

1. Click **New Item**.
2. Fill in:

| Field | Description |
|-------|-------------|
| **Item Name** | e.g. "A4 Printing Paper (Ream)" |
| **Category** | Stationery / Books / Equipment / Furniture / Other |
| **Unit** | Ream, piece, box, set, etc. |
| **Reorder Level** | Quantity at which a low-stock alert is triggered |
| **Supplier** | Preferred supplier for this item |

3. Click **Save**.

![Inventory items list](../../static/img/inventory/items-list.png)

![Add new item button](../../static/img/inventory/items-add-button.png)

## Recording Stock In

When new stock arrives:
1. Go to **Administration → Inventory → Stock In**.
2. Select the item.
3. Enter the quantity received and the date.
4. Optionally link to a purchase order/reference.
5. Click **Save**.

![Stock In form](../../static/img/inventory/stock-in-form.png)

## Recording Stock Out

When stock is used or distributed:
1. Go to **Administration → Inventory → Stock Out**.
2. Select the item and enter the quantity used.
3. Add a note on what it was used for.
4. Click **Save**.

![Stock Out form](../../static/img/inventory/stock-out-form.png)

## Movement Report

The movement report shows a chronological log of all stock in and stock out for any item. Go to **Administration → Inventory → Movement Report** and filter by item or date range.

![Stock transactions log](../../static/img/inventory/transactions.png)

## Low Stock Report

The low stock report lists all items at or below their reorder level. Use this for procurement planning.

![Low stock alerts](../../static/img/inventory/low-stock.png)

## Suppliers

Manage supplier contacts in **Administration → Inventory → Suppliers**.

![Suppliers list](../../static/img/inventory/suppliers.png)

## Categories

Organise items into categories for easier reporting and filtering.

![Item categories](../../static/img/inventory/categories.png)

## Related Pages

- [Expenses →](../finance/expenses)
- [Requisitions →](../finance/requisitions)
