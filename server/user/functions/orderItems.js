const { sqlConnection } = require("../../util/sqlConn");

const errMsg = "Error while ordering items!";

const getSQLDate = () => {
  let d = new Date();
  let month = d.getMonth() + 1, date = d.getDate();
  let nmonth = month < 10 ? '0' + month : month;
  let ndate = date < 10 ? '0' + date : date;
  return `${d.getFullYear()}-${nmonth}-${ndate}`;
}

const deletUserCart = shopID => {
  // delete only those whose orderCOunt < count in itemList table.
  let q = `delete from cart
  where shopID=${shopID} and
  itemID in (
    select itemID from(
      select C.itemID 
      from cart C, item I
      where C.itemID = I.itemID and
      C.quantity <= I.quantity
    ) as A
  );`
  return new Promise((resolve, reject) => {
    sqlConnection.query(q, (err, r4) => {
        err ? reject(err) : resolve();
      }
    );
  });
};

const updateQuantity = items => new Promise((resolve, reject) => {
  Promise.all(items.map(item => new Promise((iresolve, ireject) => {
    let q = `update item 
    set quantity=quantity-${item.quantity}
    where itemID=${item.itemID};
    `;
    sqlConnection.query(q, (err, res) => {
      err ? ireject(err) : iresolve();
    })
  })))
  .then(_ => resolve())
  .catch(_ => reject(err));
});


const getNextId = () => {
  let getMaxShopId = "select max(orderID) as maxId from orderList";
  return new Promise((resolve, reject) => {
    sqlConnection.query(getMaxShopId, (err, r1) => {
      if (err) reject();
      else {
        let id = r1[0]["maxId"];
        let nextOrderId = id === null ? 0 : id + 1;
        resolve(nextOrderId);
      }
    });
  });
};

module.exports.orderAll = (req, res) => {
  let getCartItems = `select C.shopID, C.itemID, C.quantity
  from cart C, item I
  where C.itemID = I.itemID and
  C.quantity <= I.quantity and 
  C.shopID=${req.userData.username}`;
  sqlConnection.query(getCartItems, (err, cartItems) => {
    if (err) {
      console.log(3, err);
      res.json("Error while ordering!!");
      return;
    }
    getNextId()
      .then(id => {
        
        let newArray = cartItems.map(el => {
          return [id, el.shopID, el.itemID, el.quantity, getSQLDate()];
        });

        // inserting into orderList.
        sqlConnection.query(
          "insert into orderList values ?",
          [newArray],
          (err, r3) => {
            if (err) {
              res.json(errMsg);
              return;
            }
            Promise.all(
              [deletUserCart(req.userData.username), 
                updateQuantity(cartItems)
              ])
              .then(_ => {
                res.json("Order Successfull");
              })
              .catch(err => {
                console.log(4, err);
                res.json(errMsg);
              });
          }
        );
      })
      .catch(err => {
        res.json(errMsg);
      });
  });
};


module.exports.orderItem = (req, res) => {
  let itemID = req.body.itemID, 
  shopID = req.userData.username,
  qty = req.body.quantity;

  getNextId()
  .then(id => {
    let q = `insert into orderList(orderID, shopID, itemID, orderDate, quantity) 
    values(${id}, ${shopID}, ${itemID}, '${getSQLDate()}', ${qty})`;
    // adding to orderList
    sqlConnection.query(q, (err, r1) => {
      if(err) { console.log(1, err);res.json(errMsg);return; }
      // removing from cart;
      let q1 = `delete from cart
      where itemID=${itemID} and shopID=${shopID};`;
      sqlConnection.query(q1, (err, r2) => {
        if(err) { console.log(2, err);res.json(errMsg);return; }
        // update item table.
        updateQuantity([{itemID: itemID, quantity: qty}])
        .then(_ => {
          res.json("Order successfull");
        })
        .catch(_ => {
          res.json(errMsg);
        })
      })
    })
  })
  .catch(err => {
    res.json(errMsg);
  })
}