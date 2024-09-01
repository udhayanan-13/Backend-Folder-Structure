import sql from "mssql";
export const insertProduct = async (
  name,
  categoryId,
  description,
  price,
  status
) => {
  try {
    const request = new sql.Request();
    await request
      .input("name", sql.NVarChar, name)
      .input("categoryId", sql.NVarChar, categoryId)
      .input("description", sql.NVarChar, description)
      .input("price", sql.NVarChar, price)
      .input("status", sql.NVarChar, status)
      .query(
        "insert into Product values(@name,@categoryId,@description,@price,@status)"
      );
  } catch (err) {
    throw err;
  }
};

export const getAllProduct = async () => {
  try {
    const request = new sql.Request();
    const result = await request.query("select * from Product");
    return result.recordset;
  } catch (err) {
    throw err;
  }
};

export const getProductById = async (id) => {
  try {
    const request = new sql.Request();
    const result = await request
      .input("id", sql.NVarChar, id)
      .query("select * from Product where id=@id");
    return result.recordset[0];
  } catch (err) {
    throw err;
  }
};

export const updateProductModel = async (
  id,
  name,
  categoryId,
  description,
  price,
  status
) => {
  console.log(
    "In update Product model",
    id,
    name,
    categoryId,
    description,
    price,
    status
  );
  try {
    if (!(await getProductById(id))) {
      throw new Error("Id not found.!");
    }
    const request = new sql.Request();
    const result = await request
      .input("name", sql.NVarChar, name)
      .input("id", sql.Int, id)
      .input("description", sql.NVarChar, description)
      .input("price", sql.NVarChar, price)
      .input("categoryId", sql.NVarChar, categoryId)
      .input("status", sql.NVarChar, status)
      .query(
        "update Product set name=@name, categoryId=@categoryId, status=@status, price=@price,description=@description where id=@id"
      );
    if (result.rowsAffected[0] == 0) {
      throw new Error("Update failed. 0 rows affected");
    }
  } catch (err) {
    throw err.message;
  }
};

export const deleteProductModel = async (id) => {
  try {
    if (!(await getProductById(id))) {
      throw new Error("Id not found.!");
    }
    const request = new sql.Request();
    const result = await request
      .input("id", sql.NVarChar, id)
      .query("delete from Product where id=@id");
    if (result.rowsAffected[0] == 0) {
      throw new Error("Product not deleted. 0 rows affected");
    }
  } catch (err) {
    throw err.message;
  }
};

export const updateStatusModel = async (id, status) => {
  try {
    if (!(await getProductById(id))) {
      throw new Error("Id not found.!");
    }
    const request = new sql.Request();
    const result = await request
      .input("id", sql.NVarChar, id)
      .input("status", sql.NVarChar, status)
      .query("update product set status=@status where id=@id");
    if (result.rowsAffected[0] == 0) {
      throw new Error("Product status Update failed. 0 rows affected");
    }
  } catch (err) {
    throw err.message;
  }
};
