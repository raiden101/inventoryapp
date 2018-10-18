const { sqlConnection } = require("../../util/sqlConn");

const errMsg = "Error while ordering items!";

const deletUserCart = shopID => {
  return new Promise((resolve, reject) => {
    sqlConnection.query(`delete from cart 
    where shopID=${shopID}`,
      (err, r4) => {
        err ? reject() : resolve();
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
      err ? ireject() : iresolve();
    })
  })))
  .then(_ => resolve())
  .catch(_ => reject());
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
  let getCartItems = `select * from cart 
    where shopID=${req.userData.username}`;
  sqlConnection.query(getCartItems, (err, cartItems) => {
    if (err) {
      res.json("Error while ordering!!");
      return;
    }
    getNextId()
      .then(id => {
        let d = new Date();
        let date = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
        let newArray = cartItems.map(el => {
          return [id, el.shopID, el.itemID, el.quantity, date];
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
                res.json(err);
              });
          }
        );
      })
      .catch(err => {
        res.json(errMsg);
      });
  });
};
